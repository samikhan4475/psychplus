const QUESTIONS = [
  'Feeling nervous, anxious or on edge',
  'Not being able to stop or control worrying',
  'Worrying too much about different things',
  'Trouble relaxing',
  'Being so restless that it is hard to sit still',
  'Becoming easily annoyed or irritable',
  'Feeling afraid as if something awful might happen',
].map((question, index) => ({
  id: `Q${index + 1}`,
  question,
  value: 0,
  options: [
    { label: '0', value: '0' },
    { label: '+1', value: '1' },
    { label: '+2', value: '2' },
    { label: '+3', value: '3' },
  ],
}))

export { QUESTIONS }
