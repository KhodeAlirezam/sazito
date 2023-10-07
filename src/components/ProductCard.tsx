"use client";

import { Card, CardFooter, CardBody, cn } from "@nextui-org/react";
import Link from "next/link";

import { Product } from "@/typings/database";

import Img from "./Img";

interface ProductCardProps extends Partial<Product> {
  href?: string;
  className?: string;
}

export function ProductCard({
  name,
  images,
  href,
  className,
}: ProductCardProps) {
  const CardComponent = (
    <Card className={cn("h-full rounded-lg", className)}>
      <CardBody className="relative aspect-square rounded-t-lg">
        <Img
          className="rounded-t-lg object-cover"
          src={"https://geektori.ir" + images?.[0].url ?? ""}
          alt={images?.[0].url ?? ""}
          fill={true}
          loading="lazy"
        />
      </CardBody>
      <CardFooter className="direction-rtl h-20" aria-label={name}>
        <span className="truncate text-sm font-bold">استیکر {name}</span>
      </CardFooter>
    </Card>
  );

  if (!href) {
    return CardComponent;
  }

  return <Link href={href}>{CardComponent}</Link>;
}
