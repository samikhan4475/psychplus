import { headers } from 'next/headers'
import { Avatar, Flex, Text } from '@radix-ui/themes'
import { cn } from '@/utils'

const PatientBanner = async () => {
  const headerList = headers()
  const pathname = headerList.get('x-current-path')

  const avatar = pathname?.includes('922')
    ? 'https://images.unsplash.com/photo-1502823403499-6ccfcf4fb453?&w=256&h=256&q=70&crop=focalpoint&fp-x=0.5&fp-y=0.3&fp-z=1&fit=crop'
    : 'https://images.unsplash.com/photo-1633332755192-727a05c4013d?q=80&w=256&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D'

  await new Promise((resolve) => setTimeout(resolve, 1500))

  return (
    <Flex
      gap="3"
      py="4"
      px="5"
      wrap="wrap"
      direction={{
        md: 'row',
      }}
      justify="start"
      className="bg-white border-b border-b-gray-5"
    >
      <Flex mr="6">
        <Avatar src={avatar} fallback="NA" size="7" highContrast />
      </Flex>
      <Flex direction="column" className="gap-[2px] md:flex-1">
        <LabelAndValue label="Name" value="Martin Marina" />
        <LabelAndValue label="Age/Gender" value="30 yo/Female" />
        <LabelAndValue label="Orientation" value="Straight" />
        <LabelAndValue label="Pronouns" value="She/Her" />
        <LabelAndValue label="Language" value="English" />
        <LabelAndValue label="Status" value="P Active" />
      </Flex>
      <Flex direction="column" className="gap-[2px] md:flex-1">
        <LabelAndValue label="MRN" value="00012333" />
        <LabelAndValue label="DOB" value="08/15/1993" />
        <LabelAndValue label="Cell" value="(205) 946-1251" />
        <LabelAndValue label="Email" value="martinmarina@gmail.com" />
        <LabelAndValue label="SSN" value="121-31-2114" />
        <LabelAndValue label="Allergies" />
      </Flex>
      <Flex direction="column" className="gap-[2px] md:flex-1">
        <LabelAndValue label="BP" value="80/180mm" />
        <LabelAndValue label="HR" value="80/180mm" />
        <LabelAndValue label="Temp (F)" value="70" />
        <LabelAndValue label="Height (in)" value="350" />
        <LabelAndValue label="Weight (lbs)" value="115" />
        <LabelAndValue label="BMI" value="26" />
      </Flex>
      <Flex direction="column" className="gap-[2px] md:flex-1">
        <LabelAndValue label="CC on file" value="Yes" />
        <LabelAndValue label="Verify" value="C CC" />
        <LabelAndValue label="Primary Ins" value="BCBS" />
        <LabelAndValue label="Secondary Ins" value="Aetna" />
        <LabelAndValue label="Address" value="100 Main St." />
        <LabelAndValue label="City/State/Zip" value="Houston, TX 77479" />
      </Flex>
      <Flex direction="column" className="gap-[2px] md:flex-1">
        <LabelAndValue label="Psychiatrist" value="Dr DrTest 1" />
        <LabelAndValue label="Therapist" value="Test Luke, LCP" />
        <LabelAndValue label="PCP" />
        <LabelAndValue label="Pharmacy Name" />
        <LabelAndValue label="Pharmacy Address" />
        <LabelAndValue label="Pharm City/State/Zip" />
      </Flex>
    </Flex>
  )
}

interface LabelAndValueProps {
  label: string
  value?: string
}

const LabelAndValue = ({ label, value }: LabelAndValueProps) => (
  <Flex gap="1" className="whitespace-nowrap">
    <Text className="text-[11.5px] font-[600]">{label}</Text>
    <Text
      className={cn('text-[11.5px]', {
        'italic text-gray-9': !value,
      })}
    >
      {value ?? 'N/A'}
    </Text>
  </Flex>
)

export { PatientBanner }
