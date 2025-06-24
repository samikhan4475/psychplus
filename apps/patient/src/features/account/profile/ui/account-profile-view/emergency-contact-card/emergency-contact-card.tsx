'use client'

import { EmptyFileIcon, FeatureEmpty } from '@/components-v2'
import { RelationshipData } from '@psychplus-v2/types'
import { cn } from '@psychplus-v2/utils'
import { DataTable } from '@psychplus/ui/data-table/data-table'
import { DotsHorizontalIcon } from '@radix-ui/react-icons'
import {
  Box,
  DropdownMenu,
  Flex,
  Switch,
  Text,
} from '@radix-ui/themes'
import { PencilIcon, Trash2 } from 'lucide-react'
import { ReactNode, useState } from 'react'
import { AccountProfileAccordion } from '../account-profile-accordion'
import { AddRelationshipFormFields } from './add-relationship-form-fields'
import { columns } from './columns'
import { DeleteRelationship } from './delete-relationship'
import { RelationshipFormDialog } from './relationship-form-dialog'

interface InformationCell {
  content: ReactNode;
}

interface InformationRow {
  id?: string;
  informationCells: InformationCell[];
}
let rows: InformationRow[] = []

interface EmergencyContactCardProps {
  relationshipData: RelationshipData[];
}

interface RenderDataTableProps {
  isEdit: boolean;
  handleSave: () => void;
  relationshipData: RelationshipData[];
  setDeleteItem: React.Dispatch<React.SetStateAction<RelationshipData | undefined>>;
  setSelectedId: React.Dispatch<React.SetStateAction<string | undefined>>;
}

const EmergencyContactCard = ({ relationshipData }: EmergencyContactCardProps) => {
  const [deleteItem, setDeleteItem] = useState<RelationshipData | undefined>(undefined);
  const [selectedId, setSelectedId] = useState<string | undefined>(undefined)

  const selectedRelationship = relationshipData?.find((item: RelationshipData) => item.id === selectedId);

  rows = relationshipData
    ? relationshipData.map((item: RelationshipData) => ({
      id: item.id,
      informationCells: [
        { content: item.name.firstName ?? '' },
        { content: item.name.middleName ?? '' },
        { content: item.name.lastName ?? '' },
        { content: item.guardianRelationshipCode ?? '' },
        { content: item.contactDetails.addresses[0].street1 ?? '' },
        { content: item.contactDetails.addresses[0].postalCode ?? '' },
        { content: item.contactDetails.email ?? '' },
        { content: item.contactDetails.phoneNumbers.find(phone => phone.type === 'Mobile')?.number ?? '' },
        { content: item.contactDetails.phoneNumbers.find(phone => phone.type === 'Home')?.number ?? '' },
        {
          content:
            <Switch
              color="indigo"
              highContrast
              defaultChecked={item.isEmergencyContact}
            />
        },
        {
          content:
            <Switch
              color="indigo"
              highContrast
              defaultChecked={item.isAllowedToReleaseInformation}
            />
        },
        {
          content:
            <Switch
              color="indigo"
              highContrast
              defaultChecked={item.isGuardian}
            />
        },
        {
          content: (
            <DropdownMenu.Root>
              <DropdownMenu.Trigger className="cursor-pointer">
                <DotsHorizontalIcon />
              </DropdownMenu.Trigger>

              <DropdownMenu.Content className="bg-white shadow-2xl shadow-stone-900 rounde1c2024d w-[96px] p-0">
                <DropdownMenu.Item className="p-0 w-full hover:bg-[#ffffff] border-b border-b-[#DDDDE3] rounded-[0px]" onClick={() => { setSelectedId(item.id) }} >
                  <Flex
                    width="100%"
                    align="center"
                    gap="6"
                    className="text-xs font-normal cursor-pointer gap-2  py-[6px] leading-4"
                  >
                    <PencilIcon
                      height={15}
                      width={15}
                      strokeWidth={2}
                      aria-hidden
                      color="#60646C"
                    />
                    <Text size="2" className="text-[#1C2024]">Edit</Text>
                  </Flex>
                </DropdownMenu.Item>
                <DropdownMenu.Item onClick={() => setDeleteItem(item)} className="p-0 hover:bg-[#ffffff]">
                  <Flex
                    width="100%"
                    align="center"
                    gap="6"
                    className="text-xs font-normal cursor-pointer gap-2 py-[6px] leading-4 p-0"
                  >
                    <Trash2 height={15} width={15} strokeWidth={2} aria-hidden color="#60646C" />
                    <Text size="2" className="text-[#1C2024]">Delete</Text>
                  </Flex>
                </DropdownMenu.Item>
              </DropdownMenu.Content>
            </DropdownMenu.Root>
          ),
        },
      ],
    }))
    : [];

  return (
    <>
      <DeleteRelationship data={deleteItem} setDeleteItem={setDeleteItem} />
      <AccountProfileAccordion
        title="Relationship"
        editable={false}
        addEditable={true}
        content={(isEdit, handleSave) => RenderDataTable({ isEdit, handleSave, relationshipData, setDeleteItem, setSelectedId })}
        modalContent={RenderAddEditRelationshipModal}
      />
      <RelationshipFormDialog
        modalTitle="Edit Relationship"
        isEditMode={true}
        open={!!selectedId}
        setOpen={(value) => { if (value === false) { setSelectedId(undefined) } }}
        content={
          <AddRelationshipFormFields
            mode="edit"
            setOpen={(value) => { if (value === false) { setSelectedId(undefined) } }}
            defaultValues={
              {
                id: selectedRelationship?.id ?? '',
                firstName: selectedRelationship?.name.firstName ?? '',
                lastName: selectedRelationship?.name.lastName ?? '',
                middleName: selectedRelationship?.name.middleName ?? '',
                relationship: selectedRelationship?.guardianRelationshipCode ?? '',
                address: selectedRelationship?.contactDetails.addresses[0].street1 ?? '',
                postalCode: selectedRelationship?.contactDetails.addresses[0].postalCode ?? '',
                email: selectedRelationship?.contactDetails.email ?? '',
                phoneNumber: selectedRelationship?.contactDetails.phoneNumbers.find(phone => phone.type === 'Mobile')?.number ?? '',
                homePhone: selectedRelationship?.contactDetails.phoneNumbers.find(phone => phone.type === 'Home')?.number ?? '',
                isEmergencyContact: selectedRelationship?.isEmergencyContact ?? false,
                isAllowedToReleaseInformation: selectedRelationship?.isAllowedToReleaseInformation ?? false,
                isGuardian: selectedRelationship?.isGuardian ?? false,
              }
            }
          />
        }
      />
    </>
  )
}

