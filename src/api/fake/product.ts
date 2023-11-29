import { useQuery } from "@tanstack/react-query";
import api from "./api";

export const productKeys = {
  all: ["product"] as const,
};

export const getProducts = async () => {
  const response = await api.get(`/products`);
  return response.data;
};

export const useProductsGet = () =>
  useQuery({
    queryKey: productKeys.all,
    queryFn: () => getProducts(),
  });

export const getProduct = async (id: string) => {
  const response = await api.get(`/products/${id}`);
  return response.data;
};

export const useProductGet = (id: string) =>
  useQuery({
    queryKey: productKeys.all,
    queryFn: () => getProduct(id),
  });
