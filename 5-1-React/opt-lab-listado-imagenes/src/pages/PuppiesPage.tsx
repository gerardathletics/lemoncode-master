import { useState, useEffect } from 'react';
import { useCart } from '../context/CartContext';
import { puppiesData } from '../data/mockData';
import ImageCard from '../components/shared/ImageCard';
import type { PictureViewModel } from '../types/picture.types';

function PuppiesPage() {
    const { cartItems, addToCart, removeFromCart } = useCart();

    const [pictures, setPictures] = useState<PictureViewModel[]>([]);

    useEffect(() => {
        const initialPictures: PictureViewModel[] = puppiesData.map((pic) => ({
            ...pic,
            selected: cartItems.includes(pic.id),
        }));
        setPictures(initialPictures);
    }, []);

    useEffect(() => {
        setPictures((prevPictures) =>
            prevPictures.map((pic) => ({
                ...pic,
                selected: cartItems.includes(pic.id),
            }))
        );
    }, [cartItems]);

    const handleCheckboxChange = (id: string) => {
        setPictures((prevPictures) => prevPictures.map((pic) => (pic.id === id ? { ...pic, selected: !pic.selected } : pic)));

        const picture = pictures.find((p) => p.id === id);
        if (picture?.selected) {
            removeFromCart(id);
        } else {
            addToCart(id);
        }
    };

    return (
        <div>
            <h2 className="text-2xl font-bold mb-6 text-gray-800">🐶 Perritos</h2>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-2 gap-6">
                {pictures.map((picture) => (
                    <ImageCard key={picture.id} picture={picture} onCheckboxChange={handleCheckboxChange} />
                ))}
            </div>
        </div>
    );
}

export default PuppiesPage;
