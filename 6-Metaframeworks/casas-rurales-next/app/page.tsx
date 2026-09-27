import Image from 'next/image'
import Link from 'next/link'

import type { House } from '@/types/house'

export const revalidate = 3600

export default async function Home() {
  const response = await fetch('http://localhost:3001/api/houses')

  if (!response.ok) {
    throw new Error('No se pudieron cargar las casas')
  }

  const houses = (await response.json()) as House[]

  return (
    <main className="px-6 py-12 min-h-screen bg-amber-50 text-emerald-950">
      <div className="mx-auto max-w-6xl">
        <header className="p-8 text-white rounded-2xl bg-emerald-950">
          <p className="text-sm font-semibold text-orange-300 uppercase">
            Escapadas con encanto
          </p>

          <h1 className="mt-2 text-4xl font-bold">Casas rurales</h1>

          <p className="mt-3 text-emerald-100">
            Naturaleza, tranquilidad y alojamientos únicos para desconectar.
          </p>
        </header>

        <ul className="grid gap-6 mt-8 sm:grid-cols-2 lg:grid-cols-3">
          {houses.map((house) => (
            <li key={house.id}>
              <Link
                href={`/houses/${house.id}`}
                className="block overflow-hidden bg-white rounded-2xl border border-stone-200 focus-visible:outline-2 focus-visible:outline-offset-4"
              >
                <div className="relative aspect-[4/3]">
                  <Image
                    src={`http://localhost:3001${house.image}`}
                    alt={house.name}
                    fill
                    sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 33vw"
                    className="object-cover"
                  />
                </div>

                <div className="p-5">
                  <p className="text-sm font-semibold text-orange-700">
                    {house.city}, {house.country}
                  </p>

                  <h2 className="mt-1 text-xl font-semibold">{house.name}</h2>

                  <p className="mt-3 text-sm text-stone-600">
                    {house.bedrooms} habitaciones · {house.bathrooms} baños
                  </p>

                  <p className="mt-4 font-semibold">
                    {house.price} €{' '}
                    <span className="font-normal text-stone-500">/ noche</span>
                  </p>
                </div>
              </Link>
            </li>
          ))}
        </ul>
      </div>
    </main>
  )
}
