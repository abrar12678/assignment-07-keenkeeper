readme---
# Keen Keeper

Keen Keeper is a friendship tracking dashboard that helps you stay connected with your meaningful relationships. Log calls, texts, and video check-ins, then review your interaction history and analytics from a clean, responsive interface.

## What’s Included

- Responsive navbar with icons and active page highlighting
- Home page with banner, summary cards, and friend cards
- Friend detail pages with status, tags, bio, and quick check-in actions
- Timeline page with search and filter by interaction type
- Stats page with a Recharts donut chart for interaction counts
- Toast notifications, loading states, and a custom 404 page

## Technologies

- Next.js 16
- React 19
- Tailwind CSS
- DaisyUI
- Recharts
- React Toastify

## Features

- Friend data loaded from `public/friends.json`
- Clickable friend cards that navigate to individual detail pages
- Quick check-in buttons that log new timeline entries and show toast notifications
- Timeline filtering by Call, Text, and Video
- Analytics page with interaction breakdown and animated chart
- Fully responsive layout for mobile, tablet, and desktop

## Run Locally

```bash
npm install
npm run dev
```

Open [http://localhost:3000](http://localhost:3000) in your browser.

## File Structure

- `src/app/page.js` — Home page
- `src/app/timeline/page.jsx` — Timeline page
- `src/app/stats/page.jsx` — Analytics page
- `src/app/friends/[id]/page.jsx` — Friend detail pages
- `public/friends.json` — Friend profile data
