"use client";
import { Loader2, Search, X } from "lucide-react";
import React, { useCallback, useEffect, useState } from "react";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "../ui/dialog";
import { client } from "@/sanity/lib/client";
import { Input } from "../ui/input";
import AddToCartButton from "../AddToCartButton";
import { urlFor } from "@/sanity/lib/image";
import { Product } from "@/sanity.types";
import PriceView from "../PriceView";
import Image from "next/image";
import Link from "next/link";
import Logo from "./Logo";

const SearchBar = () => {
  const [search, setSearch] = useState("");
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(false);
  const [showSearch, setShowSearch] = useState(false);
  const [featuredProduct, setFeaturedProduct] = useState([]);

  const fetchFeaturedProducts = async () => {
    try {
      const query = `*[_type == "product" && isFeatured == true] | order(name asc)`;
      const response = await client.fetch(query);
      setFeaturedProduct(response);
    } catch (error) {
      console.error("Error fetching products:", error);
    }
  };

  useEffect(() => {
    if (showSearch === true) {
      fetchFeaturedProducts();
    }
  }, [showSearch]);

  // Fetch products from Sanity based on search input
  const fetchProducts = useCallback(async () => {
    if (!search) {
      setProducts([]);
      return;
    }

    setLoading(true);
    try {
      const query = `*[_type == "product" && name match $search] | order(name asc)`;
      const params = { search: `${search}*` };
      const response = await client.fetch(query, params);
      setProducts(response);
    } catch (error) {
      console.error("Error fetching products:", error);
    } finally {
      setLoading(false);
    }
  }, [search]);

  // Debounce input changes to reduce API calls
  useEffect(() => {
    const debounceTimer = setTimeout(() => {
      fetchProducts();
    }, 300); // Delay of 300ms

    return () => clearTimeout(debounceTimer); // Cleanup the timer
  }, [search, fetchProducts]);
  return (
    <Dialog open={showSearch} onOpenChange={() => setShowSearch(!showSearch)}>
      <DialogTrigger
        onClick={() => setShowSearch(!showSearch)}
        className="flex items-center"
      >
        <Search className="w-5 h-5 hover:text-shop_light_green hoverEffect" />
      </DialogTrigger>
      <DialogContent className="max-w-5xl min-h-[90vh] max-h-[90vh] flex flex-col overflow-hidden">
        <DialogHeader>
          <DialogTitle className="mb-1">Product Searchbar</DialogTitle>
          <form className="relative" onSubmit={(e) => e.preventDefault()}>
            <Input
              placeholder="Search your product here..."
              className="flex-1 rounded-md py-5"
              value={search}
              onChange={(e) => setSearch(e.target.value)}
            />
            {search && (
              <X
                onClick={() => setSearch("")}
                className="w-4 h-4 absolute top-3 right-11 hover:text-red-600 hoverEffect"
              />
            )}
            <button
              type="submit"
              className="absolute right-0 top-0 bg-shop_dark_green/10 w-10 h-full flex items-center justify-center rounded-tr-md hover:bg-shop_dark_green hover:text-white hoverEffect"
            >
              <Search className="w-5 h-5" />
            </button>
          </form>
        </DialogHeader>
        <div className="w-full h-full overflow-y-scroll border border-darkColor/20 rounded-md">
          <div className="">
            {loading ? (
              <p className="flex items-center px-6 gap-1 py-10 text-center text-green-600 font-semibold">
                <Loader2 className="w-5 h-5 animate-spin" />
                Searching on progress...
              </p>
            ) : products?.length > 0 ? (
              products.map((product: Product) => (
                <div
                  key={product?._id}
                  className="bg-white overflow-hidden border-b"
                >
                  <div className="flex items-center p-1">
                    <Link
                      href={`/product/${product?.slug?.current}`}
                      onClick={() => setShowSearch(false)}
                      className="h-20 w-20 md:h-24 md:w-24 shrink-0 border border-darkColor/20 rounded-md overflow-hidden group"
                    >
                      {product?.images && (
                        <Image
                          width={200}
                          height={200}
                          src={urlFor(product?.images[0]).url()}
                          alt={"productImage"}
                          className={`object-cover w-full h-full group-hover:scale-110 hoverEffect ${product?.stock === 0 && "opacity-50"}`}
                        />
                      )}
                    </Link>
                    <div className="px-4 py-2 grow">
                      <div className="flex justify-between items-start">
                        <Link
                          href={`/product/${product?.slug?.current}`}
                          onClick={() => setShowSearch(false)}
                        >
                          <h3 className="text-sm md:text-lg font-semibold text-gray-800 line-clamp-1">
                            {product.name}
                          </h3>
                        </Link>
                        <PriceView
                          price={product?.price}
                          discount={product?.discount}
                          className="md:text-lg"
                        />
                      </div>

                      <div className="w-60 mt-1">
                        <AddToCartButton product={product} className="w-44" />
                      </div>
                    </div>
                  </div>
                </div>
              ))
            ) : (
              <>
                <div className="py-5 px-3 bg-shop_dark_green/10 font-semibold tracking-wide">
                  {search === "" && !products?.length && (
                    <p className="text-darkText flex items-center gap-1">
                      <Search className="w-5 h-5" />
                      Search and explore your products from{" "}
                      <Logo className="text-base" />
                    </p>
                  )}
                  {search && products?.length === 0 && (
                    <p>
                      Nothing match with the keyword{" "}
                      <span className="underline text-red-600">{search}</span>.
                      Please try something else.
                    </p>
                  )}
                </div>
                <div className="space-y-2 flex flex-col my-5">
                  {featuredProduct?.length &&
                    featuredProduct?.map((item: Product) => (
                      <button
                        key={item?._id}
                        onClick={() => setSearch(item?.name as string)}
                        className="flex items-center gap-x-2 text-base font-medium hover:bg-lightGreen/30 px-3 py-1.5"
                      >
                        <Search className="w-5 h-5" /> {item?.name}
                      </button>
                    ))}
                </div>
              </>
            )}
          </div>
        </div>
      </DialogContent>
    </Dialog>
  );
};

export default SearchBar;
