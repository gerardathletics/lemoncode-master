import { HouseList } from '@/app/house-list'

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

        <HouseList houses={houses} />
      </div>
    </main>
  )
}
