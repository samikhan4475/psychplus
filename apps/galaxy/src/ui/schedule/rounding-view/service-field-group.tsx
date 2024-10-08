import { useEffect, useState } from 'react'
import { useFormContext } from 'react-hook-form'
import toast from 'react-hot-toast'
import { getUnitsGroupsAction } from '../actions'
import { BookedAppointmentsSchemaType } from '../schema'
import { GroupDropdown } from './group-select'
import { UnitDropdown } from './unit-dropdown'
import { ServiceGroup, ServiceUnit } from '@/types'

const ServiceFieldGroup = () => {
  const form = useFormContext<BookedAppointmentsSchemaType>()
  const [units, setUnits] = useState<ServiceUnit[]>([])
  const [groups, setGroups] = useState<ServiceGroup[]>([])
  const services = form.watch('serviceIds')

  useEffect(() => {
    if (!services.length) return
    getUnitsGroupsAction(services).then((response) => {
      if (response.state === 'error') {
        toast.error('Failed to retrieve units and groups')
        setUnits([])
        setGroups([])
      } else {
        setUnits(response.data.serviceUnits)
        setGroups(response.data.serviceGroups)
      }
    })
  }, [services])

  return (
    <>
      <UnitDropdown units={units} />
      <GroupDropdown groups={groups} />
    </>
  )
}

export { ServiceFieldGroup }
