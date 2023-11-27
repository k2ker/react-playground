"use client";
import React, { Suspense } from "react";
import { getProducts, useProductsGet } from "@/api/fake/product";
import ProductItem, { ProductItemSkeleton } from "./ProductItem";

const ProductListClient = () => {
  // const products = await getProducts();
  const { data: products } = useProductsGet();
  console.log(products);

  return (
    <div className="mx-auto mt-10 grid max-w-screen-xl grid-cols-1 gap-4 px-4 py-10 md:grid-cols-2 xl:grid-cols-4 xl:px-0">
      {products?.map((item: Product) => (
        <ProductItem item={item} key={item.id} />
      ))}
    </div>
  );
};

export default ProductListClient;

export function ProductListSkeleton() {
  return (
    <div className="mx-auto mt-10 grid max-w-screen-xl grid-cols-1 gap-4 px-4 py-10 md:grid-cols-2 xl:grid-cols-4 xl:px-0">
      {Array.from({ length: 8 }).map((_, i) => (
        <ProductItemSkeleton key={i} />
      ))}
    </div>
  );
}
