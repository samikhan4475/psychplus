import { DateValue, today } from '@internationalized/date'

const calculateAge = (date?: string | Date) => {
  const today = new Date()
  const birthDate = new Date(date ?? '')
  const age =
    today.getFullYear() -
    birthDate.getFullYear() -
    (today.getMonth() - birthDate.getMonth() < 0 ||
    (today.getMonth() === birthDate.getMonth() &&
      today.getDate() < birthDate.getDate())
      ? 1
      : 0)

  return age
}

interface TimeInterval {
  label: string
  value: string
}

function generateTimeIntervals(): TimeInterval[] {
  const intervals: TimeInterval[] = []
  let time = '00.00'

  for (let r = 0; r < 100; r++) {
    const formattedTime = time.replace('.', ':')
    intervals.push({ label: formattedTime, value: formattedTime })

    if (time === '23.40') {
      break
    }

    time = (parseFloat(time) + parseFloat('0.20')).toFixed(2)

    if (time.includes('.60')) {
      const [hours] = time.split('.')
      const newHours = parseInt(hours) + 1
      time = (newHours < 10 ? '0' : '') + newHours + '.00'
    } else if (parseInt(time) < 10) {
      time = '0' + time
    }
  }

  return intervals
}

const isDatePriorTo30Days = (date: DateValue) => {
  const currentDate = today('UTC')
  const date30DaysAgo = currentDate.subtract({ days: 30 })
  const isPrior30Days = date.compare(date30DaysAgo) <= 0
  return isPrior30Days
}

export { calculateAge, generateTimeIntervals, isDatePriorTo30Days }
