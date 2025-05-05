export type CartModel = {
    id: string;
    userId: string;
    productId: string;
    quantity: number;
    totalPrice: number
    createdAt: Date;
    updatedAt: Date;
};