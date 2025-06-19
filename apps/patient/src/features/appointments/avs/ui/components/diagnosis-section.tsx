import React, { useEffect, useState } from 'react'
import { useParams } from 'next/navigation'
import { Box, Flex } from '@radix-ui/themes'
import {
  EmptyFileIcon,
  FeatureEmpty,
  LoadingPlaceholder,
} from '@/components-v2'
import { getPatientDiagnosisAction } from '../../api'
import { TitleSection } from '../../common'
import { DiagnosisInfo } from '../../types'

const DiagnosisSection = () => {
  const [loading, setLoading] = useState(true)
  const [diagnosis, setDiagnosis] = useState<DiagnosisInfo[]>([])
  const { id } = useParams<{ id: string }>()

  useEffect(() => {
    const fetchData = async () => {
      const response = await getPatientDiagnosisAction(id)
      if (response.state === 'success') {
        setDiagnosis(response?.data ?? [])
      }
      setLoading(false)
    }

    fetchData()
  }, [id])

  const renderDiagnosis = () =>
    diagnosis?.length > 0 ? (
      <Flex direction={'column'} gap="2">
        {diagnosis?.[0]?.codesDescriptions?.map((item, index) => (
          <Box
            key={item?.code}
            className="border-pp-gray-2 bg-pp-gray-5 rounded-2 border border-solid p-2 text-1 !outline-none"
          >
            {`${index + 1}. ${item?.code ?? ''} ${item?.description ?? ''}`}
          </Box>
        ))}
      </Flex>
    ) : (
      <Box className="border-pp-gray-2 bg-pp-gray-5 rounded-2 border border-solid p-2 text-1 !outline-none">
        <FeatureEmpty
          description="No Diagnosis added yet"
          Icon={EmptyFileIcon}
        />
      </Box>
    )

  return (
    <Box>
      <TitleSection title="Diagnosis" />
      {loading ? <LoadingPlaceholder /> : renderDiagnosis()}
    </Box>
  )
}

export default DiagnosisSection
