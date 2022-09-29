import React, { FC, ReactNode } from "react";

interface SingleColumnProps {
  className?: string;
  children: ReactNode;
}
const SingleColumn: FC<SingleColumnProps> = ({ className = "", children }) => {
  return (
    <div className={`mx-auto max-w-3xl w-full ${className}`}>{children}</div>
  );
};

export default SingleColumn;
