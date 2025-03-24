'use client'

import { Flex, ScrollArea, Text } from '@radix-ui/themes'
import { CirclePlusIcon } from 'lucide-react'
import { useFormContext } from 'react-hook-form'
import { LoadingPlaceholder } from '@/components'
import { Encounter } from '@/types'
import { cn } from '@/utils'
import { useStore } from '../../store'
import { constructVisitId } from '../../utils'
import { ServiceSchemaType } from './schema'

const VisitTypeList = () => {
  const { visitTypes, loading } = useStore((state) => ({
    visitTypes: state.visitTypes,
    loading: state.visitTypesLoading,
  }))
  const form = useFormContext<ServiceSchemaType>()
  const selectedVisits = form.watch('serviceVisitTypes') ?? []

  const handleToggleVisit = (visit: Encounter) => {
    let visits = [...selectedVisits]
    const visitId = constructVisitId(visit)
    if (selectedVisits.includes(visitId)) {
      visits = visits.filter((item) => item !== visitId)
    } else {
      visits.unshift(visitId)
    }
    form.setValue('serviceVisitTypes', visits, { shouldValidate: true })
  }
  if (loading) {
    return <LoadingPlaceholder className="min-h-32" />
  }

  if (!visitTypes?.length) {
    return (
      <Flex className="h-12" align="center" justify="center">
        <Text className="text-1 font-medium leading-4">
          No visit types available.
        </Text>
      </Flex>
    )
  }

  return (
    <ScrollArea className="max-h-32 p-2" scrollbars="vertical">
      <Flex direction="column" gap="2px">
        {visitTypes?.map((item) => (
          <Flex
            key={item?.id}
            align="center"
            justify="between"
            gap="1"
            className={cn(
              'bg-white hover:bg-pp-bg-accent cursor-pointer rounded-1 px-3',
              {
                'cursor-not-allowed opacity-40': selectedVisits.includes(
                  constructVisitId(item),
                ),
              },
            )}
            onClick={() => handleToggleVisit(item)}
          >
            <Text className="truncate text-1 font-medium leading-4">
              {`${item?.typeOfVisit} - ${item?.visitSequence} - ${item?.visitMedium}`}
            </Text>
            <CirclePlusIcon size={14} />
          </Flex>
        ))}
      </Flex>
    </ScrollArea>
  )
}

export { VisitTypeList }
