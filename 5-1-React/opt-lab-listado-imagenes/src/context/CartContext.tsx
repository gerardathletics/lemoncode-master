/* eslint-disable react-refresh/only-export-components */

import { createContext, useContext, useReducer, type ReactNode } from 'react';
import type { CartContextType } from '../types/picture.types';

// tipos de las acciones
type CartAction =
    | {
          type: 'ADD_TO_CART';
          payload: string;
      }
    | { type: 'REMOVE_FROM_CART'; payload: string }
    | { type: 'CLEAR_CART' };

type CartState = {
    cartItems: string[];
};

// estado inicial
const initialState: CartState = {
    cartItems: [],
};

// reducer
function cartReducer(state: CartState, action: CartAction): CartState {
    switch (action.type) {
        case 'ADD_TO_CART':
            // Evitamos duplicados
            if (state.cartItems.includes(action.payload)) {
                return state;
            }
            return {
                ...state,
                cartItems: [...state.cartItems, action.payload],
            };

        case 'REMOVE_FROM_CART':
            return {
                ...state,
                cartItems: state.cartItems.filter((id) => id !== action.payload),
            };

        case 'CLEAR_CART':
            return {
                ...state,
                cartItems: [],
            };

        default:
            return state;
    }
}

// contexto
const CartContext = createContext<CartContextType | undefined>(undefined);

// provider
interface CartProviderProps {
    children: ReactNode;
}

export function CartProvider({ children }: CartProviderProps) {
    const [state, dispatch] = useReducer(cartReducer, initialState);

    // Métodos del contexto
    const addToCart = (id: string) => {
        dispatch({ type: 'ADD_TO_CART', payload: id });
    };

    const removeFromCart = (id: string) => {
        dispatch({ type: 'REMOVE_FROM_CART', payload: id });
    };

    const isInCart = (id: string): boolean => {
        return state.cartItems.includes(id);
    };

    const clearCart = () => {
        dispatch({ type: 'CLEAR_CART' });
    };

    const value: CartContextType = {
        cartItems: state.cartItems,
        addToCart,
        removeFromCart,
        isInCart,
        clearCart,
    };

    return <CartContext.Provider value={value}>{children}</CartContext.Provider>;
}

// hook para usar el contexto
export function useCart() {
    const context = useContext(CartContext);

    if (context === undefined) {
        throw new Error('useCart must be used within a CartProvider');
    }

    return context;
}
