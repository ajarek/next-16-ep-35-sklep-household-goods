export interface Product {
    id: string;
    title: string;
    price: number;
    image: string;
    category: string;
    description: string;
    quantity: number;
    details: string;
    tag?: "featured" | "new" | null;
}
