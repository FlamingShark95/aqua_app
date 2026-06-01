# Fish photos

Put image files (`.jpg` / `.png`) for each fish in this folder, then list them
in that fish's `images` array in `fishData.ts`.

## Bundled files (your own photos)

```ts
images: [
  require("./assets/fish/angelfish-1.jpg"),
  require("./assets/fish/angelfish-2.jpg"),
  require("./assets/fish/angelfish-3.jpg"),
],
```

(The `require` path is relative to `fishData.ts`, which lives at the project
root — hence `./assets/fish/...`.)

## Remote URLs

```ts
images: [
  "https://example.com/angelfish-1.jpg",
  "https://example.com/angelfish-2.jpg",
],
```

## Mixing both is fine

```ts
images: [
  require("./assets/fish/angelfish-1.jpg"),
  "https://example.com/angelfish-2.jpg",
],
```

The **detail screen** shows all of a fish's images as a swipeable gallery with
page dots. The **list** uses the first image as the row thumbnail. Fish with no
`images` show the 🐟 placeholder.
```
