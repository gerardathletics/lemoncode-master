import { createFileRoute } from '@tanstack/react-router'
import { createServerFn } from '@tanstack/react-start'
import type { House } from '../types/house'

const getHouses = createServerFn({ method: 'GET' }).handler(
  async (): Promise<House[]> => {
    const response = await fetch('http://localhost:3001/api/houses')

    if (!response.ok) {
      throw new Error('No se pudieron cargar las casas')
    }

    return response.json()
  },
)

export const Route = createFileRoute('/')({
  loader: () => getHouses(),
  component: Home,
})

function Home() {
  const houses = Route.useLoaderData()

  return (
    <main className="px-6 py-10 mx-auto max-w-6xl">
      <h1 className="text-4xl font-bold">Casas rurales</h1>
      <p className="mt-2 text-gray-600">
        {houses.length} alojamientos disponibles
      </p>

      <ul className="grid gap-6 mt-8 sm:grid-cols-2 lg:grid-cols-3">
        {houses.map((house) => (
          <li
            key={house.id}
            className="overflow-hidden bg-white rounded-xl border border-gray-200 shadow-sm"
          >
            <img
              src={`http://localhost:3001${house.image}`}
              alt={house.name}
              className="object-cover w-full h-52"
            />

            <div className="p-5">
              <h2 className="text-xl font-semibold">{house.name}</h2>

              <p className="mt-1 text-gray-600">
                {house.city}, {house.country}
              </p>

              <p className="mt-4 text-sm text-gray-600">
                {house.bedrooms} habitaciones · {house.bathrooms} baños
              </p>

              <p className="mt-4 text-lg font-bold">
                {house.price} € <span className="text-sm font-normal">/ noche</span>
              </p>
            </div>
          </li>
        ))}
      </ul>
    </main>
  )
}