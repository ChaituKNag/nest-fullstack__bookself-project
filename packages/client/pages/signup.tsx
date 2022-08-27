import { useFormik } from "formik";
import type { NextPage } from "next";
import Head from "next/head";
import Link from "next/link";
import { useRouter } from "next/router";
import * as Yup from "yup";
import { httpPost } from "../services/api-service";

const SignupSchema = Yup.object().shape({
  name: Yup.string().required("Please give your name"),
  username: Yup.string()
    .required("Please give a username")
    .min(5, "Too short")
    .max(15, "Too long"),
  password: Yup.string()
    .required("Please give the password")
    .min(5, "Too short")
    .max(16, "Too long"),
  confirmPassword: Yup.string()
    .required("Please confirm the password")
    .min(5, "Too short")
    .max(16, "Too long")
    .when("password", {
      is: (val: string) => val && val.length > 0,
      then: Yup.string().oneOf([Yup.ref("password")], "Password mismatch")
    })
});

const Signup: NextPage = () => {
  const router = useRouter();
  const { values, handleChange, handleBlur, handleSubmit, touched, errors } =
    useFormik({
      initialValues: {
        name: "",
        username: "",
        password: "",
        confirmPassword: ""
      },
      validationSchema: SignupSchema,
      onSubmit: async ({ name, username, password }) => {
        const resp = await httpPost(
          `${process.env.NEXT_PUBLIC_WEB_HOST}/api/signup`,
          {
            name,
            username,
            password
          }
        );

        if (resp.status === "success") {
          router.push("/login");
        }
      }
    });

  return (
    <div className="mb-5">
      <Head>
        <title>Signup</title>
      </Head>
      <form onSubmit={handleSubmit}>
        <div className="max-w-lg mx-auto flex flex-col">
          <h2 className="text-center py-5 text-2xl font-semibold">Signup</h2>
          <label className="block relative mb-1" htmlFor="username">
            <span className="block text-sm font-semibold">Name</span>

            <input
              className="w-full mb-5 px-2 py-3 border focus:border-yellow-500 border-yellow-600 rounded outline-0 focus:bg-orange-50"
              id="name"
              type="text"
              placeholder="enter your name"
              onChange={handleChange}
              onBlur={handleBlur}
              value={values.name}
            />
            {errors.name && touched.name && (
              <p className="text-red-500 text-sm absolute inset-x-0 bottom-0">
                {errors.name}
              </p>
            )}
          </label>
          <label className="block relative mb-1" htmlFor="username">
            <span className="block text-sm font-semibold">Username</span>

            <input
              className="w-full mb-5 px-2 py-3 border focus:border-yellow-500 border-yellow-600 rounded outline-0 focus:bg-orange-50"
              id="username"
              type="text"
              placeholder="enter your username"
              onChange={handleChange}
              onBlur={handleBlur}
              value={values.username}
            />
            {errors.username && touched.username && (
              <p className="text-red-500 text-sm absolute inset-x-0 bottom-0">
                {errors.username}
              </p>
            )}
          </label>
          <label className="block relative mb-1" htmlFor="password">
            <span className="block text-sm font-semibold">Password</span>

            <input
              className="w-full mb-5 px-2 py-3 border focus:border-yellow-500 border-yellow-600 rounded outline-0 focus:bg-orange-50"
              id="password"
              type="password"
              placeholder="****"
              onChange={handleChange}
              onBlur={handleBlur}
              value={values.password}
            />
            {errors.password && touched.password && (
              <p className="text-red-500 text-sm absolute inset-x-0 bottom-0">
                {errors.password}
              </p>
            )}
          </label>
          <label className="block relative mb-1" htmlFor="confirm-password">
            <span className="block text-sm font-semibold">
              Confirm password
            </span>

            <input
              className="w-full mb-5 px-2 py-3 border focus:border-yellow-500 border-yellow-600 rounded outline-0 focus:bg-orange-50"
              id="confirmPassword"
              type="password"
              placeholder="****"
              onChange={handleChange}
              onBlur={handleBlur}
              value={values.confirmPassword}
            />
            {errors.confirmPassword && touched.confirmPassword && (
              <p className="text-red-500 text-sm absolute inset-x-0 bottom-0">
                {errors.confirmPassword}
              </p>
            )}
          </label>
          <button
            type="submit"
            className="self-end border border-green-700 px-2 py-1 rounded bg-green-200 hover:bg-green-300 font-semibold disabled:opacity-60 disabled:hover:bg-green-200"
            disabled={
              !!errors.username ||
              !!errors.password ||
              !!errors.confirmPassword ||
              !!errors.name
            }
          >
            Submit
          </button>
          <p className="text-sm self-end mt-3">
            Already have an account?{" "}
            <Link href="/login">
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
