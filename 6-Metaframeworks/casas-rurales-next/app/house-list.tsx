'use client'

import Image from 'next/image'
import Link from 'next/link'
import { useState } from 'react'

import type { House } from '@/types/house'

type HouseListProps = {
  houses: House[]
}

function normalizeText(value: string) {
  return value
    .normalize('NFD')
    .replace(/\p{Diacritic}/gu, '')
    .toLocaleLowerCase('es')
}

export function HouseList({ houses }: HouseListProps) {
  const [search, setSearch] = useState('')

  const normalizedSearch = normalizeText(search.trim())

  const filteredHouses = houses.filter((house) =>
    normalizeText(`${house.name} ${house.city} ${house.country}`).includes(
      normalizedSearch,
    ),
  )

  return (
    <>
      <div className="mt-8">
        <label htmlFor="house-search" className="font-semibold">
          Buscar por nombre o ubicación
        </label>

        <input
          id="house-search"
          type="search"
          value={search}
          placeholder="Por ejemplo, Málaga"
          className="px-4 py-3 mt-2 w-full bg-white rounded-lg border border-stone-300"
          onChange={(event) => setSearch(event.target.value)}
        />

        <p className="mt-2 text-sm text-stone-600">
          {filteredHouses.length} alojamientos encontrados
        </p>
      </div>

      <ul className="grid gap-6 mt-8 sm:grid-cols-2 lg:grid-cols-3">
        {filteredHouses.map((house) => (
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

        {filteredHouses.length === 0 && (
          <li className="p-6 bg-white rounded-lg text-stone-600">
            No se encontraron casas para “{search}”.
          </li>
        )}
      </ul>
    </>
  )
}
