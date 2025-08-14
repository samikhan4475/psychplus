'use client'

import React from 'react'
import { PlusIcon } from '@radix-ui/react-icons'
import { Button, DropdownMenu, Flex, Text } from '@radix-ui/themes'
import { ImmunizationForm } from '../immunization-dialog/immunization-form'
import { useStore } from '../store/store'
import { ImmunizationTypeEnum } from '../types'

const AddImmunizationDropdown = () => {
  const { setDialogOpen, setDialogType, setEditData } = useStore((state) => ({
    setDialogOpen: state.setDialogOpen,
    setDialogType: state.setDialogType,
    setEditData: state.setEditData,
  }))

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

  const openDialogWithType = (formType: ImmunizationTypeEnum) => {
    setEditData(undefined)
    setDialogType(formType)
    setDialogOpen(true)
  }

  return (
    <>
      <DropdownMenu.Root modal={false}>
        <DropdownMenu.Trigger>
          <Button className="h-6 bg-[#151B4A]" size="1">
            <PlusIcon />
            Add Immunization
          </Button>
        </DropdownMenu.Trigger>
        <DropdownMenu.Content>
          {immunizationTypes.map((imType, index) => (
            <>
              <DropdownMenu.Item
                className="w-full py-2 hover:bg-[#151B4A]"
                key={imType}
                onSelect={(e) => {
                  e.stopPropagation()
                  openDialogWithType(imType)
                }}
              >
                <Flex className="hover:text-[white]">
                  <Text size="1" className="font-semibold">
                    {immunizationTypesTitles[imType]}
                  </Text>
                </Flex>
              </DropdownMenu.Item>
              {index < Object.keys(immunizationTypes).length - 1 && (
                <DropdownMenu.Separator className="m-0 p-0" />
              )}
            </>
          ))}
        </DropdownMenu.Content>
      </DropdownMenu.Root>
      <ImmunizationForm />
    </>
  )
}

export { AddImmunizationDropdown }
