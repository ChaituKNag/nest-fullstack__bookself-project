import { getCookie } from "cookies-next";
import { useFormik } from "formik";
import type { NextPage, NextPageContext } from "next";
import Head from "next/head";
import Link from "next/link";
import { useRouter } from "next/router";
import * as Yup from "yup";
import Breadcrumbs from "../components/common/Breadcrumbs";
import Button from "../components/common/Button";
import Hero from "../components/common/Hero";
import SingleColumn from "../components/styled/SingleColumn";
import { httpGet, httpPost } from "../services/api-service";

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

  return (
    <>
      <Head>
        <title>Login</title>
      </Head>
      <form onSubmit={handleSubmit}>
        <Hero
          title="Login"
          caption="Use your username and password to login to your account."
        />
        <SingleColumn>
          <Breadcrumbs
            list={[{ title: "Home", link: "/" }, { title: "Login" }]}
          />
          <label className="block relative mb-2" htmlFor="username">
            <span className="block text-sm font-semibold text-base-500">
              Username
            </span>
            <input
              className="w-full md:w-1/2 px-4 py-3 mb-5  rounded outline-0 bg-base-100"
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
          <label className="block relative mb-2" htmlFor="password">
            <span className="block text-sm font-semibold text-base-500">
              Password
            </span>

            <input
              className="w-full md:w-1/2 px-4 py-3 mb-5  rounded outline-0 bg-base-100"
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
          <Button
            type="submit"
            disabled={!!errors.username || !!errors.password}
          >
            Submit
          </Button>
          <p className="text-sm self-end mt-3">
            New here?{" "}
            <Link href="/signup">
              <a className="font-semibold text-accent-500">signup</a>
            </Link>
          </p>
          <p className="text-sm self-end mt-3">
            Forgot password?{" "}
            <Link href="/password-reset">
              <a className="font-semibold text-accent-500">reset password</a>
            </Link>
          </p>
        </SingleColumn>
      </form>
    </>
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
