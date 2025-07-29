'use client'

import { useEffect, useMemo, useState } from 'react'
import { Box, Button, Flex, Text } from '@radix-ui/themes'
import { ColumnDef } from '@tanstack/react-table'
import { SaveIcon } from 'lucide-react'
import toast from 'react-hot-toast'
import {
  ColumnHeader,
  DataTable,
  LoadingPlaceholder,
  LongTextCell,
} from '@/components'
import { CODESETS } from '@/constants'
import { useCodesetCodes } from '@/hooks'
import { Location } from '@/types'
import { getAllLocations, getAllPrimaryVirtualLocations } from './actions'
import { updatePrimaryVirtualLocationAction } from './actions/update-primary-virtual-location'
import { LocationCell } from './location-cell'
import { PrimaryLocation } from './types'

const columns = (
  locations: Location[],
  handleLocationChange: (stateCode: string, locationId: string) => void,
): ColumnDef<PrimaryLocation>[] => [
  {
    id: 'stateCode',
    accessorKey: 'stateCode',
    header: ({ column }) => (
      <ColumnHeader label="State" clientSideSort column={column} />
    ),
    cell: ({ row: { original } }) => {
      return (
        <LongTextCell className="min-w-24">{original.display}</LongTextCell>
      )
    },
  },
  {
    id: 'location',
    header: () => <ColumnHeader label="Location" />,
    cell: ({ row }) => {
      const stateCode = row.original.stateCode

      const filteredOptions = locations
        .filter((loc) => loc.address?.state === stateCode)
        .map((loc) => ({
          value: loc.id,
          label: loc.locationNameGenerated,
        }))

      return (
        <LocationCell
          options={filteredOptions}
          row={row}
          onLocationChange={handleLocationChange}
        />
      )
    },
  },
]

const ManagementStateView = () => {
  const statesCodesets = useCodesetCodes(CODESETS.UsStates)
  const states = statesCodesets.map((state) => ({
    display: state.display,
    stateCode: state.value,
  }))

  const [locations, setLocations] = useState<Location[]>([])
  const [primaryLocations, setPrimaryLocations] = useState<PrimaryLocation[]>(
    [],
  )
  const [loading, setLoading] = useState<boolean>(true)
  const [pendingChanges, setPendingChanges] = useState<Record<string, string>>(
    {},
  )
  const [saving, setSaving] = useState(false)

  const fetchData = async () => {
    setLoading(true)
    const [locationsResult, primaryLocationsResult] = await Promise.all([
      getAllLocations(),
      getAllPrimaryVirtualLocations(),
    ])

    if (locationsResult.state === 'error') {
      toast.error(locationsResult?.error ?? 'Failed to get locations')
    } else {
      setLocations(locationsResult.data)
    }

    if (primaryLocationsResult.state === 'error') {
      toast.error(
        primaryLocationsResult?.error ??
          'Failed to get primary virtual locations',
      )
    } else {
      setPrimaryLocations(primaryLocationsResult.data)
    }
    setLoading(false)
  }

  useEffect(() => {
    fetchData()
  }, [])

  const tableData = useMemo(() => {
    return states.map((state) => {
      const existingLocation = primaryLocations.find(
        (loc) => loc.stateCode === state.stateCode,
      )
      return {
        ...state,
        locationId:
          pendingChanges[state.stateCode] ?? existingLocation?.locationId,
      }
    })
  }, [states, primaryLocations, pendingChanges])

  const handleLocationChange = (stateCode: string, locationId: string) => {
    setPendingChanges((prev) => ({
      ...prev,
      [stateCode]: locationId,
    }))
  }

  const handleSave = async () => {
    setSaving(true)
    const updatedPrimaryLocation = Object.entries(pendingChanges).map(
      ([stateCode, locationId]) => {
        const existingLocation = primaryLocations.find(
          (loc) => loc.stateCode === stateCode,
        )
        return {
          id: existingLocation ? existingLocation.id : undefined,
          stateCode,
          locationId,
        }
      },
    )

    const results = await updatePrimaryVirtualLocationAction(
      updatedPrimaryLocation,
    )

    if (results.state === 'error') {
      toast.error(results?.error ?? 'Failed to save changes')
      setSaving(false)

      return
    } else {
      setPrimaryLocations((prev) =>
        prev.map((loc) => {
          const update = updatedPrimaryLocation.find(
            (u) => u.stateCode === loc.stateCode,
          )
          if (update) {
            return { ...loc, locationId: update.locationId }
          }
          return loc
        }),
      )

      setPendingChanges({})
      const primaryLocationsResult = await getAllPrimaryVirtualLocations()
      setLoading(true)
      if (primaryLocationsResult.state === 'error') {
        toast.error(
          primaryLocationsResult?.error ??
            'Failed to get primary virtual locations',
        )
      } else {
        setPrimaryLocations(primaryLocationsResult.data)
      }
      toast.success('Successfully saved all changes')
      setLoading(false)
      setSaving(false)
    }
  }

  return (
    <Box className="w-full py-1">
      <Flex
        className="bg-white h-[32px] w-full gap-1 px-2 py-1"
        align="center"
        justify="between"
      >
        <Text className="text-black text-[16px]" weight="medium">
          Primary Virtual Location
        </Text>
        <Flex className="gap-1">
          <Button
            type="submit"
            size="1"
            highContrast
            onClick={handleSave}
            disabled={Object.keys(pendingChanges).length === 0 || saving}
          >
            <SaveIcon width={15} height={15} strokeWidth={1.75} />
            {saving ? 'Saving' : 'Save'}
          </Button>
        </Flex>
      </Flex>
      <Box className="bg-white rounded my-1 p-2">
        {loading ? (
          <LoadingPlaceholder className="h-full" />
        ) : (
          <Box>
            <DataTable
              data={tableData}
              columns={columns(locations, handleLocationChange)}
              disablePagination
              sticky
              tableClass="bg-white w-[70%]"
            />
          </Box>
        )}
      </Box>
    </Box>
  )
}

export { ManagementStateView }
