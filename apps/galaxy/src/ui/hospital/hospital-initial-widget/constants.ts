enum HospitalInitialPrefixes {
  STRENGTHS = 'strengths',
  LIABILITIES = 'liabilities',
  NFLOC = 'nfloc',
  STG = 'stg',
  PRECAUTIONS = 'precautions',
  DCPLAN = 'dcplan',
}

const HospitalInitialFieldMapping = [
  //strengths codeset
  { label: 'Age', value: 'strengths_age' },
  { label: 'Family', value: 'strengths_family' },
  { label: 'Make Decisions', value: 'strengths_make_decisions' },
  { label: 'Communicate', value: 'strengths_communicate' },
  { label: 'Social Support', value: 'strengths_social_support' },
  { label: 'Children', value: 'strengths_children' },
  { label: 'Health', value: 'strengths_health' },
  { label: 'Other', value: 'strengths_other' },

  //liabilities codeset
  { label: 'Age', value: 'liabilities_age' },
  { label: 'Poor Coping', value: 'liabilities_poor_coping' },
  { label: 'Severe Symptoms', value: 'liabilities_severe_symptoms' },
  { label: 'Poor Support', value: 'liabilities_poor_support' },
  { label: 'Other', value: 'liabilities_other' },

  //need for level of care codeset
  {
    label: 'Danger to self or others',
    value: 'nfloc_danger_to_self_or_others',
  },
  {
    label:
      'Severe Depression due to which patient is suicidal and unable to function or perform activities of daily living',
    value: 'nfloc_severe_depression',
  },
  {
    label:
      'Severe psychosis due to which patient is impulsive and can harm self or others and unable to function or perform activities of daily living',
    value: 'nfloc_severe_psychosis',
  },
  {
    label:
      'Severe Substance use due to which patient is having withdrawals that need monitoring',
    value: 'nfloc_severe_substance',
  },
  {
    label:
      'Unable to care for self or perform activities of daily living due to underlying mental health or substance use',
    value: 'nfloc_unable_to_care',
  },
  {
    label:
      'Treatment poses risk of complications, less intense treatment will cause worsening',
    value: 'nfloc_teatment_poses',
  },
  {
    label:
      'Medications still need further optimization, discharging without making changes would lead to worsening symptoms and increase risk to self or others and would lead to rapid readmission',
    value: 'nfloc_medications',
  },
  {
    label:
      'Without developing further coping skills, less intense treatment will result in worsening and rapid deterioration',
    value: 'nfloc_without_developing',
  },
  {
    label:
      'Continues to receive as needed medications for agitation and increased risk of self harm or harm to others',
    value: 'nfloc_continues_to_receive',
  },

  //short term goals codeset
  { label: 'Decrease danger to self/others', value: 'stg_decrease_danger' },
  { label: 'Decrease severe symptoms', value: 'stg_decrease_severe_symptoms' },
  { label: 'Engage family', value: 'stg_engage_family' },
  { label: 'Stabilize on meds', value: 'stg_stabilize_on_meds' },
  { label: 'Safely detox', value: 'stg_safely_detox' },
  { label: 'Develop coping skills', value: 'stg_develop_coping_skills' },
  { label: 'Other', value: 'stg_other' },

  //precautions codeset
  { label: 'Suicide', value: 'precautions_suicide' },
  { label: 'Elopement', value: 'precautions_elopement' },
  { label: 'Falls', value: 'precautions_falls' },
  { label: 'Seizure', value: 'precautions_seizure' },
  { label: 'q15 min', value: 'precautions_q15_min' },
  { label: '1:1 obs', value: 'precautions_1:1_obs' },
  { label: 'Other', value: 'precautions_other' },

  //dc plan codeset
  { label: 'PHP', value: 'dcplan_php' },
  { label: 'IOP', value: 'dcplan_iop' },
  { label: 'Residential', value: 'dcplan_residential' },
  { label: 'Output Provider', value: 'dcplan_output_provider' },
  { label: 'Other', value: 'dcplan_other' },
]

export { HospitalInitialPrefixes, HospitalInitialFieldMapping }
