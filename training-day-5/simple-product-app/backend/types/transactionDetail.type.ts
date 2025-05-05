export interface producItem {
    id: string;
    name: string;
    price: number;
    quantity: number;
}

export interface transactionDetailModel {
    id: string;
    transactionId: string;
    products: producItem[];
    createdAt: Date;
    updatedAt: Date;
}
