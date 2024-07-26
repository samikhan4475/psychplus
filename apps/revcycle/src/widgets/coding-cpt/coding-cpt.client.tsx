'use client'

import { useEffect } from 'react'
import { WidgetTable } from './components'
import { useStore } from './store'
import { MetaDataCodeSet } from './types'

interface CodingCPTClientProps {
  posCodeSets?: MetaDataCodeSet[]
  cptCategoryCodeSets?: MetaDataCodeSet[]
}

const CodingCPTClient = ({
  posCodeSets,
  cptCategoryCodeSets,
}: CodingCPTClientProps) => {
  const { setCodingPosCodeSets, setFeeScheduleCategoryCodeSets } = useStore(
    (state) => ({
      setCodingPosCodeSets: state.setCodingPosCodeSets,
      setFeeScheduleCategoryCodeSets: state.setFeeScheduleCategoryCodeSets,
    }),
  )

  useEffect(() => {
    initializeData()
  }, [])

  const initializeData = async () => {
    try {
      if (posCodeSets) {
        setCodingPosCodeSets(posCodeSets)
      }

      if (cptCategoryCodeSets) {
        setFeeScheduleCategoryCodeSets(cptCategoryCodeSets)
      }
    } catch (error) {
      console.error('Error fetching code sets:', error)
    }
  }

  return <WidgetTable />
}

export { CodingCPTClient }
