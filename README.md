# Web Development Project 4 — Puppy Dogs

Submitted by: **Your Name Here**

This web app: **Discover random dog breeds with matching photos, learn about their attributes, and customize future discoveries with a ban list.**

Time spent: **Fill in your total** hours spent in total

## Run locally

```sh
npm install
npm run dev
```

Open the localhost URL printed by Vite. No API key is required.

```sh
npm test
npm run build
```

## Required Features

- [x] A discovery button creates a new API request and displays a matching photo with four consistent attributes: breed, life span, male weight, and hypoallergenic status.
- [x] One current discovery is displayed at a time, with an image and attributes from the same breed's JSON record.
- [x] Discoveries appear random. Unseen eligible breeds are preferred; immediate repeats are avoided when alternatives exist.
- [x] Clicking an attribute immediately adds its value to the visible ban list. Clicking a banned value immediately removes it.
- [x] Banned attribute values are excluded from future discoveries. An explanatory error appears if no eligible breeds remain.
- [ ] Recording shows a banned attribute being clicked and immediately removed. **Record this before submission.**

## Optional Features

- [x] Multiple attribute types can be banned.
- [x] Session history displays previous discoveries with photos and attributes, newest first.

## Additional Features

- [x] Responsive desktop and mobile layouts, keyboard-accessible controls, and visible focus states.
- [x] Loading indicator, network/error messages, and a clear-all-bans button.
- [x] Pending requests are cancelled when preferences change to prevent stale results.
- [x] Photo source and license attribution.

Record with [ScreenToGif](https://www.screentogif.com/) on Windows, then insert the recording path or hosted link. No walkthrough has been recorded yet.


