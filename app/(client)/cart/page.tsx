"use client";
import Container from "@/components/Container";
import PriceFormatter from "@/components/PriceFormatter";
import QuantityButtons from "@/components/QuantityButtons";
import { Button } from "@/components/ui/button";
import { Separator } from "@/components/ui/separator";
import { urlFor } from "@/sanity/lib/image";
import useCartStore from "@/store";
import { useAuth, useUser } from "@clerk/nextjs";
import { ShoppingBag, Trash } from "lucide-react";
import Image from "next/image";
import Link from "next/link";
import React, { useEffect, useState } from "react";
import toast from "react-hot-toast";
import EmptyCart from "@/components/EmptyCart";
import NoAccessToCart from "@/components/NoAccessToCart";
import {
  createCheckoutSession,
} from "@/actions/createCheckoutSession";
import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from "@/components/ui/tooltip";
import Loading from "@/components/Loading";
import { Address, ADDRESS_QUERYResult } from "@/sanity.types";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Label } from "@/components/ui/label";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";
import ProductSideMenu from "@/components/ProductSideMenu";
import AddAddressModal from "@/components/AddAdressModal";
import EditAddressModal from "@/components/EditAddressModal";
import { Menu } from "@headlessui/react";
import { EllipsisVerticalIcon } from "@heroicons/react/24/outline";

