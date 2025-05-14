'use client'

import React, { useEffect, useState } from 'react'
import { useParams } from 'next/navigation'
import { Flex } from '@radix-ui/themes'
import { LoadingPlaceholder } from '@/components'
import { PreferredPartnerProfileForm } from './preferred-partner-profile-form'

const PreferredPartnerProfileView = () => {
  const [loading, setLoading] = useState(true)
  const { id } = useParams()

  useEffect(() => {
    setLoading(false)
    if (id && typeof id === 'string') {
      // will be implemented here
    }
  }, [])
  return (
    <Flex
      gap="1"
      className="bg-pp-bg-accent flex-1 !overflow-hidden"
      direction="column"
    >
      {loading ? (
        <Flex
          height="45vh"
          className="bg-white"
          align="center"
          justify="center"
        >
          <LoadingPlaceholder />
        </Flex>
      ) : (
        <PreferredPartnerProfileForm />
      )}
    </Flex>
  )
}

export { PreferredPartnerProfileView }
