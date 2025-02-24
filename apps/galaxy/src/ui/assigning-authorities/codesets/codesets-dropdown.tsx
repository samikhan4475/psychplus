'use client'

import { useEffect, useState } from 'react'
import { Select } from '@radix-ui/themes'
import toast from 'react-hot-toast'
import { getAssigningAuthorities } from '@/ui/assigning-authorities/actions'
import { useStore } from '@/ui/assigning-authorities/store'
import { Codeset } from '@/ui/assigning-authorities/types'
import { cn } from '@/utils'

const CodesetsDropdown = ({
  activeCodesets,
  setActiveCodesets,
}: {
  activeCodesets?: Codeset[]
  setActiveCodesets: (activeCodesets: Codeset[]) => void
}) => {
  const {
    selectedCodeset,
    setSelectedCodeset,
    selectedAssigningAuthority,
    fetchSelectedCodesetCodes,
  } = useStore()

  const [loading, setLoading] = useState<boolean>()

  useEffect(() => {
    if (selectedAssigningAuthority) {
      setLoading(true)
      getAssigningAuthorities({
        assigningAuthorityId: selectedAssigningAuthority.id,
        namespace: selectedAssigningAuthority.namespace,
        isIncludeCodesets: true,
      })
        .then((assigningAuthoritiesResponse) => {
          if (assigningAuthoritiesResponse.state === 'success')
            setActiveCodesets(
              assigningAuthoritiesResponse.data?.[0]?.codesets ?? [],
            )
          else toast.error('Error fetching codesets')
        })
        .finally(() => setLoading(false))
    }
  }, [selectedAssigningAuthority])

  useEffect(() => {
    if (selectedCodeset) fetchSelectedCodesetCodes()
  }, [selectedCodeset])

  return (
    <Select.Root
      size="1"
      onValueChange={(value) => {
        if (value)
          setSelectedCodeset(
            activeCodesets?.find((codeset) => codeset.id === value),
          )
      }}
      value={selectedCodeset?.id}
      defaultValue={selectedCodeset?.id ?? ''}
      disabled={loading}
    >
      <Select.Trigger
        placeholder="Select Codeset"
        className={cn('h-7 w-56 overflow-y-auto', {
          'loading hide-default-select-icon relative overflow-x-hidden':
            loading,
        })}
        variant="surface"
      />
      <Select.Content
        highContrast
        position="popper"
        align="center"
        onCloseAutoFocus={(e) => e.preventDefault()}
      >
        {activeCodesets?.map((codeset, ind) => (
          <Select.Item key={`${codeset.id}-${ind}`} value={String(codeset.id)}>
            {codeset.codeSystemName}
          </Select.Item>
        ))}
      </Select.Content>
    </Select.Root>
  )
}

export { CodesetsDropdown }
