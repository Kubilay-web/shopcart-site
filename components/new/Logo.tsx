import { cn } from "@/lib/utils";
import Link from "next/link";
import React from "react";

interface Props {
  className?: string;
}

const Logo = ({ className }: Props) => {
  return (
    <Link href={"/"}>
      <h2
        className={cn(
          "text-2xl md:text-4xl text-shop_dark_green font-black tracking-wider uppercase hover:text-shop_light_green hoverEffect group font-sans",
          className
        )}
      >
        Betprin
        <span className="text-shop_light_green group-hover:text-shop_dark_green hoverEffect">
          t
        </span>
      </h2>
    </Link>
  );
};

export default Logo;
