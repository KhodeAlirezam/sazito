export type DataBase = {
  products: Product[];
  productsMap: Record<string, Product>;
  categoryProductMap: Record<ProductCategory["id"], Product["id"][]>;
  categories: Pick<ProductCategory, "id" | "name">[];
};

export interface Product {
  id: number;
  enabled: boolean;
  name: string;
  product_type: string;
  static_url: boolean;
  url: string;
  summary: null;
  product_categories: ProductCategory[] | null;
  images: Image[] | null;
  created_at: Date;
  updated_at: Date;
}

export interface Image {
  id: number;
  name: string;
  alt: string;
  width: number;
  height: number;
  width_ratio: number;
  height_ratio: number;
  url: string;
  thumb: string;
  order: number;
  created_at: Date;
  updated_at: Date;
}

export interface ProductCategory {
  id: number;
  name: string;
  enabled: boolean;
  static_url: boolean;
  url: string;
  description: string;
  products_count: number;
  products: null;
  created_at: Date;
  updated_at: Date;
}
