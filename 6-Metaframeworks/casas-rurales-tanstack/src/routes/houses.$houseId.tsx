import { createFileRoute, notFound } from '@tanstack/react-router'
import { createServerFn } from '@tanstack/react-start'
import type { House } from '../types/house'

const getHouse = createServerFn({ method: 'GET' })
  // comprobamos que solo contiene numeros el id
  .validator((houseId: string) => {
    if (!/^\d+$/.test(houseId)) {
      throw notFound()
    }

    return houseId
  })
  .handler(async ({ data: houseId }): Promise<House> => {
    const response = await fetch(`http://localhost:3001/api/houses/${houseId}`)

    if (!response.ok) {
      throw new Error('No se pudo cargar la casa')
    }

    const body = await response.text()

    if (!body) {
      throw notFound()
    }

    return JSON.parse(body) as House
  })

export const Route = createFileRoute('/houses/$houseId')({
  loader: ({ params }) => getHouse({ data: params.houseId }),
  component: HouseDetail,
})

function HouseDetail() {
  const house = Route.useLoaderData()

  return (
    <main className="px-6 py-10 mx-auto max-w-4xl">
      <img
        src={`http://localhost:3001${house.image}`}
        alt={house.name}
        className="object-cover w-full h-96 rounded-xl"
      />

      <h1 className="mt-8 text-4xl font-bold">{house.name}</h1>

      <p className="mt-2 text-lg text-gray-600">
        {house.address}, {house.city}, {house.country}
      </p>

      <p className="mt-6 leading-7 text-gray-700">{house.description}</p>

      <dl className="grid grid-cols-3 gap-4 py-6 mt-8 border-gray-200 border-y">
        <div>
          <dt className="text-sm text-gray-500">Habitaciones</dt>
          <dd className="text-xl font-semibold">{house.bedrooms}</dd>
        </div>

        <div>
          <dt className="text-sm text-gray-500">Camas</dt>
          <dd className="text-xl font-semibold">{house.beds}</dd>
        </div>

        <div>
          <dt className="text-sm text-gray-500">Baños</dt>
          <dd className="text-xl font-semibold">{house.bathrooms}</dd>
        </div>
      </dl>

      <p className="mt-6 text-2xl font-bold">
        {house.price} € <span className="text-base font-normal">por noche</span>
      </p>
    </main>
  )
}
