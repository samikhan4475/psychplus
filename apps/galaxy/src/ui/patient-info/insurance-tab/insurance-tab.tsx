'use client'

import { useEffect, useState } from 'react'
import { ScrollArea } from '@radix-ui/themes'
import { TabContentHeading, ViewLoadingPlaceholder } from '../shared'

const TAB_TITLE = 'Insurance'

const wait = async () => {
  await new Promise((resolve) => setTimeout(resolve, 2000))
  return 'hello'
}

const InsuranceTab = () => {
  const [result, setResult] = useState<string>()

  useEffect(() => {
    wait().then(setResult)
  }, [])

  if (!result) {
    return <ViewLoadingPlaceholder title={TAB_TITLE} />
  }

  // if (result.state === 'error') {
  //   return <div>{result.error}</div>
  // }

  return (
    <>
      <TabContentHeading title={TAB_TITLE} />
      <ScrollArea></ScrollArea>
    </>
  )
}

export { InsuranceTab }
