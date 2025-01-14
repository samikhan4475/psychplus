interface ClinicTime {
    primaryState: string
    primaryLocation: string
    teleState: string
    service: string
    day: string
    recurrence: string
    timing: string
    startDate: string
    endDate: string
    bookingFrequency: string
    visitMedium: string
    ageGroup: string
    cosigner: string
    publicView: boolean
    status: string
}

interface ForwardingMessage {
    staffName:string
    type:string
    role:string
    startDate: string
    endDate: string
    days: number
    tasks:string[]
    status:string
}

export type { ClinicTime, ForwardingMessage }