import { GridChildComponentProps } from "react-window";

import { ProductCard } from "@/components/ProductCard";
import { Product } from "@/typings/database";

interface Props extends GridChildComponentProps {
  columnIndex: number;
  rowIndex: number;
  data: {
    products: Product[];
    columnCount: number;
  };
}

function getGridIndex(
  rowIndex: number,
  columnIndex: number,
  columnCount: number,
) {
  return columnCount * rowIndex + columnIndex;
}

export function GridCell({ columnIndex, rowIndex, style, data }: Props) {
  const { products, columnCount } = data;
  const { name, images, id } =
    products[getGridIndex(rowIndex, columnIndex, columnCount)];

  return (
    <div className="p-2" style={style}>
      <ProductCard name={name} images={images} href={`/product/${id}`} />
    </div>
  );
}
