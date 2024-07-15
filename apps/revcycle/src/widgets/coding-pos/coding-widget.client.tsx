'use client'

import { useEffect, useRef, useState } from 'react'
import { Flex } from '@radix-ui/themes'
import { getCodeSets } from '@psychplus/codeset/api.client'
import { CodeSet, MetaDataCodeSet } from '@psychplus/codeset/types'
import { POSTable } from './components/pos-table'
import { Preloader } from './preloader'
import { useStore } from './store'
import { getCodeValueByKey } from './utils'

const CodingPOSWidgetClient = () => {
  const { setMetaDataCodeSets } = useStore((state) => ({
    setMetaDataCodeSets: state.setMetaDataCodeSets,
  }))
  const [isLoading, setIsLoading] = useState(true)
  const ref = useRef<HTMLDivElement>(null)

  useEffect(() => {
    ;(async () => {
      const [codeSets] = await Promise.all([getCodeSets()])

      const codeSetObj: CodeSet = codeSets.find((element) => {
        return element.code === 'PlaceOfService'
      }) as CodeSet

      const PlaceOfService: MetaDataCodeSet[] = codeSetObj.codes

      const compiled = []

      for (let index = 0; index < PlaceOfService.length; index++) {
        const element = PlaceOfService[index]
        element.code = getCodeValueByKey('ResourceId', element.attributes)
        element.display = getCodeValueByKey(
          'ResourceFullDescription',
          element.attributes,
        )
        compiled.push(element)
      }

      setMetaDataCodeSets(compiled)
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
