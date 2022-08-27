import type { NextPage } from "next";
import Head from "next/head";
import Link from "next/link";
import { useState } from "react";

const Signup: NextPage = () => {
  const [username, setUsername] = useState<string>("");
  const [password, setPassword] = useState<string>("");
  const [confirmPassword, setConfirmPassword] = useState<string>("");
  const handleSubmit = () => {
    console.log(username, password, confirmPassword);
  };
  return (
    <div>
      <Head>
        <title>Signup</title>
      </Head>
      <form onSubmit={handleSubmit}>
        <div className="max-w-lg mx-auto flex flex-col">
          <h2 className="text-center py-5 text-2xl font-semibold">Signup</h2>
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
          <label className="block text-sm" htmlFor="confirm-password">
            Confirm password
          </label>
          <input
            className="block mb-5 px-2 py-3 border focus:border-yellow-500 border-yellow-600 rounded outline-0 focus:bg-orange-50"
            id="confirm-password"
            type="password"
            placeholder="****"
            onChange={(e) => setConfirmPassword(e.target.value)}
          />
          <button
            type="submit"
            className="self-end border border-green-700 px-2 py-1 rounded bg-green-200 hover:bg-green-300 font-semibold disabled:opacity-60 disabled:hover:bg-green-200"
            disabled={!username || !password || !confirmPassword}
          >
            Submit
          </button>
          <p className="text-sm self-end mt-3">
            Already have an account?{" "}
            <Link href="/signup">
              <a className="font-semibold text-blue-600 hover:text-blue-800">
                login here
              </a>
            </Link>
          </p>
        </div>
      </form>
    </div>
  );
};

export default Signup;
