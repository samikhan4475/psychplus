export const RESULT_OPTIONS = [
    { label: 'Care discussed with patient', value: 'Care discussed with patient' },
    { label: 'Attempted Twice', value: 'Attempted Twice' },
    { label: 'Unable to contact pt within 2 days of DC', value: 'Unable to contact pt within 2 days of DC', disablesFields: true },
    { label: 'Patient was discharged from ED', value: 'Patient was discharged from ED', disablesFields: true },
  ];
export const DISABLING_RESULTS = RESULT_OPTIONS.filter(option => option.disablesFields).map(option => option.value);
export const CHECK_BOX_RESULT = "Reviewed patients medical records and discharge medications"
  