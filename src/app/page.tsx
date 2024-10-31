'use client'
import FilesFinder from "./files/views/index";
import Header from "./shared/layout/Header";
import { useSession } from "next-auth/react"
import Login from "./auth/page";

export default function Home() {
  const { data: session, status } = useSession()
  console.log('session', session)
  console.log('status', status)

  if (status === "loading") {
    return <div>Loading...</div>
  }
  if (status === "unauthenticated") {
    return <Login />
  }
  return (
    <>
      <header>
        <Header />
      </header>
      <div className="items-center justify-items-center min-h-screen  px-5 lg:px-20 font-[family-name:var(--font-geist-sans)] ">
        <main >
          <FilesFinder />
        </main>
      </div>
    </>
  );
}
