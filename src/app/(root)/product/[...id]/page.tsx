import { getProduct } from "@/api/fake/product";

export default async function Product({ params }: { params: { id: string } }) {
  const product = await getProduct(params?.id);

  return (
    <main className="main flex items-center justify-center">
      <div className="flex flex-col items-center gap-y-4 text-white">
        <h1 className="text-3xl font-semibold">{product?.title}</h1>
        <img src={product?.image} alt="product image" className="h-96 w-96" />
        <p className="text-2xl font-semibold">{product?.price}</p>
        <p className="text-xl">{product?.description}</p>
      </div>
    </main>
  );
}