const CartPage = () => {
  const {
    deleteCartProduct,
    getTotalPrice,
    getItemCount,
    getSubTotalPrice,
    resetCart,
  } = useCartStore();
  const [isClient, setIsClient] = useState(false);
  const [loading, setLoading] = useState(false);
  const groupedItems = useCartStore((state) => state.getGroupedItems());
  const { isSignedIn } = useAuth();
  const { user } = useUser();

  const [addresses, setAddresses] = useState<ADDRESS_QUERYResult | null>(null);
  const [selectedAddress, setSelectedAddress] = useState<Address | null>(null);
  const [isAddAddressModalOpen, setIsAddAddressModalOpen] = useState(false);
  const [editAddress, setEditAddress] = useState<Address | null>(null);
  const [isEditAddressModalOpen, setIsEditAddressModalOpen] = useState(false);

  // Delete modal state
  const [deleteAddressId, setDeleteAddressId] = useState<string | null>(null);
  const [isDeleteModalOpen, setIsDeleteModalOpen] = useState(false);



  // Client-side flag
  useEffect(() => {
    setIsClient(true);
  }, []);

  const fetchAddresses = async (userId?: string) => {
    if (!userId) return [];
    try {
      const res = await fetch(
        `${process.env.NEXT_PUBLIC_BASE_URL}/api/address?clerkUserId=${userId}`
      );
      const json = await res.json();
      if (json.success) return json.data;
      return [];
    } catch (error) {
      console.error(error);
      return [];
    }
  };

  useEffect(() => {
    if (user?.id) {
      fetchAddresses(user.id).then((addresses) => {
        setAddresses(addresses);
        // default adres varsa onu seç
        const defaultAddress = addresses?.find((addr) => addr.default);
        if (defaultAddress) setSelectedAddress(defaultAddress);
        else if (addresses?.length) setSelectedAddress(addresses[0]);
      });
    }
  }, [user?.id, isAddAddressModalOpen, isEditAddressModalOpen]);

  if (!isClient) return <Loading />;

  const handleResetCart = () => {
    if (window.confirm("Are you sure to reset your Cart?")) {
      resetCart();
      toast.success("Your cart reset successfully!");
    }
  };

  const handleCheckout = async () => {
    if (!user?.id) {
      toast.error("You must be signed in to checkout!");
      return;
    }
    setLoading(true);
    try {
      const metadata = {
        orderNumber: crypto.randomUUID(),
        customerName: user.fullName ?? "Unknown",
        customerEmail: user.emailAddresses[0]?.emailAddress ?? "Unknown",
        clerkUserId: user.id,
        address: selectedAddress,
      };

      const checkoutUrl = await createCheckoutSession(groupedItems, metadata);
      if (checkoutUrl) window.location.href = checkoutUrl;
    } catch (error) {
      console.error("❌ Error creating checkout session:", error);
      toast.error("Checkout failed. Try again.");
    } finally {
      setLoading(false);
    }
  };

  const handleDeleteProduct = (id: string) => {
    deleteCartProduct(id);
    toast.success("Product deleted successfully!");
  };

  return (
    <div className="bg-gray-50 pb-52 md:pb-10">
      {isSignedIn ? (
        <Container>
          {groupedItems?.length ? (
            <>
              <div className="flex items-center gap-2 py-5">
                <ShoppingBag className="h-6 w-6 text-primary" />
                <h1 className="text-2xl font-semibold">Shopping Cart</h1>
              </div>
              <div className="grid lg:grid-cols-3 md:gap-8">
                {/* Product View */}
                <div className="lg:col-span-2 rounded-lg">
                  <div className="border bg-white rounded-md">
                    {groupedItems?.map(({ product }) => {
                      const itemCount = getItemCount(product?._id);
                      return (
                        <div
                          key={product?._id}
                          className="border-b p-2.5 last:border-b-0 flex items-center justify-between gap-5"
                        >
                          <div className="flex flex-1 items-start gap-2 h-36 md:h-44">
                            {product?.images && (
                              <Link
                                href={`/product/${product?.slug?.current}`}
                                className="border p-0.5 md:p-1 mr-2 rounded-md overflow-hidden group"
                              >
                                <Image
                                  src={urlFor(product.images[0]).url()}
                                  alt="productImage"
                                  width={500}
                                  height={500}
                                  loading="lazy"
                                  className="w-32 md:w-40 h-32 md:h-40 object-cover group-hover:scale-105 transition-transform duration-500"
                                />
                              </Link>
                            )}
                            <div className="h-full flex flex-1 flex-col justify-between py-1">
                              <div className="flex flex-col gap-0.5 md:gap-1.5">
                                <h2 className="text-base font-semibold line-clamp-1">
                                  {product?.name}
                                </h2>
                                <p className="text-sm capitalize">
                                  Variant:{" "}
                                  <span className="font-semibold">{product?.variant}</span>
                                </p>
                                <p className="text-sm capitalize">
                                  Status:{" "}
                                  <span className="font-semibold">{product?.status}</span>
                                </p>
                              </div>
                              <div className="flex items-center gap-2">
                                <TooltipProvider>
                                  <Tooltip>
                                    <TooltipTrigger>
                                      <ProductSideMenu
                                        product={product}
                                        className="relative top-0 right-0"
                                      />
                                    </TooltipTrigger>
                                    <TooltipContent className="font-bold">
                                      Add to Favorite
                                    </TooltipContent>
                                  </Tooltip>
                                  <Tooltip>
                                    <TooltipTrigger>
                                      <Trash
                                        onClick={() => handleDeleteProduct(product?._id)}
                                        className="w-4 h-4 md:w-5 md:h-5 mr-1 text-gray-500 hover:text-red-600 hoverEffect"
                                      />
                                    </TooltipTrigger>
                                    <TooltipContent className="font-bold bg-red-600">
                                      Delete product
                                    </TooltipContent>
                                  </Tooltip>
                                </TooltipProvider>
                              </div>
                            </div>
                          </div>
                          <div className="flex flex-col items-start justify-between h-36 md:h-44 p-0.5 md:p-1">
                            <PriceFormatter
                              amount={(product?.price as number) * itemCount}
                              className="font-bold text-lg"
                            />
                            <QuantityButtons product={product} />
                          </div>
                        </div>
                      );
                    })}
                    <Button
                      onClick={handleResetCart}
                      className="m-5 font-semibold"
                      variant="destructive"
                    >
                      Reset Cart
                    </Button>
                  </div>
                </div>

                {/* Order Summary & Addresses */}
                <div>
                  <div className="lg:col-span-1">
                    <div className="hidden md:inline-block w-full bg-white p-6 rounded-lg border">
                      <h2 className="text-xl font-semibold mb-4">Order Summary</h2>
                      <div className="space-y-4">
                        <div className="flex justify-between">
                          <span>SubTotal</span>
                          <PriceFormatter amount={getSubTotalPrice()} />
                        </div>
                        <div className="flex justify-between">
                          <span>Discount</span>
                          <PriceFormatter
                            amount={getSubTotalPrice() - getTotalPrice()}
                          />
                        </div>
                        <Separator />
                        <div className="flex justify-between font-semibold text-lg">
                          <span>Total</span>
                          <PriceFormatter
                            amount={useCartStore?.getState().getTotalPrice()}
                            className="text-lg font-bold text-black"
                          />
                        </div>
                        <Button
                          onClick={handleCheckout}
                          disabled={loading}
                          className="w-full rounded-full font-semibold tracking-wide"
                          size="lg"
                        >
                          {loading ? "Processing" : "Proceed to Checkout"}
                        </Button>
                      </div>
                    </div>

                    {/* Address selection */}
                    {addresses && (
                      <div className="bg-white rounded-md mt-5">
                        <Card>
                          <CardHeader>
                            <CardTitle>Delivery Address</CardTitle>
                          </CardHeader>
                          <CardContent>
                            <RadioGroup
                              defaultValue={addresses
                                .find((addr) => addr.default)
                                ?._id.toString()}
                            >
                              {addresses.map((address) => (
                                <div
                                  key={address._id}
                                  className={`flex items-start justify-between mb-4 p-2 rounded cursor-pointer ${
                                    selectedAddress?._id === address._id
                                      ? "bg-green-50"
                                      : "hover:bg-gray-50"
                                  }`}
                                  onClick={() => setSelectedAddress(address)}
                                >
                                  <div className="flex items-center space-x-2 flex-1">
                                    <RadioGroupItem
                                      value={address._id.toString()}
                                      id={`address-${address._id}`}
                                    />
                                    <Label
                                      htmlFor={`address-${address._id}`}
                                      className="grid gap-1.5 flex-1"
                                    >
                                      <span className="font-semibold">{address.name}</span>
                                      <span className="text-sm text-muted-foreground">
                                        {address.address}, {address.city}, {address.state}{" "}
                                        {address.zip}
                                      </span>
                                    </Label>
                                  </div>

                                  {/* Dropdown */}
                                  <Menu as="div" className="relative inline-block text-left">
                                    <Menu.Button
                                      onClick={(e) => e.stopPropagation()}
                                      className="p-1 rounded hover:bg-gray-100"
                                    >
                                      <EllipsisVerticalIcon className="w-5 h-5 text-gray-600" />
                                    </Menu.Button>

                                    <Menu.Items className="absolute right-0 mt-2 w-28 origin-top-right bg-white border rounded shadow-lg focus:outline-none z-10">
                                      <Menu.Item>
                                        {({ active }) => (
                                          <button
                                            className={`${active ? "bg-gray-100" : ""} block w-full text-left px-4 py-2 text-sm text-gray-700`}
                                            onClick={() => {
                                              setEditAddress(address);
                                              setIsEditAddressModalOpen(true);
                                            }}
                                          >
                                            Edit
                                          </button>
                                        )}
                                      </Menu.Item>
                                      <Menu.Item>
                                        {({ active }) => (
                                          <button
                                            className={`${active ? "bg-gray-100" : ""} block w-full text-left px-4 py-2 text-sm text-red-600`}
                                            onClick={() => {
                                              setDeleteAddressId(address._id);
                                              setIsDeleteModalOpen(true);
                                            }}
                                          >
                                            Delete
                                          </button>
                                        )}
                                      </Menu.Item>
                                    </Menu.Items>
                                  </Menu>
                                </div>
                              ))}
                            </RadioGroup>

                            {/* Add/Edit Address Modals */}
                            <AddAddressModal
                              open={isAddAddressModalOpen}
                              onOpenChange={setIsAddAddressModalOpen}
                              onAddressAdded={fetchAddresses}
                            />

                            {editAddress && (
                              <EditAddressModal
                                open={isEditAddressModalOpen}
                                onOpenChange={setIsEditAddressModalOpen}
                                address={editAddress}
                                onAddressUpdated={async () => {
                                  if (user?.id) {
                                    const newAddresses = await fetchAddresses(user.id);
                                    setAddresses(newAddresses);
                                  }
                                }}
                              />
                            )}
                          </CardContent>
                        </Card>
                      </div>
                    )}
                  </div>
                </div>
              </div>

              {/* Delete Address Modal */}
              {isDeleteModalOpen && (
                <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/50">
                  <div className="bg-white rounded-lg p-6 w-80 md:w-96 shadow-lg">
                    <h3 className="text-lg font-semibold mb-4">
                      Are you sure you want to delete this address?
                    </h3>
                    <div className="flex justify-end gap-2">
                      <Button
                        variant="outline"
                        onClick={() => {
                          setIsDeleteModalOpen(false);
                          setDeleteAddressId(null);
                        }}
                      >
                        Cancel
                      </Button>
                      <Button
                        variant="destructive"
                        onClick={async () => {
                          if (!deleteAddressId) return;
                          setLoading(true);
                          try {
                            const res = await fetch(
                              `${process.env.NEXT_PUBLIC_BASE_URL}/api/address/${deleteAddressId}`,
                              { method: "DELETE" }
                            );
                            const data = await res.json();
                            if (!res.ok || !data.success)
                              throw new Error(data.error || "Failed to delete address");

                            setAddresses((prev) =>
                              prev?.filter((addr) => addr._id !== deleteAddressId) || []
                            );
                            if (selectedAddress?._id === deleteAddressId) {
                              setSelectedAddress(null);
                            }
                            toast.success("Address deleted successfully!");
                          } catch (error) {
                            console.error("❌ Delete address error:", error);
                            toast.error("Failed to delete address");
                          } finally {
                            setLoading(false);
                            setIsDeleteModalOpen(false);
                            setDeleteAddressId(null);
                          }
                        }}
                      >
                        Delete
                      </Button>
                    </div>
                  </div>
                </div>
              )}
            </>
          ) : (
            <EmptyCart />
          )}
        </Container>
      ) : (
        <NoAccessToCart />
      )}
    </div>
  );
};

export default CartPage;
