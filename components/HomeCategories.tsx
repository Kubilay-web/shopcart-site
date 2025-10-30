import { Category } from "@/sanity.types";
import Container from "./Container";
import Title from "./Title";
import Link from "next/link";
import Image from "next/image";
import { urlFor } from "@/sanity/lib/image";

interface Props {
  categories: Category[];
}

const HomeCategories = ({ categories }: Props) => {
  return (
    <Container className="w-full bg-white border border-shop_light_green/20 mt-10 lg:mt-20 p-5 lg:p-7 rounded-md">
      <Title className="text-2xl border-b pb-3">Popular Categories</Title>
      <div className="mt-5 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5">
        {categories?.map((category) => (
          <div
            key={category?._id}
            className="bg-shop_light_bg p-5 flex items-center gap-3 group"
          >
            {category?.image && (
              <div className="overflow-hidden border border-shop_orange/30 hover:border-shop_orange hoverEffect w-20 h-20 p-1">
                <Link href={`/category/${category?.slug?.current}`}>
                  <Image
                    src={urlFor(category?.image).url()}
                    alt="categoryImage"
                    width={500}
                    height={500}
                    className="w-full h-full object-contain group-hover:scale-110 hoverEffect"
                  />
                </Link>
              </div>
            )}
            <div className="space-y-2">
              <p className="text-base font-semibold">{category?.title}</p>
              <p className="text-sm">
                <span className="font-bold text-shop_dark_green">
                  {`(${category?.productCount})`}
                </span>{" "}
                items Available
              </p>
            </div>
          </div>
        ))}
      </div>
    </Container>
  );
};

export default HomeCategories;
