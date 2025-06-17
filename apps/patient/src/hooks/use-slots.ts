'use client'

import { useEffect, useMemo, useRef, useState } from 'react'
import { getLocalTimeZone } from '@internationalized/date'
import {
  AppointmentType,
  DEFAULT_SLOTS_FUTURE_OUTLOOK,
  ProviderType,
} from '@psychplus-v2/constants'
import { AppointmentSlot, SlotsByDay } from '@psychplus-v2/types'
import {
  getCalendarDate,
  getServiceOfferedByProviderType,
  transformStaffAvailabilityResponse,
} from '@psychplus-v2/utils'
import { searchStaffSchedulesClientAction } from '@/features/appointments/search/client-actions'
import {
  generateDateRange,
  isDateInNextRange,
} from '@/features/appointments/search/utils'
import { useSlotCache } from '@/hooks'

interface UseSlotsParams {
  providerId: number
  clinicId: string
  appointmentType: AppointmentType
  providerType: ProviderType
  zipCode: string
  startingDate: string
  onError?: (msg: string) => void
  onClinicChange?: (idx: number) => void
  setSlotsLoading?: (bool: boolean) => void
  selectedClinic?: number
  transformFn: (slots: AppointmentSlot[]) => SlotsByDay
  rawStartingDate?: string
  inViewOnce?: boolean
}

const useSlots = ({
  providerId,
  clinicId,
  appointmentType,
  providerType,
  zipCode,
  startingDate,
  selectedClinic,
  setSlotsLoading,
  transformFn,
  rawStartingDate,
  inViewOnce,
}: UseSlotsParams) => {
  const [showSlots, setShowSlots] = useState(false)
  const controllerRef = useRef<AbortController | null>(null)
  const [hasFetchedOnce, setHasFetchedOnce] = useState(false)
  const [errorMessage, setErrorMessage] = useState<string | null>(null)
  const { slotState, setSlotState, setCachedSlots } = useSlotCache({
    startingDate,
    appointmentType,
    providerType,
    clinicId,
    providerId,
    zipCode,
  })

  const nextAvailableSlotDate = Object.keys(slotState.current)[0]

  const dateRange = useMemo(() => {
    return generateDateRange(getCalendarDate(startingDate))
  }, [startingDate, rawStartingDate])

  const dateIsInFuture = useMemo(() => {
    if (!startingDate || !nextAvailableSlotDate) return false
    return isDateInNextRange(
      getCalendarDate(rawStartingDate ?? startingDate),
      getCalendarDate(nextAvailableSlotDate),
    )
  }, [startingDate, nextAvailableSlotDate, rawStartingDate])

  const fetchSlots = async () => {
    setSlotsLoading?.(true)
    setErrorMessage(null)

    if (controllerRef.current) {
      controllerRef.current.abort()
    }

    const controller = new AbortController()
    controllerRef.current = controller
    searchStaffSchedulesClientAction(
      {
        appointmentType,
        serviceOffered: getServiceOfferedByProviderType(providerType),
        startDate: startingDate,
        maxLookoutDays: 7,
        staffId: providerId,
        locationId: clinicId,
        maxRepeatOnNoneAvailable: DEFAULT_SLOTS_FUTURE_OUTLOOK,
      },
      controller.signal,
    )
      .then((result) => {
        // if (controller?.signal) return
        if (result.state === 'error') {
          setErrorMessage(result?.error)
          setHasFetchedOnce(false)
          return
        }
        const transformed = transformStaffAvailabilityResponse({
          response: result.data,
          clinicId,
          timeZone: getLocalTimeZone(),
        })

        const slotsByDay = transformFn(transformed)

        setSlotState((prev) => ({ ...prev, current: slotsByDay }))
        setCachedSlots(slotsByDay)
        setHasFetchedOnce(true)
      })
      .catch((err) => {
        if (err?.name !== 'AbortError') {
          setErrorMessage('Something went wrong')
        }
      })
      .finally(() => {
        if (!controller?.signal?.aborted) {
          setSlotsLoading?.(false)
          setShowSlots(true)
        }
      })
  }

  useEffect(() => {
    setHasFetchedOnce(false)
    setShowSlots(false)
  }, [selectedClinic, startingDate])

  useEffect(() => {
    if (inViewOnce && !hasFetchedOnce) {
      fetchSlots()
      setHasFetchedOnce(true)
    }
  }, [inViewOnce, hasFetchedOnce])

  useEffect(() => {
    return () => {
      if (controllerRef.current) {
        controllerRef.current.abort()
      }
    }
  }, [])

  return {
    showSlots,
    slotState,
    dateRange,
    dateIsInFuture,
    nextAvailableSlotDate,
    fetchSlots,
    errorMessage,
  }
}
export { useSlots }
