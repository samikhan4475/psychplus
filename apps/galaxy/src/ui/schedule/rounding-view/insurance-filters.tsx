import { useEffect, useState } from 'react'
import toast from 'react-hot-toast'
import { SelectOptionType } from '@/types'
import { getInsurancePlanOptionsAction } from '../client-actions'
import { PrimaryInsuranceDropdown } from './primary-insurance-select'
import { SecondaryInsuranceDropdown } from './secondary-insurance-select'

const InsuranceFilters = () => {
  const [options, setOptions] = useState<SelectOptionType[]>([])
  const [isLoading, setIsLoading] = useState<boolean>(false)

  useEffect(() => {
    setIsLoading(true)
    getInsurancePlanOptionsAction().then((response) => {
      setIsLoading(false)
      if (response.state === 'error') {
        toast.error(
          response.error ? response.error : 'Failed to fetch insurance options',
        )
        return setOptions([])
      }
      setOptions(response.data)
    })
  }, [])

  return (
    <>
      <PrimaryInsuranceDropdown options={options} loading={isLoading} />
      <SecondaryInsuranceDropdown options={options} loading={isLoading} />
    </>
  )
}

export { InsuranceFilters }
