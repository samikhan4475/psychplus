import { useEffect, useState } from 'react'
import toast from 'react-hot-toast'
import { SelectOptionType } from '@/types'
import { getInsurancePlanOptionsAction } from '../../client-actions'
import { PrimaryInsuranceDropdown } from './primary-insurance-dropdown'
import { SecondaryInsuranceDropdown } from './secondary-insurance-dropdown'

const InsuranceFilters = () => {
  const [options, setOptions] = useState<SelectOptionType[]>([])
  const [isLoading, setIsLoading] = useState<boolean>(false)
  
  useEffect(() => {
    setIsLoading(true)
    getInsurancePlanOptionsAction().then((response) => {
      if (response.state === 'error') {
        toast.error(
          response.error ? response.error : 'Failed to fetch insurance options',
        )
        return setOptions([])
      }
      setIsLoading(false)
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
