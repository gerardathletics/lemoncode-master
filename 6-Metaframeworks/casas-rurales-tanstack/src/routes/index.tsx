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
    <main className="p-8">
      <h1 className="text-4xl font-bold">Casas rurales</h1>
      <p className="mt-4">{houses.length} casas disponibles</p>
    </main>
  )
}