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
 - [ ] finish to setup logout and put email a password in auth config
 - [ ] paginate the 'table', charging data when is in the end of the screen
 - [ ] 
 
# NOTE: 
- .env.template should be withou values, but for challenge test I put there easier config.All in a site.
- API for login, is only for configuration, the info to login correct user is in env. 
- logout 