const RenderAddEditRelationshipModal = (
  isAddRelationshipModalOpen: boolean,
  setIsAddRelationshipModalOpen: React.Dispatch<React.SetStateAction<boolean>>
) => (
  <AddRelationshipFormFields
    mode="add"
    open={isAddRelationshipModalOpen}
    setOpen={setIsAddRelationshipModalOpen}
  />
)

const RenderDataTable = (
  {
    isEdit,
    handleSave,
    relationshipData,
    setDeleteItem,
    setSelectedId,
  }: RenderDataTableProps
) => (
  <Box className="overflow-x-auto">
    <Box className={cn(
      { 'min-w-[1600px]': relationshipData.length > 0 }
    )}>
      <DataTable
        data={relationshipData}
        columns={columns(setSelectedId, setDeleteItem)}
        tableClass="overflow-x-auto border border-[#D9E2FC] rounded-[8px]"
        tHeadClass=""
        headerCellClass=""
        thClass="text-xs font-medium h-[24px] border border-t-0 border-l-0 border-b-[#D9E2FC] border-r-[#D9E2FC] bg-[#F0F4FF] p-1 last:border-r-0 text-black"
        toBodyClass="border-[lightgray]"
        columnCellClass="text-xs h-auto border-r border-r-[#D9E2FC] p-1 text-[#1C2024] last:border-r-0"
        isPreferredPartnerTable={true}
        initialPageSize={10}
        noResultsComponent={renderEmptyDataComponent}
      />
    </Box>
  </Box>
)

const renderEmptyDataComponent = () => <FeatureEmpty
  description="No relationship added yet"
  Icon={EmptyFileIcon}
/>

export { EmergencyContactCard }
