'use client'

import { Flex, Text } from '@radix-ui/themes'
import { format } from 'date-fns'
import { PatientProfile } from '@/types'
import { useStore } from '@/ui/questionnaires/store'
import { SubstanceUseHxWidgetSchemaType } from '@/ui/substance-use-hx/substance-use-hx-widget/substance-use-hx-schema'
import { QuickNoteSectionName } from '../../constants'
import { BlockContainer, LabelAndValue } from '../shared'

interface Props<T> {
  sectionName: string
  data: T
  patient?: PatientProfile
  actualNoteViewVisibility?: boolean
}

const Details = ({
  sectionName,
  data,
  patient,
  actualNoteViewVisibility,
}: Props<SubstanceUseHxWidgetSchemaType>) => {
  const { histories } = useStore((state) => ({
    histories: state.histories,
  }))
  if (!patient) return null
  let patientGender = patient.gender
  if (patientGender === 'Undetermined') {
    patientGender = patient.genderOrientation || patient.gender
  }
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
  return actualNoteViewVisibility ? (
    <BlockContainer heading={sectionName}>
      <Flex direction="column">
        <LabelAndValue label="Tobacco:" value={data.tobacco} />
        {data.tobacco === 'yes' && (
          <>
            {data.smokePacks && (
              <LabelAndValue
                label="Smoke:"
                value={`Packs a day: ${data.smokePacks}`}
              />
            )}
            <LabelAndValue
              value={`I have reviewed the risks of continued smoking with the patient and offered
              Smoking Cessation Options ${data.smokingCessationOption || ''} and
              Counseling Options ${data.counselingOption || ''}.`}
            />
            <LabelAndValue
              label="Discussed smoking cessation for:"
              value={data.smokingCessationDiscussionDuration}
            />
            <LabelAndValue label="Other:" value={data.otherTobacco} />
          </>
        )}
        <Text size="2" weight="medium">
          Screening for drug/alcohol use:
        </Text>
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
          In the past 6 months, have you used a recreational drug or used a prescription medication for nonmedical reasons? ${data.drugs}`}
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
          label="Questionnaire (Pt was agreeable to detailed assessment):"
          value={data.questionnaire}
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
          value={data.referralTreatment?.join(', ')}
        />
        <LabelAndValue
          label="Alcohol Substance Cessation Discussion Duration:"
          value={data.alcoholSubstanceCessationDiscussionDuration}
        />
        {data.otherAlcoholDrugs && (
          <LabelAndValue label="Other:" value={data.otherAlcoholDrugs} />
        )}
      </Flex>
    </BlockContainer>
  ) : null
}

export { Details }
