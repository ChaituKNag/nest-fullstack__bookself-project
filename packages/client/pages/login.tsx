import type { NextPage } from "next";
import Head from "next/head";
import Link from "next/link";
import { FormEvent, useState } from "react";

const Login: NextPage = () => {
  const [username, setUsername] = useState<string>("");
  const [password, setPassword] = useState<string>("");
  const handleSubmit = async (e: FormEvent) => {
    e.preventDefault();
    const response = await fetch("/api/login", {
      method: "post",
      body: JSON.stringify({
        username,
        password
      })
    });

    const data = await response.json();

    console.log(data);
  };
  return (
    <div>
      <Head>
        <title>Login</title>
      </Head>
      <form onSubmit={handleSubmit}>
        <div className="max-w-lg mx-auto flex flex-col">
          <h2 className="text-center py-5 text-2xl font-semibold">Login</h2>
          <label className="block text-sm" htmlFor="username">
            Username
          </label>
          <input
            className="block mb-5 px-2 py-3 border focus:border-yellow-500 border-yellow-600 rounded outline-0 focus:bg-orange-50"
            id="username"
            type="text"
            placeholder="enter your username"
            onChange={(e) => setUsername(e.target.value)}
          />
          <label className="block text-sm" htmlFor="password">
            Password
          </label>
          <input
            className="block mb-5 px-2 py-3 border focus:border-yellow-500 border-yellow-600 rounded outline-0 focus:bg-orange-50"
            id="password"
            type="password"
            placeholder="****"
            onChange={(e) => setPassword(e.target.value)}
          />
          <button
            type="submit"
            className="self-end border border-green-700 px-2 py-1 rounded bg-green-200 hover:bg-green-300 font-semibold"
          >
            Submit
          </button>
          <p className="text-sm self-end mt-3">
            New here?{" "}
            <Link href="/signup">
              <a className="font-semibold text-blue-600 hover:text-blue-800">
                signup
              </a>
            </Link>
            . Forgot password?{" "}
            <Link href="/password-reset">
              <a className="font-semibold text-blue-600 hover:text-blue-800">
                reset password
              </a>
            </Link>
            .
          </p>
        </div>
      </form>
    </div>
  );
};

export default Login;
