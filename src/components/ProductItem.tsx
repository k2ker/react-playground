"use client";

import Image from "next/image";
import Link from "next/link";
import FormattedPrice from "./FormattedPrice";

interface ItemProps {
  item: Product;
}

const ProductItem = ({ item }: ItemProps) => {
  //   const startArray = Array.from({ length: item?.rating }, (_, index) => (
  //     <span key={index} className="text-yellow-400">
  //       <IoIosStar />
  //     </span>
  //   ));

  return (
    <div className="w-full overflow-hidden rounded-lg">
      <div>
        <Link href={`/product/${item.id}`}>
          <div className="group relative h-96 w-full overflow-hidden">
            <Image
              src={item?.image}
              alt="product image"
              width={500}
              height={500}
              className="h-full w-full rounded-t-lg object-cover duration-200 group-hover:scale-110"
            />
          </div>
        </Link>
        <div className="flex flex-col gap-y-2 rounded-b-lg border-[1px] border-t-0 border-slate-300 bg-white px-2 py-4">
          <p className="line-clamp-1 w-full">{item?.title}</p>
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-x-2">
              <p className="font-semibold">
                <FormattedPrice amount={item?.price} />
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ProductItem;
