import Link from 'next/link'

export default function HouseNotFound() {
  return (
    <main className="flex justify-center items-center px-6 min-h-screen bg-amber-50 text-emerald-950">
      <div className="text-center">
        <p className="font-semibold text-orange-700">Error 404</p>

        <h1 className="mt-2 text-4xl font-bold">Casa no encontrada</h1>

        <p className="mt-4 text-stone-600">
          La casa que buscas no existe o ya no está disponible.
        </p>

        <Link
          href="/"
          className="inline-block px-5 py-3 mt-6 font-semibold text-white rounded-lg bg-emerald-950"
        >
          Volver al listado
        </Link>
      </div>
    </main>
  )
}
