import { TextCell } from '@/components'

const genderMapper: { [key: string]: string } = {
  NotSpecified: 'N',
  Male: 'M',
  Female: 'F',
  Undetermined: 'U',
}

const GenderCell = ({ value }: { value: string }) => {
  return <TextCell>{genderMapper[value]}</TextCell>
}

export { GenderCell }
