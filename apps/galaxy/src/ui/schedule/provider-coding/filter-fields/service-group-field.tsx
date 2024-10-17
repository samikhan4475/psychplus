import { useEffect, useState } from 'react'
import { useFormContext } from 'react-hook-form'
import toast from 'react-hot-toast'
import { ProviderCodingSchema } from '../provider-coding-view-schema'
import { GroupSelect } from './group-dropdown'
import { UnitSelect } from './units-dropdown'
import { ServiceGroup, ServiceUnit } from '@/types'
import { getUnitsGroupsAction } from '../../actions'

const ServiceFieldGrouping = () => {
  const form = useFormContext<ProviderCodingSchema>()
  const [units, setUnits] = useState<ServiceUnit[]>([])
  const [groups, setGroups] = useState<ServiceGroup[]>([])
  const services = form.watch('serviceIds')
  useEffect(() => {
    if (services && !services.length) return
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
      <UnitSelect units={units} />
      <GroupSelect groups={groups} />
    </>
  )
}

export { ServiceFieldGrouping }
