import { withAuth } from "next-auth/middleware"

export default withAuth({
  callbacks: {
    authorized: ({ token }) => !!token
  },
})
// Compare this snippet from google-drive-finder/src/app/api/auth/[...nextauth].ts: