import { useState } from 'react'
import NextLink from 'next/link'
import { CaretDownIcon, CaretUpIcon } from '@radix-ui/react-icons'
import { DropdownMenu, Flex, Text } from '@radix-ui/themes'
import { useStore } from '@/store'

const PatientLookupDropdown = ({ isActive }: { isActive: boolean }) => {
  const addTab = useStore((state) => state.addTab)
  const [isOpen, setIsOpen] = useState(false)

  return (
    <DropdownMenu.Root modal={false} onOpenChange={setIsOpen}>
      <DropdownMenu.Trigger className="cursor-pointer">
        <Flex
          className={`flex items-center px-2 py-1 ${
            isActive && 'bg-pp-black-1 rounded-[4px]'
          }`}
        >
          <Text className={`whitespace-nowrap text-[13px]`}>
            Patient Lookup
          </Text>
          {isOpen ? <CaretUpIcon /> : <CaretDownIcon />}
        </Flex>
      </DropdownMenu.Trigger>
      <DropdownMenu.Content
        size="1"
        align="end"
        className="rounded-1 px-1 pb-1 pt-1 shadow-3"
      >
        <DropdownMenu.Item asChild>
          <NextLink
            onClick={() => {
              addTab({
                href: '/patient-lookup',
                label: 'Patient Lookup',
              })
            }}
            href="/patient-lookup"
            className="hover:text-black hover:bg-pp-bg-accent whitespace-nowrap border-b-2 text-[13px]"
          >
            Patient Lookup
          </NextLink>
        </DropdownMenu.Item>

        <DropdownMenu.Separator className="m-1" />
        <DropdownMenu.Item asChild>
          <NextLink
            href="/int-referrals"
            className="hover:text-black hover:bg-pp-bg-accent whitespace-nowrap text-[13px]"
            onClick={() => {
              addTab({
                href: '/int-referrals',
                label: 'INT Referrals',
              })
            }}
          >
            INT Referrals
          </NextLink>
        </DropdownMenu.Item>
        <DropdownMenu.Separator className="m-1" />
        <DropdownMenu.Item asChild>
          <NextLink
            href="/external-referral"
            className="hover:text-black hover:bg-pp-bg-accent whitespace-nowrap text-[13px]"
            onClick={() => {
              addTab({
                href: '/external-referral',
                label: 'External Referral',
              })
            }}
          >
            External Referrals
          </NextLink>
        </DropdownMenu.Item>
        <DropdownMenu.Separator className="m-1" />
         <DropdownMenu.Sub>
          <DropdownMenu.SubTrigger className="hover:text-black hover:bg-pp-bg-accent whitespace-nowrap text-[13px] flex items-center justify-between">
            <Text>Transfer Patient</Text>
          </DropdownMenu.SubTrigger>
          <DropdownMenu.SubContent
            className="rounded-1 px-1 pb-1 pt-1 shadow-3"
            sideOffset={5}
          >
            <DropdownMenu.Item asChild>
              <NextLink
                href="/transfer-patient"
                className="hover:text-black hover:bg-pp-bg-accent whitespace-nowrap text-[13px]"
                onClick={() => {
                  addTab({
                    href: '/transfer-patient',
                    label: 'Transfer Patient',
                  })
                }}
              >
                Internal Practice
              </NextLink>
            </DropdownMenu.Item>
            <DropdownMenu.Separator className="m-1" />
            <DropdownMenu.Item asChild>
              <NextLink
                href="/transfer-patient"
                className="hover:text-black hover:bg-pp-bg-accent whitespace-nowrap text-[13px]"
                onClick={() => {
                  addTab({
                    href: '/transfer-patient',
                    label: 'Transfer Patient',
                  })
                }}
              >
                External Practice
              </NextLink>
            </DropdownMenu.Item>
          </DropdownMenu.SubContent>
        </DropdownMenu.Sub>
      </DropdownMenu.Content>
    </DropdownMenu.Root>
  )
}

export { PatientLookupDropdown }
