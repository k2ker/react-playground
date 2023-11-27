import React, { Suspense } from "react";
import { getProducts, getProductsError } from "@/api/fake/product";
import ProductItem, { ProductItemSkeleton } from "./ProductItem";

const ProductList = async () => {
  const products = await getProductsError();

  return (
    <Suspense fallback={<ProductListSkeleton />}>
      <div className="mx-auto mt-10 grid max-w-screen-xl grid-cols-1 gap-4 px-4 py-10 md:grid-cols-2 xl:grid-cols-4 xl:px-0">
        {products?.map((item: Product) => (
          <ProductItem item={item} key={item.id} />
        ))}
      </div>
    </Suspense>
  );
};

export default ProductList;

export function ProductListSkeleton() {
  return (
    <div className="mx-auto mt-10 grid max-w-screen-xl grid-cols-1 gap-4 px-4 py-10 md:grid-cols-2 xl:grid-cols-4 xl:px-0">
      {Array.from({ length: 8 }).map((_, i) => (
        <ProductItemSkeleton key={i} />
      ))}
    </div>
  );
}
