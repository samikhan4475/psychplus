import React, {
  createContext,
  useCallback,
  useContext,
  useMemo,
  useState,
} from 'react'
import toast from 'react-hot-toast'
import { getClinicsOptionsAction } from '@/actions'
import { CODESETS } from '@/constants'
import { useCodesetCodes } from '@/hooks'
import { SelectOptionType, StaffResource } from '@/types'
import { getStaffActions } from './claim-detail-tab/actions/get-service-staff'

interface RevCycleContextType {
  staffData?: SelectOptionType[]
  error?: string
  loading?: boolean
  locationsData?: SelectOptionType[]
  posCodesData?: SelectOptionType[]
  fetchClaimOptionsData: () => void
  selectedStaffData?: StaffResource[]
}

const RevCycleContext = createContext<RevCycleContextType | undefined>(
  undefined,
)

interface RevCycleProviderProps {
  children: React.ReactNode
}

export const RevCycleProvider = ({ children }: RevCycleProviderProps) => {
  const codes = useCodesetCodes(CODESETS.PlaceOfSerivce) ?? []
  const posCodes = useMemo(
    () => codes.map(({ display, value }) => ({ label: display, value })),
    [codes],
  )

  const [staffData, setStaffData] = useState<SelectOptionType[]>([])
  const [locationsData, setLocationsData] = useState<SelectOptionType[]>([])
  const [posCodesData, setPOSCodesData] = useState<SelectOptionType[]>([])
  const [selectedStaffData, setSelectedStaffData] = useState<StaffResource[]>()
  const [loading, setLoading] = useState<boolean>(false)

  const fetchClaimOptionsData = useCallback(async () => {
    setLoading(true)
    const [locationsResult, selectedStaffResult] = await Promise.all([
      getClinicsOptionsAction(),
      getStaffActions(),
    ])
    if (locationsResult.state === 'success') {
      setLocationsData(locationsResult.data)
    } else {
      toast.error(locationsResult.error ?? 'Error fetching locations data')
    }

    if (selectedStaffResult.state === 'success') {
      const staffData = selectedStaffResult.data ?? []
      setSelectedStaffData(staffData)
      const transformedData = staffData.map((data) => ({
        value: data.id.toString(),
        label: data.legalName.firstName,
      }))
      setStaffData(transformedData)
    } else {
      toast.error(
        selectedStaffResult.error ?? 'Error fetching selected staff data',
      )
    }

    setPOSCodesData(posCodes)
  }, [])

  const value = useMemo(
    () => ({
      staffData,
      locationsData,
      posCodesData,
      selectedStaffData,
      loading,
      fetchClaimOptionsData,
    }),
    [
      staffData,
      locationsData,
      posCodesData,
      selectedStaffData,
      loading,
      fetchClaimOptionsData,
    ],
  )
  return (
    <RevCycleContext.Provider value={value}>
      {children}
    </RevCycleContext.Provider>
  )
}

export const useRevCycleDataProvider = (): RevCycleContextType => {
  const context = useContext(RevCycleContext)
  if (!context) {
    throw new Error('Error while using Revcycle context.')
  }
  return context
}
