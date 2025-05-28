'use client'

import * as Tabs from '@radix-ui/react-tabs'
import { NewPatient } from '../forms'
import { ExistingPatient } from '../forms/existing-patient'

interface ScheduleTabsProps {
  onClose?: () => void
  mapKey: string
}

const tabsItemClasses =
  'w-[120px] lg:w-[172px] lg:text-6 h-[40px] text-[#79808F] text-3 justify-evenly items-center border-t-none border-x-none font-sans font-light transition duration-1000 data-[state=active]:border-[#151B4A] data-[state=active]:border-b-4 outline-none data-[state=active]:text-[#151B4A] data-[state=active]:font-bold mt-3'

const ScheduleTabs = ({ onClose, mapKey }: ScheduleTabsProps) => {
  return (
    <Tabs.Root defaultValue="new_patient" className="">
      <Tabs.List className="gap-6 lg:gap-15 flex border-b border-[#D4D4D4]">
        <Tabs.Trigger className={tabsItemClasses} value="new_patient">
          New Patient
        </Tabs.Trigger>
        <Tabs.Trigger className={tabsItemClasses} value="existing_patient">
          Existing Patient
        </Tabs.Trigger>
      </Tabs.List>
      <Tabs.Content value="new_patient">
        <NewPatient onclose={onClose} mapKey={mapKey} />
      </Tabs.Content>
      <Tabs.Content value="existing_patient">
        <ExistingPatient />
      </Tabs.Content>
    </Tabs.Root>
  )
}

export { ScheduleTabs }
