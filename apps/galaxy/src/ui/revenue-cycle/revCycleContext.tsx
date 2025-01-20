import React, {
  createContext,
  useCallback,
  useContext,
  useMemo,
  useState,
} from 'react'
import toast from 'react-hot-toast'
import { getClinicsOptionsAction } from '@/actions'
import { getPOSCodesOptions } from '@/actions/get-poscodes'
import { getStaffOptionsAction } from '@/actions/get-staff'
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
  const [staffData, setStaffData] = useState<SelectOptionType[]>([])
  const [locationsData, setLocationsData] = useState<SelectOptionType[]>([])
  const [posCodesData, setPOSCodesData] = useState<SelectOptionType[]>([])
  const [selectedStaffData, setSelectedStaffData] = useState<StaffResource[]>()
  const [loading, setLoading] = useState<boolean>(false)

  const fetchClaimOptionsData = useCallback(async () => {
    setLoading(true)
    const [staffResult, locationsResult, posCodesResult, selectedStaffResult] =
      await Promise.all([
        getStaffOptionsAction(),
        getClinicsOptionsAction(),
        getPOSCodesOptions(),
        getStaffActions(),
      ])
    if (staffResult.state === 'success') {
      setStaffData(staffResult.data)
    } else {
      toast.error(staffResult.error ?? 'Error fetching staff data')
    }

    if (locationsResult.state === 'success') {
      setLocationsData(locationsResult.data)
    } else {
      toast.error(locationsResult.error ?? 'Error fetching locations data')
    }

    if (posCodesResult.state === 'success') {
      setPOSCodesData(posCodesResult.data)
    } else {
      toast.error(posCodesResult.error ?? 'Error fetching POS codes')
    }

    if (selectedStaffResult.state === 'success') {
      setSelectedStaffData(selectedStaffResult.data)
    } else {
      toast.error(
        selectedStaffResult.error ?? 'Error fetching selected staff data',
      )
    }
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
