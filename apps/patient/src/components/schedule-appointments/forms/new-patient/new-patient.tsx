'use client'

import { useState } from 'react'
import { useRouter } from 'next/navigation'
import { Flex } from '@radix-ui/themes'
import { DatePicker } from '@psychplus/ui/date-picker'
import { TextField } from '@psychplus/ui/text-field'
import * as ToggleGroup from '@radix-ui/react-toggle-group'

interface NewPatientProps {
  onclose?: () => void
}

const toggleGroupItemClasses =
  'bg-gray-7 text-2 data-[state=on]:bg-blue-12 data-[state=on]:text-accent-1 rounded-3 px-4 mx-2'

interface ScheduledAppointment {
  providerType: 'Psychiatrist' | 'Therapist' | 'unknown'
  appointmentType: 'Virtual' | 'In-Person' | 'unknown'
  dateOfBirth: string
  zipCode: string
}

const NewPatient = ({ onclose }: NewPatientProps) => {

  const router = useRouter();
  
  //TODO: use react hook form to change this.
  const [schedule, setSchedule] = useState<ScheduledAppointment>({  
    providerType: 'Psychiatrist',
    appointmentType: 'Virtual',
    dateOfBirth: new Date().toISOString(),
    zipCode: '',
  });

  const onScheduleChange = (key: keyof ScheduledAppointment, value: string) => {
    setSchedule((prev) => ({ ...prev, [key]: value }));
  };

  const search = () => {
    if (schedule.zipCode.length !== 5) {
      alert('Please enter a valid zip code');
      return;
    }

    //TODO: check with designer if the UI is changed for younger users. 
    if (compareDate(schedule.dateOfBirth)) {
      alert('You must be 18 years or older to schedule an appointment');
      return;
    }

    const queryString = Object.entries(schedule).filter((key) => key[0] !== 'dateOfBirth').map((key) => `${key[0]}=${key[1]}`).join('&');
    router.push(`/schedule-appointment?${queryString}`);
  };

  const compareDate = (date: string | Date) => {
    const tdate = typeof date === 'string' ? new Date(date) : date;
    const today = new Date();
    return (tdate.getFullYear() - today.getFullYear()) < 18;
  }

  return (
    <>
      <Flex className="gap-6 max-md:w-full" direction="column" py="5">
        <Flex className="text-5 font-medium">
          Do you want to see a Psychiatrist or a Therapist?
        </Flex>
        <Flex className="">
          <ToggleGroup.Root type="single" defaultValue="psychiatrist" onValueChange={(value) => onScheduleChange('providerType', value)}>
            <ToggleGroup.Item
              value="psychiatrist"
              className={toggleGroupItemClasses + ' h-[60px] w-[320px]'}
            >
              Psychiatrist <span className="text-1 font-light">(Daignosis/Medication)</span>
            </ToggleGroup.Item>
            <ToggleGroup.Item
              value="therapist"
              className={toggleGroupItemClasses + ' h-[60px] w-[215px]'}
            >
              Therapist <span className="text-1 font-light">(Counseling)</span>
            </ToggleGroup.Item>
          </ToggleGroup.Root>
        </Flex>
      </Flex>
      <Flex className="gap-6 max-md:w-full" direction="column" py="5">
        <Flex className="text-5 font-medium">
          Would you like to meet in-person or virtually?
        </Flex>
        <Flex className="">
          <ToggleGroup.Root type="single" defaultValue="virtual" onValueChange={(value) => onScheduleChange('appointmentType', value)}>
            <ToggleGroup.Item
              value="virtual"
              className={'h-[60px] w-[157px] ' + toggleGroupItemClasses}
            >
              Virtual
            </ToggleGroup.Item>
            <ToggleGroup.Item
              value="in-person"
              className={'h-[60px] w-[178px] ' + toggleGroupItemClasses}
            >
              In-Person
            </ToggleGroup.Item>
          </ToggleGroup.Root>
        </Flex>
      </Flex>
      <Flex className="gap-6 max-md:w-full" direction="column" py="5">
        <Flex gap="6">
          <Flex direction="column">
            <p>Date of Birth</p>
            <DatePicker 
              date={new Date(schedule.dateOfBirth)}
              onSelect={(date) => onScheduleChange('dateOfBirth', date?.toISOString() ?? '')}
            />
          </Flex>
          <Flex direction="column">
            <p>Enter ZIP Code</p>
            <TextField.Input size="3" placeholder="zip code"
              value={schedule.zipCode}
              onChange={(e) => onScheduleChange('zipCode', e.target.value)}
              className='w-[300px] h-[56px] rounded-6 border border-blue-12 px-4 text-2 font-light'
             />
          </Flex>
        </Flex>
      </Flex>
      <Flex className="gap-6 max-md:w-full" direction="column" py="5">
        <Flex gap="3" direction="row-reverse">
          <Flex
            className="h-[40px] w-[100px] cursor-pointer items-center justify-center rounded-6 bg-blue-12 px-4 text-2 font-medium text-accent-1"
            direction="column"
            onClick={search}
          >
            Search
          </Flex>
          <Flex
            className="border-1 w-[77px] cursor-pointer items-center justify-center rounded-6 border border-blue-12 px-4 text-2 font-light"
            direction="column"
            onClick={onclose}
          >
            Close
          </Flex>
        </Flex>
      </Flex>
    </>
  )
}

export { NewPatient }
