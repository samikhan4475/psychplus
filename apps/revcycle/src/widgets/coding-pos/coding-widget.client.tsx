'use client'

import { useEffect, useRef, useState } from 'react'
import { Flex } from '@radix-ui/themes'
import { POSTable } from './components/pos-table'
import { Preloader } from './preloader'
import { useStore } from './store'
import { MetaDataCodeSet } from './types'
import { getCodeValueByKey } from './utils'

interface CodingCPTClientProps {
  posCodeSets?: MetaDataCodeSet[]
}

const CodingPOSWidgetClient = ({ posCodeSets }: CodingCPTClientProps) => {
  const { setCodingPosCodeSets } = useStore((state) => ({
    setCodingPosCodeSets: state.setCodingPosCodeSets,
  }))
  const [isLoading, setIsLoading] = useState(true)
  const ref = useRef<HTMLDivElement>(null)

  useEffect(() => {
    ;(async () => {
      const PlaceOfService: MetaDataCodeSet[] = posCodeSets ?? []

      const compiled = []

      for (let index = 0; index < PlaceOfService.length; index++) {
        const element = PlaceOfService[index]
        const attributes = element.attributes ? element.attributes : []
        element.code = getCodeValueByKey('SubmissionCode', attributes)
        element.display = getCodeValueByKey('FullDescription', attributes)
        compiled.push(element)
      }

      setCodingPosCodeSets(compiled)
      setIsLoading(false)
    })()
  }, [])

  return (
    <>
      {isLoading ? (
        <Preloader isLoadingOn={isLoading} />
      ) : (
        <Flex direction="column" className="h-fit p-2" ref={ref}>
          <POSTable />
        </Flex>
      )}
    </>
  )
}

export { CodingPOSWidgetClient }
