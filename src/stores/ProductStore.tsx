import { create } from "zustand";
type Product = {
  id: number;
  title: string;
  price: number;
};
type ProductStore = {
  products: Product[];
  addProduct: (product: Product) => void;
  removeProduct: (id: number) => void;
};

export const useProductStore = create<ProductStore>((set) => ({
  products: [],
  addProduct: (product) => {
    set((state) => ({
      products: [...state.products, product],
    }));
  },
  removeProduct: (id) => {
    set((state) => ({
      products: state.products.filter((product) => product.id !== id),
    }));
  },
}));