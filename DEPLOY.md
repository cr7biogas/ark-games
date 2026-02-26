# ARK Games Deploy Guide

## Vercel Config
- **Project:** ark-games
- **URL:** https://ark-games.vercel.app
- **Project ID:** prj_tlDnvFU3vvDAZ3JMSoNngCHwCZpm
- **Org ID:** team_oNwVOxVnhrYqhZJ7x3kbAH4P

## Deploy Commands

### Quick Deploy (from project root)
```bash
cd /data/.openclaw/workspace/ark-games
vercel --prod --yes
```

### If alias needed
```bash
vercel alias set <deployment-url> ark-games.vercel.app
```

## File Structure
```
ark-games/
├── public/           # Main app files
│   ├── index.html    # Landing page
│   ├── admin.html    # Admin panel
│   ├── judge.html    # Judge interface
│   ├── leaderboard.html
│   ├── athlete.html
│   └── firebase-config.js
├── vercel.json       # Vercel config
└── .vercel/          # Vercel project link
```

## Firebase
- Project: `copilota-6d94a`
- Paths: `ark_*` (ark_teams, ark_workouts, ark_scores, ark_timer)

## Notes
- Vercel CLI is already authenticated in the sandbox
- No need for manual token - just run `vercel --prod --yes`
- Changes in `public/` folder are deployed as static files
