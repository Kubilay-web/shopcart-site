import React from "react";
import Title from "../Title";
import Container from "../Container";
import Image from "next/image";
import { banner_1 } from "@/images";
import Link from "next/link";

const HomeBanner = async () => {
  return (
    <div className="px-4">
      <Container className="py-16 md:py-0 bg-shop_light_pink rounded-lg px-10 lg:px-24 flex items-center justify-between">
        <div>
          <Title className="text-shop_dark_green capitalize tracking-wide font-bold font-sans text-3xl mb-5">
            Grab Upto 50% Off on <br />
            Selected headphone
          </Title>
          <Link
            href={"/shop"}
            className="bg-shop_btn_dark_green/90 text-white/90 px-5 py-2 rounded-md text-sm font-semibold hover:text-white hover:bg-shop_btn_dark_green hoverEffect"
          >
            Buy Now
          </Link>
        </div>
        <Image
          src={banner_1}
          alt="banner_1"
          className="hidden md:inline-flex w-96"
        />
      </Container>
    </div>
  );
};

export default HomeBanner;
