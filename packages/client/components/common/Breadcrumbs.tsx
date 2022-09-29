import Link from "next/link";
import React, { FC } from "react";
import { Breadcrumb } from "../../types";

interface BreadcrumbsProps {
  list: Breadcrumb[];
}

const Breadcrumbs: FC<BreadcrumbsProps> = ({ list }) => {
  return (
    <div className="text-xs mt-4 mb-3 py-2">
      {list.map((item, index) => (
        <>
          {item.link ? (
            <Link key={item.title} href={item.link}>
              <a className="text-accent-500 underline font-bold">
                {item.title}
              </a>
            </Link>
          ) : (
            <span key={item.title} className="">
              {item.title}
            </span>
          )}
          {index !== list.length - 1 ? " > " : ""}
        </>
      ))}
    </div>
  );
};

export default Breadcrumbs;
