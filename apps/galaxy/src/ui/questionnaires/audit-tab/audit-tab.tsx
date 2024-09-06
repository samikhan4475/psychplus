'use client'

import { useEffect, useState } from 'react'
import { ScrollArea } from '@radix-ui/themes'
import { TabContentHeading, ViewLoadingPlaceholder } from '@/components'
import { AUDIT_TAB } from '../constants'

const TAB_TITLE = AUDIT_TAB

const wait = async () => {
  await new Promise((resolve) => setTimeout(resolve, 2000))
  return 'hello'
}

const AuditTab = () => {
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

export { AuditTab }
