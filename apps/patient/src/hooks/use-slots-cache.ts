'use client'

import { useMemo, useState } from 'react'
import type { AppointmentType, ProviderType } from '@psychplus-v2/constants'
import { getSlotsCacheKey } from '@psychplus-v2/utils'
import type { SlotsByDay } from '@/features/appointments/search/types'

interface SlotCacheParams {
  startingDate: string
  appointmentType: AppointmentType | string
  providerType: ProviderType | string
  clinicId: string
  providerId: number
  zipCode: string
}

interface UseSlotCacheResult {
  cacheKey: string | null
  slotState: {
    current: SlotsByDay
    cache: Record<string, SlotsByDay>
  }
  setSlotState: React.Dispatch<
    React.SetStateAction<{
      current: SlotsByDay
      cache: Record<string, SlotsByDay>
    }>
  >
  getCachedSlots: () => SlotsByDay | null
  setCachedSlots: (slotsByDay: SlotsByDay) => void
}

const useSlotCache = (params: SlotCacheParams): UseSlotCacheResult => {
  const [slotState, setSlotState] = useState<{
    current: SlotsByDay
    cache: Record<string, SlotsByDay>
  }>({
    current: {},
    cache: {},
  })

  const cacheKey = useMemo(() => {
    return getSlotsCacheKey(params)
  }, [
    params.startingDate,
    params.appointmentType,
    params.providerType,
    params.clinicId,
    params.providerId,
    params.zipCode,
  ])

  const getCachedSlots = () => {
    if (!cacheKey) return null
    return slotState.cache[cacheKey] ?? null
  }

  const setCachedSlots = (slotsByDay: SlotsByDay) => {
    if (!cacheKey) return
    setSlotState((prev) => ({
      current: slotsByDay,
      cache: {
        ...prev.cache,
        [cacheKey]: slotsByDay,
      },
    }))
  }

  return {
    cacheKey,
    slotState,
    setSlotState,
    getCachedSlots,
    setCachedSlots,
  }
}

export { useSlotCache }
