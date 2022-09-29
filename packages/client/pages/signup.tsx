import { useFormik } from "formik";
import type { NextPage } from "next";
import Head from "next/head";
import Link from "next/link";
import { useRouter } from "next/router";
import * as Yup from "yup";
import Breadcrumbs from "../components/common/Breadcrumbs";
import Button from "../components/common/Button";
import Hero from "../components/common/Hero";
import InputField from "../components/common/InputField";
import SingleColumn from "../components/styled/SingleColumn";
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
        <div className="flex flex-col">
          <Hero
            title="Signup"
            caption="Create a new account to add books as owner"
          />
          <SingleColumn>
            <Breadcrumbs
              list={[{ title: "Home", link: "/" }, { title: "Signup" }]}
            />
            <InputField
              id="name"
              value={values.name}
              label="Name"
              placeholder="enter your name"
              onChange={handleChange}
              onBlur={handleBlur}
              showError={!!errors.name && touched.name}
              errorMessage={errors.name}
            />
            <InputField
              id="username"
              value={values.username}
              label="Username"
              placeholder="enter your username"
              onChange={handleChange}
              onBlur={handleBlur}
              showError={!!errors.username && touched.username}
              errorMessage={errors.username}
            />
            <InputField
              id="password"
              value={values.password}
              label="Password"
              type="password"
              placeholder="****"
              onChange={handleChange}
              onBlur={handleBlur}
              showError={!!errors.password && touched.password}
              errorMessage={errors.password}
            />
            <InputField
              id="confirmPassword"
              value={values.confirmPassword}
              label="Confirm password"
              type="password"
              placeholder="****"
              onChange={handleChange}
              onBlur={handleBlur}
              showError={!!errors.confirmPassword && touched.confirmPassword}
              errorMessage={errors.confirmPassword}
            />

            <Button
              type="submit"
              disabled={
                !!errors.username ||
                !!errors.password ||
                !!errors.confirmPassword ||
                !!errors.name
              }
            >
              Submit
            </Button>
            <p className="text-sm self-end mt-3">
              Already have an account?{" "}
              <Link href="/login">
                <a className="font-semibold text-accent-500">login here</a>
              </Link>
            </p>
          </SingleColumn>
        </div>
      </form>
    </div>
  );
};

export default Signup;
