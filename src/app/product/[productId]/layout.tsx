import { ReactNode } from "react";

interface ProductPageLayout {
  children: ReactNode;
}

export default function ProductPageLayout({ children }: ProductPageLayout) {
  return <div className=" h-full w-full  p-6 ">{children}</div>;
}
