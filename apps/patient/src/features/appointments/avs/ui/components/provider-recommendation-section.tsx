import React, { useEffect, useState } from 'react'
import { useParams } from 'next/navigation'
import { Box } from '@radix-ui/themes'
import { LoadingPlaceholder } from '@/components-v2'
import { getPatientRecommendationAction } from '../../api'
import { TitleSection } from '../../common'
import { ProviderRecommendation } from '../../types'
import { providerRecommendationDefaultText } from './data'

const ProviderRecommendationSection = () => {
  const [loading, setLoading] = useState(true)
  const [providerRecommendation, setProviderRecommendation] = useState<
    ProviderRecommendation[]
  >([])
  const { id } = useParams<{ id: string }>()

  useEffect(() => {
    const fetchData = async () => {
      const response = await getPatientRecommendationAction(id)
      if (response.state === 'success') {
        setProviderRecommendation(response?.data ?? [])
      }
      setLoading(false)
    }

    fetchData()
  }, [])

  return (
    <Box>
      <TitleSection title="Providers Recommendation" />
      {loading ? (
        <LoadingPlaceholder />
      ) : (
        <Box className="border-pp-gray-2 bg-pp-gray-5 rounded-2 border border-solid p-2 text-1 !outline-none">
          {providerRecommendation?.[0]?.recommendation ??
            providerRecommendationDefaultText}
        </Box>
      )}
    </Box>
  )
}

export { ProviderRecommendationSection }
