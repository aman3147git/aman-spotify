## EchoPlay


This is a full-stack web project that mimics the idea of a music streaming service like Spotify. In the browser it is branded **EchoPlay**. The goal is to show a complete flow: a React website where people can look through albums and songs, sign up and log in, play audio in a built-in player, search the catalog, and update their profile. People with an admin email can open a separate dashboard to upload cover art and audio files, attach them to new albums and songs, or remove items from the database. Data lives in **MongoDB**, files go through **Cloudinary**, and the server is a **Node/Express** API that uses JWT cookies for authentication. The interface is responsive so the same app is usable on a phone or a desktop.

---

## Running the project

You need **Node.js**, a **MongoDB** URI, **Cloudinary** credentials if you will use admin uploads, and optionally **Firebase** for Google sign-in. Copy the environment pattern from the backend: set `PORT`, `MONGO`, `SECRET_KEY`, `FRONTEND_URL` (your frontend origin, e.g. Vite’s URL), `ADMIN_EMAIL`, and the Cloudinary variables. From the repository root run `npm install` and `npm run dev` to start the API. In another terminal, go into `frontend`, run `npm install` and `npm run dev` for the Vite dev server. Point `frontend/src/axios.js` at your API `baseURL` and make sure `FRONTEND_URL` in the server `.env` matches the site that serves the React app so cookies and CORS work. For a production build, `npm run build` at the root installs dependencies and builds the frontend into `frontend/dist`, which the Express app can serve.

---

## What it does today

Visitors can browse albums and open album pages; logged-in users see home sections with featured-style song rows, use a global player with skip, seek, volume, shuffle, and repeat, open individual songs, search by title or artist, and edit profile details including a picture. Admins get a control panel with simple statistics and forms to create or delete catalog entries using file uploads. Behind that sits a REST API for users, albums, songs, search, and protected admin actions.

---

## Looking ahead

The codebase could grow in many directions, for example real playlists and favorites, a proper play queue, podcasts or other media types, lyrics or sharing, automated tests and deployment pipelines, better accessibility and translations, or richer playback than single audio files. None of that is required to understand or run what is here now; it is simply the kind of work you might add later.

---

**Stack in brief:** React and Vite on the front; Express, Mongoose, and Cloudinary on the back. Folders: `backend/` for the API, `frontend/` for the React app. License ISC (see `package.json`).

The `frontend/README.md` file adds a short note aimed at anyone working only inside the client folder.
