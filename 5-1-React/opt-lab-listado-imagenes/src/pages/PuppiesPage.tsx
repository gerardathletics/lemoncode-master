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
            <div className="mb-8 pb-6 border-b-2 border-gradient-to-r from-secondary/20 via-primary/20 to-accent/20">
                <h2 className="text-4xl font-extrabold bg-gradient-to-r from-secondary-dark via-secondary to-primary bg-clip-text text-transparent flex items-center gap-3">
                    <span className="text-5xl">🐶</span>
                    <span>Perritos</span>
                </h2>
                <p className="text-neutral-dark mt-2 ml-16">Descubre nuestra encantadora colección de perritos</p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                {pictures.map((picture) => (
                    <ImageCard key={picture.id} picture={picture} onCheckboxChange={handleCheckboxChange} />
                ))}
            </div>
        </div>
    );
}

export default PuppiesPage;
