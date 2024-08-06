import { format, parseISO } from "date-fns"
import { SlotsTable } from "../../types"

interface day {
    date: string
    monthDay:string
    day: string
}
const extractDay = (dateString: string) => {
    const date = parseISO(dateString)
    const dayOfWeek = format(date, 'EEE')
    return dayOfWeek
}

const extractMonthDay = (dateString: string) => {
    const date = parseISO(dateString)
    const monthDay = format(date, 'MM/dd')
    return monthDay
}

const currentWeekTotalSlots = (days: day[], slots: SlotsTable) => {
    let total = 0

    for (let i = 0; i < days.length/2; i++) {
        const day = days[i]
        total += slots[`${day.day}${day.monthDay}`].length
    }
    return total
}

const nextWeekTotalSlots = (days: day[], slots: SlotsTable) => {
    let total = 0

    for (let i = days.length/2; i < days.length; i++) {
        const day = days[i]
        total += slots[`${day.day}${day.monthDay}`].length
    }
    return total
}

export { extractDay, extractMonthDay, currentWeekTotalSlots, nextWeekTotalSlots }