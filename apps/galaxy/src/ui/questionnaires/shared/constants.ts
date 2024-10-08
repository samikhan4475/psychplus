const LABELS = [
  'Over the last two weeks, how often have you been bothered by any of the following problems?',
  'Not at all',
  'Some days',
  'More than half the days',
  'Nearly every day',
]

const SCORE_INTERPRETATION_RANGES = [
  { label: 'No Anxiety', color: 'white', min: 0, max: 4 },
  { label: 'Mild Anxiety', color: 'green', min: 5, max: 9 },
  { label: 'Moderate Anxiety', color: 'yellow', min: 10, max: 14 },
  { label: 'Severe Anxiety', color: 'red', min: 15, max: 21 },
]

const CLASSNAME_HEADER_CELL =
  'bg-pp-focus-bg align-middle border-pp-table-border h-5 border px-[50px] py-0'

const CLASSNAME_CELL =
  'align-middle border-pp-table-border h-5 border pl-[10px] py-0.5 border-t-0 border-r-0 last:border-r'

export {
  SCORE_INTERPRETATION_RANGES,
  LABELS,
  CLASSNAME_HEADER_CELL,
  CLASSNAME_CELL,
}
