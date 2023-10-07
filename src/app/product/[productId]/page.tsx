import { notFound } from "next/navigation";

import { ProductCard } from "@/components/ProductCard";
import { getProduct } from "@/lib/helpers/database";

interface ProductPageProps {
  params: { productId: string };
}

export default async function ProductPage({ params }: ProductPageProps) {
  const { productId } = params;

  if (!productId) {
    return notFound();
  }

  const res = await getProduct(productId);

  if (!res) {
    return notFound();
  }

  return (
    <ProductCard
      className="w-full child:child:text-lg lg:flex-row"
      id={res.id}
      name={res.name}
      images={res.images}
    />
  );
}
