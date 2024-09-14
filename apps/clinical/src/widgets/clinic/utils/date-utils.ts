import { format, parseISO } from "date-fns"
import { AppointmentDate } from "../types"
import { toZonedTime } from "date-fns-tz"
import { SlotsByDay } from "../types"

const extractTime = (dateString: string, timezone:string) => {
    const zonedDate = toZonedTime(dateString, timezone)
    const formattedTime = format(zonedDate, 'HH:mm')
    return formattedTime
}

const extractDate = (dateString: string, timezone: string) => {
    const zonedDate = toZonedTime(dateString, timezone)
    const formattedDate = format(zonedDate, 'MM/dd')
    return formattedDate
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

const currentWeekTotalSlots = (days: AppointmentDate[], slots: SlotsByDay) => {
    let total = 0

    for (let i = 0; i < days.length/2; i++) {
        const day = days[i]
        total += slots[`${day.monthAndDay}`]?.length || 0
    }
    return total
}

const nextWeekTotalSlots = (days: AppointmentDate[], slots: SlotsByDay) => {
    let total = 0

    for (let i = days.length/2; i < days.length; i++) {
        const day = days[i]
        total += slots[`${day.monthAndDay}`]?.length || 0
    }
    return total
}

export { extractDay, extractMonthDay, currentWeekTotalSlots, nextWeekTotalSlots, extractTime, extractDate }