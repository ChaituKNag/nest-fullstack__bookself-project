import type { NextPage, NextPageContext } from "next";
import Head from "next/head";
import Link from "next/link";
import { getCookieValue } from "../utils/session";
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
        <h1 className="text-3xl font-bold underline">Hello world!</h1>
      )}
    </div>
  );
};

export async function getServerSideProps({ req, res }: NextPageContext) {
  const token = getCookieValue(req?.headers.cookie, "token");
  const resp = await fetch(
    `${process.env.NEXT_PUBLIC_WEB_HOST}/api/login/status`,
    {
      headers: {
        "Content-Type": "application/json",
        cookie: `token=${token}`
      }
    }
  );
  const status = await resp.json();

  console.log(token, status);

  if (!status.name) {
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
    } // will be passed to the page component as props
  };
}

export default Home;
