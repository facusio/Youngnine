'use client';
import { createContext, useContext, useState, ReactNode } from 'react';

type Item = {
    id: string;
    name: string;
    price: number;
    quantity: number;
}

const CartContext = createContext<{
    items: Item[];
    add: (item: Item) => void;
    remove: (id: string) => void;
}>({items: [], add: () => {}, remove: () => {}});

export function CartProvider({ children }: { children: ReactNode }) {
    const [items, setItems] = useState<Item[]>([]);

    const add = (newItem: Item) => {
        setItems(prev => {
            const existingItem = prev.find(i => i.id === newItem.id);
            if (existingItem) {
                return prev.map(i =>
                    i.id === newItem.id ? {...i, quantity: i.quantity + newItem.quantity} : i
                );
            }
            return [...prev, newItem];
        });
    };

    const remove = (id: string) => {
        setItems(prev => prev.filter(i => i.id !== id));
    };

    return (
        <CartContext.Provider value={{ items, add, remove }}>
            {children}
        </CartContext.Provider>
    );
}

export const useCart = () => useContext(CartContext);