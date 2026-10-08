# Dog Discovery

Dog Discovery is a React app for exploring random dogs through the public [Dog API](https://dogapi.dog/). Each discovery displays one image and matching breed metadata, while the session ban list lets you filter out breeds or coat types you do not want to see.

## Run locally

```bash
npm install
npm run dev
```

The app uses the Dog API's public breed endpoint and does not require a committed API key. `npm run build` creates the production bundle.

## Features

- Fetches a new random dog when **Discover a dog** is clicked.
- Displays one image with matching breed, coat, life span, and temperament attributes.
- Makes breed and coat type clickable; clicking adds or removes the value from the ban list immediately.
- Retries filtered API results so banned breed and coat values are not displayed.
- Keeps up to 12 unique discoveries in a session history.
- Includes responsive layout, loading states, and recoverable API errors.
