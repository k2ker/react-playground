import React from "react";
import { getProducts } from "@/api/fake/product";
import ProductItem from "./ProductItem";

const ProductList = async () => {
  const products = await getProducts();

  return (
    <div className="mx-auto mt-10 grid max-w-screen-xl grid-cols-1 gap-4 px-4 py-10 md:grid-cols-2 xl:grid-cols-4 xl:px-0">
      {products?.map((item: Product) => (
        <ProductItem item={item} key={item.id} />
      ))}
    </div>
  );
};

export default ProductList;
