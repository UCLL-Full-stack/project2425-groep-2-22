import Header from "@/components/header";
import Head from "next/head";

const homePage: React.FC = () => {
  return (
    <>
      <Head>
        <title>Home</title>       
      </Head>
      <Header></Header>
      <main>
        <h1>Home</h1>
        <section>
        </section>
      </main>
    </>
  );
}
export default homePage;