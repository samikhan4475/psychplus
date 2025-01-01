import { useEffect, useState } from 'react'
import { useFormContext } from 'react-hook-form'
import toast from 'react-hot-toast'
import { ServiceGroup, ServiceRoom, ServiceUnit } from '@/types'
import { getUnitsGroupsAction } from '../../actions'
import { ProviderCodingSchema } from '../provider-coding-view-schema'
import { GroupSelect } from './group-dropdown'
import { RoomSelect } from './room-dropdown'
import { UnitSelect } from './units-dropdown'

const FacilityFilters = () => {
  const form = useFormContext<ProviderCodingSchema>()
  const [loading, setLoading] = useState<boolean>(false)
  const [units, setUnits] = useState<ServiceUnit[]>([])
  const [groups, setGroups] = useState<ServiceGroup[]>([])
  const [rooms, setRooms] = useState<ServiceRoom[]>([])
  const services = form.watch('serviceIds')

  useEffect(() => {
    if (services && !services.length) return
    setLoading(true)
    getUnitsGroupsAction(services).then((response) => {
      setLoading(false)
      if (response.state === 'error') {
        toast.error('Failed to retrieve units and groups')
        setUnits([])
        setGroups([])
        setRooms([])
      } else {
        setUnits(response.data?.serviceUnits?? [])
        setGroups(response.data?.serviceGroups?? [])
        setRooms(response.data?.serviceRooms?? [])
      }
    })
  }, [services])

  return (
    <>
      <UnitSelect units={units} loading={loading} />
      <RoomSelect rooms={rooms} loading={loading} />
      <GroupSelect groups={groups} loading={loading} />
    </>
  )
}

export { FacilityFilters }
