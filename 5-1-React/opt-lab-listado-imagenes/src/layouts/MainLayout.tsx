import { Link, Outlet } from 'react-router-dom';
import Cart from '../components/cart/Cart.tsx';

function MainLayout() {
    return (
        <div className="min-h-screen relative">
            <div
                className="fixed inset-0 -z-10"
                style={{
                    backgroundImage: 'url(/image-mesh-gradient-lab.png)',
                    backgroundSize: 'cover',
                    backgroundPosition: 'center',
                    backgroundRepeat: 'no-repeat',
                }}
            >
                <div className="absolute inset-0 bg-white/40 backdrop-blur-[2px]" />
            </div>
            {/* Header con navegación */}
            <header className="bg-white shadow-sm border-b-2 border-neutral-light/50">
                <div className="max-w-7xl mx-auto px-6 py-4">
                    <div className="flex items-center justify-between">
                        <h1 className="text-2xl font-bold text-gray-800">
                            Galeria de Gatitos y Perritos
                        </h1>

                        {/* Navegación */}
                        <nav className="flex gap-8">
                            <Link
                                to="/gatitos"
                                className="group flex items-center gap-2 px-4 py-2 text-gray-700 hover:text-accent-dark font-medium transition-colors duration-200 relative"
                            >
                                <span className="text-2xl">🐱</span>
                                <span>Gatitos</span>
                                <span className="absolute bottom-0 left-0 w-full h-0.5 bg-accent scale-x-0 group-hover:scale-x-100 transition-transform duration-200 origin-left"></span>
                            </Link>
                            <Link
                                to="/perritos"
                                className="group flex items-center gap-2 px-4 py-2 text-gray-700 hover:text-secondary-dark font-medium transition-colors duration-200 relative"
                            >
                                <span className="text-2xl">🐶</span>
                                <span>Perritos</span>
                                <span className="absolute bottom-0 left-0 w-full h-0.5 bg-secondary scale-x-0 group-hover:scale-x-100 transition-transform duration-200 origin-left"></span>
                            </Link>
                        </nav>
                    </div>
                </div>
            </header>

            <div className="max-w-7xl mx-auto px-4 py-8">
                <div className="grid grid-cols-1 lg:grid-cols-4 gap-8">
                    <main className="lg:col-span-3">
                        <Outlet />
                    </main>
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
