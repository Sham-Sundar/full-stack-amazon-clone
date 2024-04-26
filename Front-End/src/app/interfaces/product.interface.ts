export interface Product {
    id?: number;
    image: string;
    title: string;
    brand: string;
    price: number;
    discountedPrice: number;
    quantity?: number;
    category?: string;
}