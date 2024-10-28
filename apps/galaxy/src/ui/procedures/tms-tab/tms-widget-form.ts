import { zodResolver } from '@hookform/resolvers/zod'
import { useForm } from 'react-hook-form'
import { tmsWidgetSchema, TmsWidgetSchemaType } from './tms-widget-schema'
import { ProtocolTitles, TypeOfThetaBurst } from './treatment-session/types'

const useTmsWidgetForm = () => {
  const form = useForm<TmsWidgetSchemaType>({
    resolver: zodResolver(tmsWidgetSchema),
    reValidateMode: 'onChange',
    defaultValues: {
      tmsSeizureBlock: {
        seizure: 'no',
        details:
          'Standard seizure management protocol was followed, including patient monitoring and necessary medical interventions',
      },
      tmsDizzinessBlock: {
        dizziness: 'no',
        details:
          'Provided hydration, conducted a brief assessment of vital signs including blood pressure and heart rate. Advised the patient to sit or lie down in a safe environment until symptoms subside. Monitored closely for any further developments and documented observations for future reference.',
      },
      tmsHeadacheBlock: {
        headache: 'no',
        details:
          'Rested in a dark, quiet environment and administered over-the-counter analgesics if needed.',
      },
      tmsFatigueBlock: {
        fatigue: 'no',
        details:
          'Rest was advised in a dark, quiet environment, and hydration was provided. Recommendations for post-discharge included continued rest, maintaining adequate hydration, and gradual return to normal activities.',
      },
      tmsMuscleTwitchingBlock: {
        muscleTwitching: 'no',
        details:
          'Adjusted stimulation parameters to minimize muscle activation. Provided guidance on relaxation techniques such as deep breathing or progressive muscle relaxation exercises. Additionally, ensured hydration, conducted a brief assessment of vital signs, and advised the patient to sit or lie down until symptoms subside.',
      },
      suicide: 'no',
      tmsScalpDiscomfortBlock: {
        scalpDiscomfort: 'no',
        details:
          'Adjusted coil positioning to alleviate discomfort. Provided patient education on scalp care post-session',
      },
      tmsOtherBlock: {
        other: 'no',
        details: '',
      },
      dischargePlan: ['continueWithCurrentProtocol'],
      tmsDischargePlanBlock: [
        {
          discharge: 'continueWithCurrentProtocol',
          value: 'maintenance',
        },
      ],
      followUpBlock: [],
      typeOfThetaBurst: TypeOfThetaBurst.ContinuesThetaBurst,
      frequency: 'Theta Frequency (5 Hz)',
      frequencyOfSession: 1,
      durationFrom: 20,
      durationTo: 40,
      optimalStimulationLevel: 120,
      motorThershold: [],
      stimulationLevel: 0,
      precautionsAndWarnings: [1, 2, 3, 4, 5, 6],
      tmdSessionNo: '01',
      burstPattern: 'Intermittent',
      protocol: ProtocolTitles.StandardProtocol,
      motorThersholdValue: '0',
      treatmentAndObservation:
        'Patient showed positive response to TMS treatment, well tolerated, manageable side effects. Patient remained calm throughout treatment. No suicidal ideations reported. Continued monitoring and subsequent sessions crucial for full evaluation of therapeutic response.',
    },
  })

  return form
}

export { useTmsWidgetForm }
