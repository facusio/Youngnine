export interface Product {
    id: string;
    name: string;
    price: number;
    sizes: string[];
    image_url: string;
    created_at: string;
    gender: 'Hombre' | 'Mujer' | 'Unisex';
  }