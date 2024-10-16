import { Box } from '@radix-ui/themes'
import { PaymentResponsibilitySelect } from '../payment-responsibility-select'
import { VisitDate } from '../visit-date'
import { VisitTypeSelect } from '../visit-type-select'
import { DurationSelect } from './duration-select'
import { FrequencySelect } from './frequency-select'
import { ProviderSelect } from './provider-select'
import { ProviderTypeSelect } from './provider-type-select'
import { VisitMediumText } from './visit-medium-text'
import { VisitSequenceText } from './visit-sequence-text'
import { VisitTimeSelect } from './visit-time-select'

const TimedVisitForm = () => {
  return (
    <>
      <Box className="col-span-4">
        <ProviderTypeSelect />
      </Box>
      <Box className="col-span-4">
        <ProviderSelect />
      </Box>
      <Box className="col-span-4">
        <VisitTypeSelect />
      </Box>
      <Box className="col-span-3">
        <VisitSequenceText />
      </Box>
      <Box className="col-span-3">
        <VisitMediumText />
      </Box>
      <Box className="col-span-3">
        <VisitDate dependentOn="visitType" />
      </Box>
      <Box className="col-span-3">
        <VisitTimeSelect />
      </Box>
      <Box className="col-span-4">
        <DurationSelect />
      </Box>
      <Box className="col-span-4">
        <FrequencySelect />
      </Box>
      <Box className="col-span-4">
        <PaymentResponsibilitySelect />
      </Box>
    </>
  )
}
export { TimedVisitForm }
