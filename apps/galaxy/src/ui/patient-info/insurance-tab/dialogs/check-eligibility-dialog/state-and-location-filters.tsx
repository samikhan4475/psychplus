import { useEffect, useState } from 'react'
import toast from 'react-hot-toast'
import { State } from '@/types'
import { getUsStatesAction } from '@/ui/visit/client-actions'
import { LocationDropdown } from './location-select'
import { ResidingStateSelect } from './residing-state-select'

const StateAndLocationFilters = () => {
  const [states, setStates] = useState<State[]>([])
  const [isLoading, setIsLoading] = useState(true)

  useEffect(() => {
    ;(async () => {
      const result = await getUsStatesAction()
      setIsLoading(false)
      if (result.state === 'error') {
        toast.error(result.error || 'Failed to fetch US States')
        setStates([])
      } else {
        setStates(result.data)
      }
    })()
  }, [])

  return (
    <>
      <ResidingStateSelect states={states} loadingStates={isLoading} />
      <LocationDropdown states={states} />
    </>
  )
}

export { StateAndLocationFilters }
