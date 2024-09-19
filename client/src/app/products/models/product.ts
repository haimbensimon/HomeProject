export interface Product {
  id?: number;
  desc: string;
  price: number;
  categoryId: number;
}
export interface ProductDto {
  id: number;
  desc: string;
  price: number;
  categoryId: number;
  categoryDesc: string;
}
