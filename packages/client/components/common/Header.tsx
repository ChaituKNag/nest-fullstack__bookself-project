import Link from "next/link";
import { useRouter } from "next/router";
import React, { FC } from "react";
import { httpPost } from "../../services/api-service";
interface HeaderProps {
  authenticated?: boolean;
}
const Header: FC<HeaderProps> = ({ authenticated }) => {
  const router = useRouter();
  const handleLogout = async () => {
    const data = await httpPost(
      `${process.env.NEXT_PUBLIC_WEB_HOST}/api/logout`
    );
    if (data?.status === "success") {
      router.push("/login");
    }
  };
  return (
    <div className="bg-orange-100 px-3 py-2">
      <div className="flex items-center  max-w-3xl w-full mx-auto">
        <Link href="/">
          <a className="flex-1 font-bold">The Book Shelf</a>
        </Link>

        <div className="justify-self-end">
          {!authenticated ? (
            <>
              <Link href="/login">
                <a className="hover:text-cyan-600 font-semibold px-1 mx-2 hover:underline underline-offset-8">
                  Login
                </a>
              </Link>
              <Link href="/signup">
                <a className="hover:text-cyan-600 font-semibold px-1 mx-2 hover:underline underline-offset-8">
                  Signup
                </a>
              </Link>
            </>
          ) : (
            <button
              onClick={handleLogout}
              className="font-semibold border border-red-500 px-3 py-1 rounded hover:bg-red-100"
            >
              Logout
            </button>
          )}
        </div>
      </div>
    </div>
  );
};

export default Header;
