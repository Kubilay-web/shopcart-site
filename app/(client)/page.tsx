import HomeCategories from "@/components/HomeCategories";
import LatestBlog from "@/components/LatestBlog";
import HomeBanner from "@/components/new/HomeBanner";
import ProductGrid from "@/components/ProductGrid";
import ShopByBrands from "@/components/ShopByBrands";
import { getCategories } from "@/sanity/queries";

export default async function Home() {
  const categories = await getCategories(6);

  return (
    <div>
      <HomeBanner />
      <div className="py-10">
        <ProductGrid />
        <HomeCategories categories={categories} />
        <ShopByBrands />
        <LatestBlog />
      </div>
    </div>
  );
}
