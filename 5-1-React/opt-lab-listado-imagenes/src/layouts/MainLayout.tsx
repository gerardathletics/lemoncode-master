import { Link, Outlet } from 'react-router-dom';
import Cart from '../components/cart/Cart.tsx';

function MainLayout() {
    return (
        <div className="min-h-screen bg-gray-50">
            {/* Header con navegación */}
            <header className="bg-white shadow">
                <div className="max-w-7xl mx-auto px-4 py-4">
                    <h1 className="text-3xl font-bold text-gray-900 mb-4">🖼️ Image Bank</h1>

                    {/* Navegación */}
                    <nav className="flex gap-4">
                        <Link to="/kitties" className="px-4 py-2 bg-purple-500 text-white rounded hover:bg-purple-600 transition">
                            🐱 Kitties
                        </Link>
                        <Link to="/puppies" className="px-4 py-2 bg-blue-500 text-white rounded hover:bg-blue-600 transition">
                            🐶 Puppies
                        </Link>
                    </nav>
                </div>
            </header>

            <div className="max-w-7xl mx-auto px-4 py-8">
                <div className="grid grid-cols-1 lg:grid-cols-4 gap-8">
                    {/* contenido (páginas) */}
                    <main className="lg:col-span-3">
                        <Outlet />
                    </main>

                    {/* Carrito sticky */}
                    <aside className="lg:col-span-1">
                        <div className="sticky top-8">
                            <Cart />
                        </div>
                    </aside>
                </div>
            </div>
        </div>
    );
}

export default MainLayout;
