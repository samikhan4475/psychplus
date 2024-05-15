interface PastMedication {
  id: string
  name: string
  epn: string
  directions: string
  supply: number
  refills: number
  ends: string
  provider: string
  pharmacy: string
  address: string
  comments: string | null
}

export type { PastMedication }
