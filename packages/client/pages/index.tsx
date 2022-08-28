import { getCookie } from "cookies-next";
import type { NextPage, NextPageContext } from "next";
import Head from "next/head";
import Link from "next/link";
import BooksList from "../components/feature/BooksList";
import { httpGet } from "../services/api-service";
interface HomeProps {
  authenticated: boolean;
}
const Home: NextPage<HomeProps> = ({ authenticated }) => {
  return (
    <div>
      <Head>
        <title>Home</title>
      </Head>
      {!authenticated ? (
        <p className="py-5">
          Not authenticated.{" "}
          <Link href="/login">
            <a className="text-blue-600 font-semibold">Login</a>
          </Link>{" "}
          or{" "}
          <Link href="/signup">
            <a className="text-blue-600 font-semibold">signup</a>
          </Link>
        </p>
      ) : (
        <BooksList />
      )}
    </div>
  );
};

export async function getServerSideProps({ req, res }: NextPageContext) {
  const token = getCookie("token", { req, res });
  const resp = await httpGet(
    `${process.env.NEXT_PUBLIC_WEB_HOST}/api/login/status?token=${token}`
  );

  if (resp.status !== "success") {
    return {
      // redirect: {
      //   destination: "/login",
      //   permanent: false
      // }
      props: {
        authenticated: false
      }
    };
  }

  return {
    props: {
      authenticated: true
    }
  };
}

export default Home;
