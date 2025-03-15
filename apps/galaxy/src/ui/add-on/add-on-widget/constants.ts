const INJECTION_BLOCK_OPTIONS = [
  'drugName',
  'dose',
  'siteLocations',
  'manufacturer',
  'lotNumber',
  'expirationDate',
]

const INTERACTIVE_COMPLEXITY_BLOCK_OPTIONS = [
  {
    label:
      'The need to manage maladaptive communication (related to, e.g., high anxiety, high reactivity, repeated questions, or disagreement) among participants that complicates delivery of care.',
    field: 'maladaptiveCommunication',
  },
  {
    label:
      'Caregiver emotions or behaviors that interfere with implementation of the treatment plan.',
    field: 'caregiverEmotions',
  },
  {
    label:
      'Evidence or disclosure of a sentinel event and mandated report to a third party (e.g., abuse or neglect with report to state agency) with initiation of discussion of the sentinel event and/or report with patient and other visit participants',
    field: 'sentinelEvent',
  },
  {
    label:
      'Use of play equipment, physical devices, interpreter or translator to overcome barriers to diagnostic or therapeutic interaction with a patient who is not fluent in the same language or who has not developed or lost expressive or receptive language skills to use or understand typical language.',
    field: 'languageBarrier',
  },
]

const THERAPY_OPTIONS = [
  'therapyTimeSpent',
  'timeRangeOne',
  'timeRangeTwo',
  'timeRangeThree',
  'therapySessionParticipants',
  'patientOther',
  'additionalTherapyDetail',
]

const THERAPY_PSYCHOANALYSIS_TABLE_DATA = [
  'therapyDetailsModality',
  'therapyDetailsInterventions',
  'transferenceDescription',
  'psychoanalyticTechnique',
]

const ECT_OPTIONS = [
  'seriesMaintenance',
  'series',
  'maintenance',
  'biteblock',
  'timeOut',
  'timeOfProcedure',
  'ectTypeBlock',
  'ectSettingBlockPw',
  'ectSettingBlockFrequency',
  'ectSettingBlockDuration',
  'ectSettingBlockCurrent',
  'ectSeizureDuration',
  'ectPostOpMedicationBlock',
  'ectPostOpMedicationBlockDetails',
  'ectComplicationsBlock',
  'ectComplicationsBlockDetails',
  'ectAssessment',
  'ectContinuePBlock',
  'anesthesiologist',
]
export {
  INJECTION_BLOCK_OPTIONS,
  INTERACTIVE_COMPLEXITY_BLOCK_OPTIONS,
  THERAPY_OPTIONS,
  THERAPY_PSYCHOANALYSIS_TABLE_DATA,
  ECT_OPTIONS,
}
