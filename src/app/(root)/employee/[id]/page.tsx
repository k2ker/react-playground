import { getProduct } from "@/api/fake/product";
import Image from "next/image";

export default async function Product({ params }: { params: { id: string } }) {
  const product = await getProduct(params?.id);

  return (
    <main className="main flex items-center justify-center">
      <div className="flex flex-col items-center gap-y-4 text-white">
        <h1 className="text-3xl font-semibold">{product?.title}</h1>
        <div className="group relative h-96 w-64 overflow-hidden">
          <Image
            src={product?.image}
            alt="product image"
            width={500}
            height={500}
            placeholder="blur"
            blurDataURL="data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAAoAAAAKCAYAAACNMs+9AAAAFklEQVR42mN8//HLfwYiAOOoQvoqBABbWyZJf74GZgAAAABJRU5ErkJggg=="
            className="h-full w-full rounded-lg object-cover"
          />
        </div>
        <p className="text-2xl font-semibold">{product?.price}</p>
        <p className="text-xl">{product?.description}</p>
      </div>
    </main>
  );
}
