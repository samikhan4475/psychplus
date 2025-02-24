'use client'

import { useEffect } from 'react'
import { Box, Flex } from '@radix-ui/themes'
import { TabContentHeading } from '@/components'
import { AddAssigningAuthorityButton } from '@/ui/assigning-authorities/buttons'
import { CodesetsView } from '@/ui/assigning-authorities/codesets'
import { useStore } from '@/ui/assigning-authorities/store'
import { AssigningAuthoritiesTable } from './assigning-authorities-table'
import { AssigningAuthority } from './types'

interface AssigningAuthoritiesViewProps {
  assigningAuthorities: AssigningAuthority[]
}

const AssigningAuthoritiesView = ({
  assigningAuthorities,
}: AssigningAuthoritiesViewProps) => {
  const { setAssigningAuthorities, selectedAssigningAuthority } = useStore(
    (state) => ({
      setAssigningAuthorities: state.setAssigningAuthorities,
      selectedAssigningAuthority: state.selectedAssigningAuthority,
    }),
  )

  useEffect(() => {
    setAssigningAuthorities(assigningAuthorities)
  }, [assigningAuthorities])

  return (
    <Flex direction="column" width="100%" gap="1">
      {selectedAssigningAuthority ? (
        <CodesetsView />
      ) : (
        <>
          <TabContentHeading title="Assigning Authorities">
            <AddAssigningAuthorityButton />
          </TabContentHeading>

          <Box className="bg-white p-2">
            <AssigningAuthoritiesTable />
          </Box>
        </>
      )}
    </Flex>
  )
}
export { AssigningAuthoritiesView }
