export interface PictureInfo {
    id: string;
    picUrl: string;
    title: string;
}

export interface PictureViewModel extends PictureInfo {
    selected: boolean;
}

export interface CartContextType {
    cartItems: string[];
    addToCart: (id: string) => void;
    removeFromCart: (id: string) => void;
    isInCart: (id: string) => boolean;
    clearCart: () => void;
}
