'use client'

import { useState } from 'react'
import { zodResolver } from '@hookform/resolvers/zod'
import { Box, Flex } from '@radix-ui/themes'
import { useForm } from 'react-hook-form'
import { FormContainer, TabContentHeading } from '@/components'
import {
  AddCodesetButton,
  BackButton,
} from '@/ui/assigning-authorities/codesets'
import {
  AddCodeButton,
  CodesTable,
  CodesTablePagination,
  schema,
  SchemaType,
} from '@/ui/assigning-authorities/codesets/codes'
import { useStore } from '@/ui/assigning-authorities/store'
import { Codeset } from '../types'
import { CodesetsDropdown } from './codesets-dropdown'

const CodesetsView = () => {
  const { selectedCodeset } = useStore()
  const [activeCodesets, setActiveCodesets] = useState<Codeset[]>()
  const form = useForm<SchemaType>({
    resolver: zodResolver(schema),
    defaultValues: {
      newCodesetCode: undefined,
      editableCodesetCode: undefined,
    },
  })

  return (
    <FormContainer form={form} onSubmit={() => {}}>
      <Flex direction="column" gap="1" height="100%">
        <TabContentHeading
          title={`Codeset${
            activeCodesets !== undefined ? ` (${activeCodesets.length})` : ''
          }`}
        >
          <AddCodesetButton
            activeCodesets={activeCodesets}
            setActiveCodesets={setActiveCodesets}
          />
        </TabContentHeading>

        <Flex direction="column" className="bg-white">
          <TabContentHeading
            title="Internal Assigning Authority"
            className="border-none"
            beforeTitle={<BackButton />}
          >
            <AddCodeButton />
          </TabContentHeading>

          <Box p="2">
            <CodesetsDropdown
              activeCodesets={activeCodesets}
              setActiveCodesets={setActiveCodesets}
            />

            <Flex className="h-[calc(94dvh_-_240px)]" mt="3" direction="column">
              <CodesTable />
              {selectedCodeset && <CodesTablePagination />}
            </Flex>
          </Box>
        </Flex>
      </Flex>
    </FormContainer>
  )
}

export { CodesetsView }
