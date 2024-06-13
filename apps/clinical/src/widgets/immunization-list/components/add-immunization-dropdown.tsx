'use client'

import React, { useState } from 'react'
import { PlusIcon } from '@radix-ui/react-icons'
// import { DropdownMenu } from '@psychplus/ui/dropdown-menu'
import { Button, Flex, Text } from '@radix-ui/themes'
import { DropdownMenu } from '@psychplus/ui/dropdown-menu'
import { ImmunizationDialogWidgetClient } from '@/widgets/immunization-dialog/problems-dialog-widget.client'
import { ImmunizationTypeEnum } from '../types'

const AddImmunizationDropdown: React.FC = () => {
  const immunizationTypesTitles: Record<ImmunizationTypeEnum, string> = {
    [ImmunizationTypeEnum.Administered]: 'New Administered',
    [ImmunizationTypeEnum.Historical]: 'Historical',
    [ImmunizationTypeEnum.Refusal]: 'Refusal',
  }
  const immunizationTypes: ImmunizationTypeEnum[] = [
    ImmunizationTypeEnum.Administered,
    ImmunizationTypeEnum.Historical,
    ImmunizationTypeEnum.Refusal,
  ]

  const [isOpen, setIsOpen] = useState(false)
  const [immunizationType, setImmunizationType] =
    useState<ImmunizationTypeEnum>(ImmunizationTypeEnum.Administered)

  const openDialogWithType = (formType: ImmunizationTypeEnum) => {
    setIsOpen(true)
    setImmunizationType(formType)
  }

  const closeDialog = () => {
    setIsOpen(false)
  }

  return (
    <>
      <DropdownMenu.Root modal={false}>
        <DropdownMenu.Trigger>
          <Button className="bg-[#151B4A]" size="2">
            <PlusIcon />
            Add Immunization
          </Button>
        </DropdownMenu.Trigger>
        <DropdownMenu.Content>
          {immunizationTypes.map((imType, index) => (
            <React.Fragment key={imType}>
              <DropdownMenu.Item
                className="w-full py-4 hover:bg-[#151B4A]"
                onSelect={(e) => {
                  e.stopPropagation()
                  openDialogWithType(imType)
                }}
              >
                <Flex className=" hover:text-[white]">
                  <Text size="3">{immunizationTypesTitles[imType]}</Text>
                </Flex>
              </DropdownMenu.Item>
              {index < Object.keys(immunizationTypes).length - 1 && (
                <DropdownMenu.Separator className="m-0 p-0" />
              )}
            </React.Fragment>
          ))}
        </DropdownMenu.Content>
      </DropdownMenu.Root>
      <ImmunizationDialogWidgetClient
        immunizationType={immunizationType}
        isOpen={isOpen}
        closeDialog={closeDialog}
      />
    </>
  )
}

export { AddImmunizationDropdown }
