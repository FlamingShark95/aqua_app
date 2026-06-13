// Feeding-reminder persistence + notification scheduling. Settings are stored
// like the other app preferences (AsyncStorage); scheduling only happens on
// iOS/Android — web keeps the settings editable but can't notify.
import { Platform } from "react-native";
import AsyncStorage from "@react-native-async-storage/async-storage";
import * as Notifications from "expo-notifications";

export type FeedReminder = {
  enabled: boolean;
  times: string[]; // "HH:MM", 24h, at most MAX_FEED_TIMES entries
  days: number[]; // weekdays to fire on; 1–7 (1 = Sunday), matching expo
};

const STORAGE_KEY = "aqua_app.feedReminder";
export const MAX_FEED_TIMES = 3;
// expo-notifications weekday convention: 1 = Sunday … 7 = Saturday.
export const ALL_DAYS = [1, 2, 3, 4, 5, 6, 7];
export const DEFAULT_REMINDER: FeedReminder = {
  enabled: false,
  times: ["08:00"],
  days: ALL_DAYS,
};

export const notificationsSupported = Platform.OS !== "web";

if (notificationsSupported) {
  // Show reminders even while the app is open.
  Notifications.setNotificationHandler({
    handleNotification: async () => ({
      shouldShowBanner: true,
      shouldShowList: true,
      shouldPlaySound: false,
      shouldSetBadge: false,
    }),
  });
}

// "HH:MM" → hour/minute, or null when malformed.
export function parseTime(
  value: string
): { hour: number; minute: number } | null {
  const match = /^(\d{1,2}):(\d{2})$/.exec(value.trim());
  if (!match) return null;
  const hour = Number(match[1]);
  const minute = Number(match[2]);
  if (hour > 23 || minute > 59) return null;
  return { hour, minute };
}

export async function loadFeedReminder(): Promise<FeedReminder> {
  try {
    const raw = await AsyncStorage.getItem(STORAGE_KEY);
    if (raw) {
      const saved = JSON.parse(raw) as Partial<FeedReminder>;
      if (typeof saved.enabled === "boolean" && Array.isArray(saved.times)) {
        // Saves from before per-day scheduling have no `days` → every day.
        const days =
          Array.isArray(saved.days) && saved.days.length > 0
            ? saved.days.filter((d) => d >= 1 && d <= 7)
            : ALL_DAYS;
        return { enabled: saved.enabled, times: saved.times, days };
      }
    }
  } catch {
    // Fall through to the default on read/parse errors.
  }
  return DEFAULT_REMINDER;
}

export async function saveFeedReminder(reminder: FeedReminder): Promise<void> {
  await AsyncStorage.setItem(STORAGE_KEY, JSON.stringify(reminder)).catch(
    () => {
      // Ignore write errors; the in-memory settings still apply this session.
    }
  );
}

// Re-schedule the daily notifications to match `reminder`. Returns false when
// the platform can't notify (web) or permission was denied, so the UI can
// explain why nothing will fire.
export async function applyFeedReminder(
  reminder: FeedReminder
): Promise<boolean> {
  if (!notificationsSupported) return false;

  await Notifications.cancelAllScheduledNotificationsAsync();
  if (!reminder.enabled || reminder.times.length === 0 || reminder.days.length === 0)
    return true;

  const permission = await Notifications.requestPermissionsAsync();
  if (!permission.granted) return false;

  if (Platform.OS === "android") {
    await Notifications.setNotificationChannelAsync("feeding", {
      name: "Feeding reminders",
      importance: Notifications.AndroidImportance.DEFAULT,
    });
  }

  const channelId = Platform.OS === "android" ? "feeding" : undefined;
  // All seven days → one efficient DAILY trigger per time. A subset → a WEEKLY
  // trigger per (day, time). At most 3 times × 7 days = 21 pending, well under
  // the iOS 64-notification limit.
  const everyDay = reminder.days.length >= 7;
  const content = {
    title: "Feed the fish 🐟",
    body: "Time for a feeding round.",
  };

  for (const time of reminder.times) {
    const parsed = parseTime(time);
    if (!parsed) continue;
    if (everyDay) {
      await Notifications.scheduleNotificationAsync({
        content,
        trigger: {
          type: Notifications.SchedulableTriggerInputTypes.DAILY,
          hour: parsed.hour,
          minute: parsed.minute,
          channelId,
        },
      });
    } else {
      for (const weekday of reminder.days) {
        await Notifications.scheduleNotificationAsync({
          content,
          trigger: {
            type: Notifications.SchedulableTriggerInputTypes.WEEKLY,
            weekday,
            hour: parsed.hour,
            minute: parsed.minute,
            channelId,
          },
        });
      }
    }
  }
  return true;
}
