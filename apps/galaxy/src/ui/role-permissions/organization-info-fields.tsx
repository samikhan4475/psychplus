'use client'

import { Flex, Grid } from '@radix-ui/themes'
import { RoleDialog } from './dialogs'
import { OrganizationSelect } from './organization-select'
import { PracticeSelect } from './practice-select'
import { RoleSelect } from './role-select'
import { SelectionButtons } from './selection-buttons'
import { StaffSelect } from './staff-select'

interface Props {
  selectedPermissionsId: string
}

const OrganizationInfoFields = ({ selectedPermissionsId }: Props) => {
  return (
    <Grid columns="5" gap="2" px="2" py="1" className="col-span-full">
      <OrganizationSelect />
      <PracticeSelect />
      <RoleSelect />
      <StaffSelect />
      <Flex gap="2">
        <RoleDialog />
        <SelectionButtons selectedPermissionsId={selectedPermissionsId} />
      </Flex>
    </Grid>
  )
}

export { OrganizationInfoFields }
