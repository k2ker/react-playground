import React from "react";
import Container from "./Container";
import { getProducts } from "@/api/fake/product";
import ProductItem from "./ProductItem";

const Products = async () => {
  const products = await getProducts();

  return (
    <Container className="-mt-10 grid grid-cols-1 gap-4 md:grid-cols-2 xl:grid-cols-4">
      {products?.map((item: Product) => (
        <ProductItem item={item} key={item.id} />
      ))}
    </Container>
  );
};

export default Products;
