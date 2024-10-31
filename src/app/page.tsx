import FilesFinder from "./modules/files/views/index";
import Header from "./modules/shared/layout/Header";


export default function Home() {

  return (
    <>
      <header>
        <Header />
      </header>
      <div className="items-center justify-items-center min-h-screen   px-20 font-[family-name:var(--font-geist-sans)] ">
        <main >
          <FilesFinder />
        </main>
      </div>
    </>
  );
}
