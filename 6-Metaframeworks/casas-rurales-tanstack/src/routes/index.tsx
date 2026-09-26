import {
  Link,
  createFileRoute,
  stripSearchParams,
  useNavigate,
} from '@tanstack/react-router'
import { createServerFn } from '@tanstack/react-start'
import { Image } from '@unpic/react'
import type { House } from '../types/house'

type HouseSearch = {
  search: string
}

const defaultSearch: HouseSearch = {
  search: '',
}

function normalizeText(value: string) {
  return value
    .normalize('NFD')
    .replace(/\p{Diacritic}/gu, '')
    .toLocaleLowerCase('es')
}

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
  validateSearch: (search: Record<string, unknown>): HouseSearch => ({
    search:
      typeof search.search === 'string' ? search.search : defaultSearch.search,
  }),
  search: {
    middlewares: [stripSearchParams(defaultSearch)],
  },
  loader: () => getHouses(),
  component: Home,
})

function Home() {
  const houses = Route.useLoaderData()
  const { search } = Route.useSearch()
  const navigate = useNavigate({ from: Route.fullPath })

  const normalizedSearch = normalizeText(search.trim())

  const filteredHouses = houses.filter((house) =>
    normalizeText(
      `${house.name} ${house.address} ${house.city} ${house.country}`,
    ).includes(normalizedSearch),
  )

  return (
    <main className="px-6 py-10 mx-auto max-w-6xl">
      <h1 className="text-4xl font-bold">Casas rurales</h1>
      <p className="mt-2 text-gray-600">
        {filteredHouses.length} alojamientos disponibles
      </p>
      <div className="mt-6">
        <label htmlFor="house-search" className="block font-medium">
          Buscar por nombre o ubicación
        </label>

        <input
          id="house-search"
          type="search"
          value={search}
          placeholder="Por ejemplo, Málaga"
          className="px-4 py-3 mt-2 w-full rounded-lg border border-gray-300"
          onChange={(event) => {
            void navigate({
              search: { search: event.target.value },
              replace: true,
            })
          }}
        />
      </div>
      <ul className="grid gap-6 mt-8 sm:grid-cols-2 lg:grid-cols-3">
        {filteredHouses.map((house, index) => (
          <li
            key={house.id}
            className="overflow-hidden bg-white rounded-xl border border-gray-200 shadow-sm transition hover:-translate-y-1 hover:shadow-lg"
          >
            <Link
              to="/houses/$houseId"
              params={{ houseId: house.id }}
              className="block h-full"
            >
              <Image
                src={`http://localhost:3001${house.image}`}
                alt={house.name}
                layout="fullWidth"
                height={208}
                priority={index === 0}
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
                  {house.price} €{' '}
                  <span className="text-sm font-normal">/ noche</span>
                </p>
              </div>
            </Link>
          </li>
        ))}
        {filteredHouses.length === 0 && (
          <p className="p-6 mt-8 text-center text-gray-600 bg-gray-100 rounded-lg">
            No se encontraron casas para “{search}”.
          </p>
        )}
      </ul>
    </main>
  )
}
