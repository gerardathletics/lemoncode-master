import type { PictureViewModel } from '../../types/picture.types';

interface ImageCardProps {
    picture: PictureViewModel;
    onCheckboxChange: (id: string) => void;
}

function ImageCard({ picture, onCheckboxChange }: ImageCardProps) {
    return (
        <div className="bg-white rounded-lg shadow-md overflow-hidden hover:shadow-lg transition">
            {/* Imagen */}
            <img src={picture.picUrl} alt={picture.title} className="w-full h-64 object-cover" />

            {/* Info */}
            <div className="p-4">
                <h3 className="font-bold text-lg mb-2">{picture.title}</h3>

                {/* Checkbox */}
                <label className="flex items-center gap-2 cursor-pointer">
                    <input
                        type="checkbox"
                        checked={picture.selected}
                        onChange={() => onCheckboxChange(picture.id)}
                        className="w-5 h-5 text-purple-500 rounded focus:ring-2 focus:ring-purple-400"
                    />
                    <span className="text-gray-700">{picture.selected ? 'Added to cart' : 'Add to cart'}</span>
                </label>
            </div>
        </div>
    );
}

export default ImageCard;
