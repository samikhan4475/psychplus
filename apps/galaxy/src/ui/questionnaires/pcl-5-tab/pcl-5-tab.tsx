'use client'

import { useEffect, useState } from 'react'
import { ScrollArea } from '@radix-ui/themes'
import { TabContentHeading, ViewLoadingPlaceholder } from '@/components'
import { PCL_5_TAB } from '../constants'

const TAB_TITLE = PCL_5_TAB

const wait = async () => {
  await new Promise((resolve) => setTimeout(resolve, 2000))
  return 'hello'
}

const Pcl5Tab = () => {
  const [result, setResult] = useState<string>()

  useEffect(() => {
    wait().then(setResult)
  }, [])

  if (!result) {
    return <ViewLoadingPlaceholder title={TAB_TITLE} />
  }

  return (
    <>
      <TabContentHeading title={TAB_TITLE} />
      <ScrollArea></ScrollArea>
    </>
  )
}

export { Pcl5Tab }
