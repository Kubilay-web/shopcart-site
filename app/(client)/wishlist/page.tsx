import NoAccessToCart from "@/components/NoAccessToCart";
import WishlistProducts from "@/components/WishlistProducts";
import { currentUser } from "@clerk/nextjs/server";
import React from "react";

const WishListPage = async () => {
  const user = await currentUser();

  return (
    <div>
      {user ? (
        <WishlistProducts />
      ) : (
        <NoAccessToCart details="Log in to view your wishlist items. Don’t miss out on your cart products to make the payment!" />
      )}
    </div>
  );
};

export default WishListPage;
