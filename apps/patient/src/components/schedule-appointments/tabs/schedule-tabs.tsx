'use client'

import * as Tabs from '@radix-ui/react-tabs'
import { NewPatient } from '../forms'
import { ExistingPatient } from '../forms/existing-patient'

interface ScheduleTabsProps {
  onClose?: () => void
}

const tabsItemClasses = 'w-[172px] h-[56px] text-gray-8 border-gray-8 justify-evenly items-center font-sans font-light transition duration-1000 data-[state=active]:border-blue-12 data-[state=active]:border-b-8 data-[state=active]:text-blue-12 data-[state=active]:text-4 data-[state=active]:font-bold';

const ScheduleTabs = ({ onClose }: ScheduleTabsProps) => {
  return (
    <Tabs.Root defaultValue="new_patient" className=''>
      <Tabs.List className="flex gap-6 border-b border-gray-8">
        <Tabs.Trigger className={tabsItemClasses} value="new_patient">
          New Patient
        </Tabs.Trigger>
        <Tabs.Trigger className={tabsItemClasses}  value="existing_patient">
          Existing Patient
        </Tabs.Trigger>
      </Tabs.List>
      <Tabs.Content value="new_patient">
        <NewPatient onclose={onClose} />
      </Tabs.Content>
      <Tabs.Content value="existing_patient">
        <ExistingPatient />
      </Tabs.Content>
    </Tabs.Root>
  )
}

export { ScheduleTabs }
