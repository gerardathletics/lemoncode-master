import { useCart } from '../../context/CartContext';

function Cart() {
    const { cartItems, removeFromCart, clearCart } = useCart();

    return (
        <div className="bg-white rounded-lg shadow-lg p-6">
            <div className="flex items-center justify-between mb-6">
                <h2 className="text-2xl font-bold text-gray-800 flex items-center gap-2">🛒 Carrito</h2>
                <span className="bg-purple-500 text-white px-3 py-1 rounded-full text-sm font-bold">{cartItems.length}</span>
            </div>

            {/* Lista de imágenes */}
            {cartItems.length === 0 ? (
                <p className="text-gray-500 text-center py-8">El carrito está vacío</p>
            ) : (
                <>
                    <ul className="space-y-3 mb-6">
                        {cartItems.map((id) => (
                            <li key={id} className="flex items-center justify-between bg-gray-50 p-3 rounded-lg">
                                <span className="text-sm font-medium text-gray-700">{id}</span>
                                <button
                                    onClick={() => removeFromCart(id)}
                                    className="text-red-500 hover:text-red-700 hover:bg-red-50 p-2 rounded transition"
                                    aria-label={`Remove ${id}`}
                                >
                                    🗑️
                                </button>
                            </li>
                        ))}
                    </ul>

                    <button onClick={clearCart} className="w-full bg-gray-200 hover:bg-gray-300 text-gray-800 font-medium py-2 px-4 rounded transition">
                        Vaciar carrito
                    </button>
                </>
            )}
        </div>
    );
}

export default Cart;
