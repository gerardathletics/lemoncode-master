import Image from 'next/image'
import Link from 'next/link'
import { notFound } from 'next/navigation'
import type { House } from '@/types/house'
import { ReserveButton } from './reserve-button'

type HouseDetailPageProps = {
  params: Promise<{
    houseId: string
  }>
}

export default async function HouseDetailPage({
  params,
}: HouseDetailPageProps) {
  const { houseId } = await params

  const response = await fetch(`http://localhost:3001/api/houses/${houseId}`, {
    cache: 'no-store',
  })

  if (response.status === 404) {
    notFound()
  }

  if (!response.ok) {
    throw new Error('No se pudo cargar la casa')
  }

  const responseBody = await response.text()

  if (!responseBody.trim()) {
    notFound()
  }

  const house = JSON.parse(responseBody) as House

  return (
    <main className="px-6 py-12 min-h-screen bg-amber-50 text-emerald-950">
      <div className="mx-auto max-w-5xl">
        <Link
          href="/"
          className="font-semibold text-orange-700 hover:underline"
        >
          ← Volver al listado
        </Link>

        <article className="overflow-hidden mt-6 bg-white rounded-2xl border border-stone-200">
          <div className="relative aspect-video">
            <Image
              src={`http://localhost:3001${house.image}`}
              alt={house.name}
              fill
              sizes="(max-width: 1024px) 100vw, 1024px"
              className="object-cover"
            />
          </div>

          <div className="p-6 sm:p-8">
            <p className="font-semibold text-orange-700">
              {house.city}, {house.country}
            </p>

            <h1 className="mt-2 text-4xl font-bold">{house.name}</h1>

            <p className="mt-4 text-stone-600">{house.description}</p>

            <dl className="grid gap-4 py-6 mt-8 border-y border-stone-200 sm:grid-cols-4">
              <div>
                <dt className="text-sm text-stone-500">Habitaciones</dt>
                <dd className="text-xl font-semibold">{house.bedrooms}</dd>
              </div>

              <div>
                <dt className="text-sm text-stone-500">Camas</dt>
                <dd className="text-xl font-semibold">{house.beds}</dd>
              </div>

              <div>
                <dt className="text-sm text-stone-500">Baños</dt>
                <dd className="text-xl font-semibold">{house.bathrooms}</dd>
              </div>

              <div>
                <dt className="text-sm text-stone-500">Precio por noche</dt>
                <dd className="text-xl font-semibold">{house.price} €</dd>
              </div>
            </dl>

            <section className="mt-8">
              <h2 className="text-2xl font-semibold">Servicios</h2>

              <ul className="flex flex-wrap gap-2 mt-4">
                {house.amenities.map((amenity) => (
                  <li
                    key={amenity}
                    className="px-4 py-2 text-sm bg-emerald-50 rounded-full"
                  >
                    {amenity}
                  </li>
                ))}
              </ul>
            </section>
            <div className="mt-8">
              <ReserveButton />
            </div>
          </div>
        </article>
      </div>
    </main>
  )
}
