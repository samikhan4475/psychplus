import { useEffect, useState } from 'react'
import { Box } from '@radix-ui/themes'
import toast from 'react-hot-toast'
import { State } from '@/types'
import { getUsStatesAction } from '../../client-actions'
import { LocationSelect } from './location-select'
import { StateSelect } from './state-select'

const StateAndLocationFilters = () => {
  const [states, setStates] = useState<State[]>([])
  const [isLoading, setIsLoading] = useState<boolean>(false)

  useEffect(() => {
    setIsLoading(true)
    getUsStatesAction().then((response) => {
      setIsLoading(false)
      if (response.state === 'error') {
        toast.error(response.error || 'Failed to fetch US States')
        setStates([])
      } else {
        setStates(response.data)
      }
    })
  }, [])

  return (
    <>
      <Box className="col-span-4">
        <StateSelect states={states} loadingStates={isLoading} />
      </Box>
      <Box className="col-span-4">
        <LocationSelect states={states} />
      </Box>
    </>
  )
}

export { StateAndLocationFilters }
