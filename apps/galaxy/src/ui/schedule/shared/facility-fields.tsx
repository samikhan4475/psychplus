import { useEffect, useState } from 'react'
import { useFormContext } from 'react-hook-form'
import toast from 'react-hot-toast'
import { ServiceGroup, ServiceRoom, ServiceUnit } from '@/types'
import { BookedAppointmentsSchemaType } from '../schema'
import { GroupDropdown } from './group-select'
import { RoomSelect } from './room-select'
import { UnitDropdown } from './unit-dropdown'
import { getUnitsGroupsAction } from '../client-actions'

const FacilityFields = () => {
  const form = useFormContext<BookedAppointmentsSchemaType>()
  const [loading, setLoading] = useState<boolean>(false)
  const [units, setUnits] = useState<ServiceUnit[]>([])
  const [groups, setGroups] = useState<ServiceGroup[]>([])
  const [rooms, setRooms] = useState<ServiceRoom[]>([])
  const services = form.watch('serviceIds')

  useEffect(() => {
    if (!services.length) return
    setLoading(true)
    getUnitsGroupsAction(services).then((response) => {
      setLoading(false)
      if (response.state === 'error') {
        toast.error('Failed to retrieve units, groups, and rooms')
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
      <UnitDropdown units={units} loading={loading} />
      <RoomSelect rooms={rooms} loading={loading} />
      <GroupDropdown groups={groups} loading={loading} />
    </>
  )
}

export { FacilityFields }
