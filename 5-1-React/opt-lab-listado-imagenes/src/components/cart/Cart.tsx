import { useCart } from '../../context/CartContext';

function Cart() {
    const { cartItems, removeFromCart, clearCart } = useCart();

    return (
        <div className="bg-white rounded-2xl shadow-lg border-2 border-neutral-light/40 p-6">
            <div className="flex items-center justify-between mb-6">
                <h2 className="text-2xl font-bold text-gray-800 flex items-center gap-2">
                    <span className="text-3xl">🛒</span> Carrito
                </h2>
                <span className="bg-gray-800 text-white px-4 py-2 rounded-full text-sm font-bold shadow-md">
                    {cartItems.length}
                </span>
            </div>

            {/* Lista de imágenes */}
            {cartItems.length === 0 ? (
                <div className="text-center py-10 bg-gray-50 rounded-xl border-2 border-dashed border-gray-300">
                    <p className="text-gray-600 font-medium">El carrito está vacío</p>
                </div>
            ) : (
                <>
                    <ul className="space-y-3 mb-6 max-h-[500px] overflow-y-auto pr-2">
                        {cartItems.map((id) => (
                            <li
                                key={id}
                                className="group flex items-center justify-between bg-gray-50 hover:bg-gray-100 p-4 rounded-xl border border-gray-200 hover:border-accent transition-all duration-200 hover:shadow-sm"
                            >
                                <span className="text-sm font-semibold text-gray-800">{id}</span>
                                <button
                                    onClick={() => removeFromCart(id)}
                                    className="text-red-500 hover:text-white hover:bg-red-500 p-2 rounded-lg transition-all duration-200 hover:scale-110"
                                    aria-label={`Remove ${id}`}
                                >
                                    🗑️
                                </button>
                            </li>
                        ))}
                    </ul>

                    <button
                        onClick={clearCart}
                        className="w-full bg-gray-700 hover:bg-gray-800 text-white font-semibold py-3 px-4 rounded-xl transition-all duration-200 hover:shadow-md"
                    >
                        Vaciar carrito
                    </button>
                </>
            )}
        </div>
    );
}

export default Cart;
