# Dog Discovery build tasks

1. Project setup — primary agent: create the Vite/React entry point and npm commands.
2. API and filtering — API agent: fetch matching dog images and metadata, randomize results, enforce attribute bans, and cover edge cases with tests.
3. Interactive UI — React agent: discovery states, clickable attributes, removable ban list, and session history.
4. Responsive design — styling agent: desktop/mobile layouts, dog cards, accessibility states, and visual polish.
5. Integration and verification — primary agent: install dependencies, run tests and production build, review behavior, and document remaining submission steps.

Each implementation task has its own owner and files. The primary agent integrates the results.

## Completed verification

- All three delegated implementation tasks are complete.
- Five API/filtering tests pass; production build succeeds.
- Live API request returned 283 image-bearing breed records.
- Browser flow verified: discover → ban Hypoallergenic: No → discover a breed with Yes → remove the banned value immediately.
- Current photo loaded successfully and session history updated.
- Submission still needs the student's name, total time, and walkthrough recording.
