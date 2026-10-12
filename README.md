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

## Video Walkthrough

**Add your walkthrough GIF or video here before submission.**

Suggested recording sequence:

1. Discover a dog and show its photo and four attributes.
2. Discover another dog to demonstrate variety and history.
3. Click a displayed attribute such as hypoallergenic status; show the ban list update.
4. Discover several more dogs and show that the banned value is excluded.
5. Click the banned value in the sidebar and show it disappearing immediately.
6. Demonstrate multiple bans and the responsive layout.

Record with [ScreenToGif](https://www.screentogif.com/) on Windows, then insert the recording path or hosted link. No walkthrough has been recorded yet.

## Notes

The app uses [Dog API v2](https://dogapi.dog/docs/api-v2). Each discovery requests image-bearing breed records, filters incomplete or banned records, and randomly selects a permitted breed. Photos and attributes come from the same record. Weight and lifespan values describe the breed, rather than the individual photographed dog.

History and bans last for the current page session and reset on refresh. Previous history remains visible when its attributes are later banned. Public API availability and remote photo loading depend on the network.

Implementation was split among separate agents for API/filtering, interactive React UI, and responsive styling. Project setup, integration, and verification were handled separately. See [TASKS.md](TASKS.md).

## License

Copyright 2026 **Your Name Here**

Add your preferred code license before publishing. Dog photographs retain the source licenses linked alongside each discovery.
