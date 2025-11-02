import type { PictureViewModel } from '../../types/picture.types';

interface ImageCardProps {
    picture: PictureViewModel;
    onCheckboxChange: (id: string) => void;
}

function ImageCard({ picture, onCheckboxChange }: ImageCardProps) {
    return (
        <div className="group bg-gradient-to-br from-white to-primary-light/5 rounded-2xl shadow-lg overflow-hidden hover:shadow-2xl hover:shadow-primary/20 transition-all duration-300 hover:scale-[1.02] border-2 border-transparent hover:border-primary/30">
            {/* Imagen */}
            <div className="relative overflow-hidden">
                <img src={picture.picUrl} alt={picture.title} className="w-full h-48 object-cover group-hover:scale-110 transition-transform duration-500" />
                <div className="absolute inset-0 bg-gradient-to-t from-accent-dark/40 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
            </div>

            {/* Info */}
            <div className="p-5 bg-gradient-to-br from-white to-secondary-light/5">
                <h3 className="font-bold text-xl mb-4 text-neutral-dark group-hover:text-accent-dark transition-colors duration-300">{picture.title}</h3>

                {/* Checkbox */}
                <label className="flex items-center gap-3 cursor-pointer group/checkbox">
                    <input
                        type="checkbox"
                        checked={picture.selected}
                        onChange={() => onCheckboxChange(picture.id)}
                        className="w-6 h-6 text-accent-dark rounded-lg focus:ring-2 focus:ring-accent focus:ring-offset-2 cursor-pointer transition-transform hover:scale-110"
                    />
                    <span
                        className={`font-medium transition-all duration-300 ${
                            picture.selected ? 'text-accent-dark font-semibold' : 'text-neutral-dark group-hover/checkbox:text-accent'
                        }`}
                    >
                        {picture.selected ? 'Añadido al carrito' : 'Añadir al carrito'}
                    </span>
                </label>
            </div>
        </div>
    );
}

export default ImageCard;
