'use client'

import React from 'react'
import { Flex } from '@radix-ui/themes'
import { CODESETS } from '@/constants'
import { useCodesetCodes } from '@/hooks'
import {
  formatDate,
  formatDateTime,
  getCodesetDisplayName,
  getPatientFullName,
} from '@/utils'
import { Prescription } from '../../types'
import { formatDiagnosisList } from '../../utils'
import { ReviewLabel } from '../shared'

interface ReviewDrugDetailProps {
  drug: Prescription
}
const ReviewDrugDetail = ({ drug }: ReviewDrugDetailProps) => {
  const routeOptions = useCodesetCodes(CODESETS.PrescriptionRouteList)
  const frequencyOptions = useCodesetCodes(CODESETS.PrescriptionFrequencyList)
  const prescriptionDrug = drug?.prescriptionDrugs[0] ?? {}
  const prescriptionSignature = drug?.prescriptionSignatures?.[0] ?? {}
  const doseUnitOptions = useCodesetCodes(
    CODESETS.PrescriptionQuantityUnitOfMeasureList,
  )
  return (
    <Flex direction="column" gap="3">
      <Flex gap="4" align="center" wrap="wrap">
        <ReviewLabel
          title={`Duration (${prescriptionSignature?.durationUnitCode ?? '-'})`}
          value={prescriptionSignature?.duration?.toString() ?? '-'}
        />
        <ReviewLabel
          title="Duration Unit"
          value={prescriptionSignature?.durationUnitCode ?? '-'}
        />
      </Flex>

      <Flex gap="4" align="center" wrap="wrap">
        <ReviewLabel
          title="Route"
          value={getCodesetDisplayName(
            String(prescriptionSignature?.doseRouteCode),
            routeOptions,
          )}
        />
        <ReviewLabel
          title="Frequency"
          value={getCodesetDisplayName(
            String(prescriptionSignature?.doseFrequencyCode),
            frequencyOptions,
          )}
        />
        <ReviewLabel
          title="Quantity"
          value={`${String(
            prescriptionDrug?.quantityValue,
          )} ${getCodesetDisplayName(
            String(prescriptionSignature?.doseUnitCode),
            doseUnitOptions,
          )}`}
        />
      </Flex>

      <Flex gap="4" align="center" wrap="wrap">
        <ReviewLabel
          title="Sig"
          value={String(prescriptionSignature?.description)}
        />
      </Flex>

      <Flex gap="4" align="center" wrap="wrap">
        <ReviewLabel
          title="Start Date/Time"
          value={
            prescriptionDrug?.startDateTime
              ? formatDateTime(prescriptionDrug?.startDateTime)
              : ''
          }
        />
        <ReviewLabel
          title="Substitution"
          value={String(
            prescriptionDrug?.isSubstitutionsAllowed ? 'No' : 'Yes',
          )}
        />
        <ReviewLabel
          title="Refills"
          value={String(prescriptionDrug?.refills)}
        />
      </Flex>

      <Flex gap="4" align="center" wrap="wrap">
        <ReviewLabel
          title="Prescriber"
          value={
            drug?.providerName &&
            `${getPatientFullName(drug.providerName, true)} ${
              drug.providerName.title ?? ''
            }`
          }
        />
        <ReviewLabel title="NPI" value={drug?.providerNpi} />
        <ReviewLabel title="DEA" value={drug?.providerDea} />
      </Flex>
      <ReviewLabel
        title="Instruction & Notes"
        value={prescriptionDrug?.drugNote}
      />
      <ReviewLabel title="Diagnosis" value={formatDiagnosisList(drug)} />
    </Flex>
  )
}

export { ReviewDrugDetail }
