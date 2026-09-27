'use client'

import { useState } from 'react'

export function ReserveButton() {
  const [reserved, setReserved] = useState(false)

  return (
    <button
      type="button"
      disabled={reserved}
      className="px-5 py-3 font-semibold text-white rounded-lg bg-emerald-950 disabled:bg-stone-400"
      onClick={() => setReserved(true)}
    >
      {reserved ? 'Solicitud enviada' : 'Reservar'}
    </button>
  )
}
