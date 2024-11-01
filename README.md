# File finder 🔎

# Stack 📚
- React
- TankStack query
- TypeScrip
- Next.js

# setup project 🫨

`git clone https://github.com/bettyrjc/files-finder.git`
`npm install`
`config envs
`npm dev`

# URL Vercel

[Link to vercel](https://files-finder.vercel.app/)

# how to deploy to production

Just push main branch
config envs, see .env.template.


`git push main`

# File Structure

```
.
├── README.md
├── next-env.d.ts
├── next.config.ts
├── package-lock.json
├── package.json
├── postcss.config.mjs
├── public
│   ├── file.svg
│   ├── globe.svg
│   ├── next.svg
│   ├── vercel.svg
│   └── window.svg
├── src
│   └── app
│       ├── api
│       ├── assets
│       ├── auth
│       ├── favicon.ico
│       ├── files
│       ├── globals.css
│       ├── layout.tsx
│       ├── lib
│       ├── middleware.ts
│       ├── page.tsx
│       ├── provider
│       └── shared
├── tailwind.config
```

# Improvements
 - [ ] add search input
 - [ ] add filter by name
 - [ ] test
 - [ ] allow validation for 401.
 - [ ] finish setup logout and put email a password in the auth config
 - [ ] paginate the 'table', charging data when it is at the end of the screen
 
# NOTE: 
- .env.template should be without values, but for the challenge test, I put all for a faster access
- API for login is only for configuration, the info to log in the correct user is in env. 
- Logout all configuration is missing.
-Auth config is only for effect ux it is not complete.
