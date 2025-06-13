import { useEffect, useMemo, useState } from 'react'
import { useFieldArray, useFormContext } from 'react-hook-form'
import toast from 'react-hot-toast'
import { LoadingPlaceholder } from '@/components'
import { SelectOptionType } from '@/types'
import { getLocationServicesAction } from '../../clinic-time-tab/actions'
import * as MultiSelectPopover from './multiselect-popover'
import { SchemaType } from './schema'

interface Visit extends SelectOptionType {
  visitMedium: string
}

const AddVisitPopover = () => {
  const [loading, setLoading] = useState(false)
  const [visits, setVisits] = useState<Visit[]>([])
  const { append } = useFieldArray({
    name: 'visitTypes',
  })
  const { watch } = useFormContext<SchemaType>()
  const [location, serviceId, visitsAdded, visitMedium] = watch([
    'primaryLocation',
    'serviceId',
    'visitTypes',
    'visitMedium',
  ])
  const filteredVisits = useMemo(
    () => visits.filter((el) => el.visitMedium === visitMedium),
    [visitMedium, visits],
  )
  const visitsToDisplay = filteredVisits?.length ? filteredVisits : visits

  const isVisitAdded = (value: string) =>
    !!visitsAdded?.find((visit) => visit.serviceVisitTypeId === value)

  useEffect(() => {
    if (!serviceId || !location) return
    const fetchServiceVisits = async () => {
      setLoading(true)
      const response = await getLocationServicesAction([location], [serviceId])
      if (response.state === 'error') {
        toast.error(response.error)
        return
      }
      setVisits(
        response.data[0]?.serviceVisitTypes?.map((el) => ({
          value: el.id.toString(),
          label: `${el.typeOfVisit} - ${el.visitSequence} - ${el.visitMedium}`,
          visitMedium: el.visitMedium,
        })) ?? [],
      )
      setLoading(false)
    }
    fetchServiceVisits()
  }, [serviceId, location])

  return (
    <MultiSelectPopover.Root minWidth="600px">
      <MultiSelectPopover.Placeholder>
        Select Visits
      </MultiSelectPopover.Placeholder>
      <MultiSelectPopover.List>
        {loading ? (
          <LoadingPlaceholder />
        ) : (
          visitsToDisplay?.map((visit) => (
            <MultiSelectPopover.Item
              key={visit.value}
              onSelect={() =>
                isVisitAdded(visit.value)
                  ? null
                  : append({
                      serviceVisitTypeId: visit.value,
                      visitName: visit.label,
                    })
              }
              disabled={!!isVisitAdded(visit.value)}
              display={visit.label}
              showTooltip={false}
            />
          ))
        )}
      </MultiSelectPopover.List>
    </MultiSelectPopover.Root>
  )
}

export { AddVisitPopover }
