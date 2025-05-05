export interface ProductModel {
  id: string;
  name: string;
  description: string;
  price: number;
  stock: number;
  categoryId: string;
  imageUrl?: string;
  createdAt: Date;
  updatedAt: Date;
}
