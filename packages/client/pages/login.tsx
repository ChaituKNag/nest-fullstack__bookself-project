import { getCookie } from "cookies-next";
import { useFormik } from "formik";
import type { NextPage, NextPageContext } from "next";
import Head from "next/head";
import Link from "next/link";
import { useRouter } from "next/router";
import { FormEvent, useState } from "react";
import { httpGet, httpPost } from "../services/api-service";
import * as Yup from "yup";

const LoginSchema = Yup.object().shape({
  username: Yup.string()
    .required("Please give a username")
    .min(5, "Too short")
    .max(15, "Too long"),
  password: Yup.string()
    .required("Please give the password")
    .min(5, "Too short")
    .max(16, "Too long")
});

const Login: NextPage = () => {
  const router = useRouter();
  const { handleSubmit, handleBlur, handleChange, values, errors, touched } =
    useFormik({
      initialValues: {
        username: "",
        password: ""
      },
      validationSchema: LoginSchema,
      onSubmit: async (values) => {
        const { username, password } = values;
        const data = await httpPost(
          `${process.env.NEXT_PUBLIC_WEB_HOST}/api/login`,
          {
            username,
            password
          }
        );

        if (data.status === "success") {
          router.push("/");
        }
      }
    });

  console.log(errors, touched);

  return (
    <div>
      <Head>
        <title>Login</title>
      </Head>
      <form onSubmit={handleSubmit}>
        <div className="max-w-lg mx-auto flex flex-col">
          <h2 className="text-center py-5 text-2xl font-semibold">Login</h2>
          <label className="block relative mb-5" htmlFor="username">
            <span className="block text-sm">Username</span>
            <input
              className="w-full px-2 py-3 border mb-5 focus:border-yellow-500 border-yellow-600 rounded outline-0 focus:bg-orange-50"
              id="username"
              type="text"
              placeholder="enter your username"
              onChange={handleChange}
              onBlur={handleBlur}
              value={values.username}
              required
            />
            {errors.username && touched.username && (
              <p className="text-red-500 text-sm absolute inset-x-0 bottom-0">
                {errors.username}
              </p>
            )}
          </label>
          <label className="block relative mb-3" htmlFor="password">
            <span className="block text-sm">Password</span>

            <input
              className="w-full px-2 py-3 border mb-5 focus:border-yellow-500 border-yellow-600 rounded outline-0 focus:bg-orange-50"
              id="password"
              type="password"
              placeholder="****"
              onChange={handleChange}
              onBlur={handleBlur}
              value={values.password}
              required
            />
            <p className="text-red-500 text-sm absolute inset-x-0 bottom-0">
              {errors.password && touched.password && errors.password}
            </p>
          </label>
          <button
            type="submit"
            className="self-end border border-green-700 px-2 py-1 rounded bg-green-200 hover:bg-green-300 font-semibold disabled:opacity-60 disabled:hover:bg-green-200"
            disabled={!!errors.username || !!errors.password}
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

export async function getServerSideProps({ req, res }: NextPageContext) {
  const token = getCookie("token", { req, res });
  const resp = await httpGet(
    `${process.env.NEXT_PUBLIC_WEB_HOST}/api/login/status?token=${token}`
  );

  if (resp.status === "success") {
    return {
      redirect: {
        destination: "/",
        permanent: true
      }
    };
  }

  return {
    props: {
      authenticated: resp.status === "success"
    }
  };
}

export default Login;
