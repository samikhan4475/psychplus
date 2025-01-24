import React from 'react'
import { Flex } from '@radix-ui/themes'
import { format } from 'date-fns'
import { PatientProfile, SharedCode } from '@/types'
import { useStore } from '@/ui/questionnaires/store'
import { QuickNoteSectionName } from '@/ui/quicknotes/constants'
import { SubstanceUseHxWidgetSchemaType } from '@/ui/substance-use-hx/substance-use-hx-widget/substance-use-hx-schema'
import { mapValuesToLabels } from '@/utils'
import { LabelAndValue } from '../../shared'

interface DrugAlcoholProps {
  data: SubstanceUseHxWidgetSchemaType
  patient?: PatientProfile
  referralTreatmentCodeset: SharedCode[]
}

const DrugAlcohol: React.FC<DrugAlcoholProps> = ({
  data,
  patient,
  referralTreatmentCodeset,
}) => {
  const { histories } = useStore((state) => ({
    histories: state.histories,
  }))
  if (!patient) return null

  const patientGender =
    patient.gender === 'Undetermined'
      ? patient.genderOrientation || patient.gender
      : patient.gender
  const isFemale = patientGender === 'Female'
  const auditData = histories[QuickNoteSectionName.QuickNoteSectionAudit] || []
  const dastData = histories[QuickNoteSectionName.QuickNoteSectionDast10] || []
  const latestAudit = auditData[0]
  const latestDast = dastData[0]
  const auditScore = latestAudit?.data.reduce(
    (acc, item) => acc + Number(item.sectionItemValue),
    0,
  )
  const dastScore = latestDast?.data.reduce(
    (acc, item) => acc + Number(item.sectionItemValue),
    0,
  )
  return (
    <Flex direction="column">
      {data.alcohol && (
        <LabelAndValue
          label="Alcohol:"
          value={`Do you drink >${isFemale ? 3 : 4} alcoholic drinks/day or ${
            isFemale ? '>7' : '>14'
          } alcoholic drinks/week: ${data.alcohol}`}
          className="flex-nowrap"
        />
      )}
      {data.drugs && (
        <LabelAndValue
          label="Drugs:"
          value={`
          In the past 6 months, have you used a recreational drug or used a prescription medication for nonmedical reasons: ${data.drugs}`}
          className="flex-nowrap"
        />
      )}
      {data.drugs === 'yes' && (
        <>
          <LabelAndValue
            label="Opioids:"
            value={data.opioidsDetails || data.opioids}
          />
          <LabelAndValue
            label="Sedative:"
            value={data.sedativeDetails || data.sedative}
          />
          <LabelAndValue
            label="Cocaine:"
            value={data.cocaineDetails || data.cocaine}
          />
          <LabelAndValue
            label="Amphetamine:"
            value={data.amphetamineDetails || data.amphetamine}
          />
          <LabelAndValue label="PCP:" value={data.pcpDetails || data.pcp} />
          <LabelAndValue
            label="Inhalants:"
            value={data.inhalantsDetails || data.inhalants}
          />
        </>
      )}
      <LabelAndValue
        label="Questionnaire:"
        value={`Pt was agreeable to detailed assessment: ${data.questionnaire}`}
      />
      {data.alcohol === 'yes' && (
        <LabelAndValue
          label="AUDIT:"
          value={
            latestAudit &&
            `Score ${auditScore}, Completed ON ${format(
              new Date(latestAudit.createdOn),
              'MM/dd/yyyy HH:mm',
            )} BY ${latestAudit.createdByRole}`
          }
          className="flex-nowrap"
        />
      )}
      {data.drugs === 'yes' && (
        <LabelAndValue
          label="DAST:"
          value={
            latestDast &&
            `Score ${dastScore}, Completed ON ${format(
              new Date(latestDast.createdOn),
              'MM/dd/yyyy HH:mm',
            )} BY ${latestDast.createdByRole}`
          }
          className="flex-nowrap"
        />
      )}
      {data.briefIntervention && (
        <LabelAndValue
          label="Brief Intervention:"
          value="Discussed with patient reasons for use of substance, health risk associated with use, how ready and confident the patient is about quitting, gave adviceand discussed the following goal"
          className="flex-nowrap"
        />
      )}

      <LabelAndValue
        label="Referral Treatment:"
        value={mapValuesToLabels(
          data.referralTreatment as string[],
          referralTreatmentCodeset,
        )}
      />
      <LabelAndValue
        label="Discussed alcohol/substance use cessation for:"
        value={data.alcoholSubstanceCessationDiscussionDuration}
      />
      {data.otherAlcoholDrugs && (
        <LabelAndValue label="Other:" value={data.otherAlcoholDrugs} />
      )}
    </Flex>
  )
}

export { DrugAlcohol }
