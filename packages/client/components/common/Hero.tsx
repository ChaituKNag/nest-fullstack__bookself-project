import React, { FC } from "react";
import SingleColumn from "../styled/SingleColumn";

interface HeroProps {
  title: string;
  caption: string;
  className?: string;
}

const Hero: FC<HeroProps> = ({ title, caption, className = "" }) => {
  return (
    <div className={`hero bg-base-100 py-10 ${className}`}>
      <SingleColumn>
        <h2 className="py-5 text-2xl font-header text-5xl ">{title}</h2>
        <p className="text-2xl font-body font-light">{caption}</p>
      </SingleColumn>
    </div>
  );
};

export default Hero;
