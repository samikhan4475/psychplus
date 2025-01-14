interface User {
    username:string
    date:string
    status:string
}

interface StatusWithUsers {
    status:string
    users:User[]
}

interface ForwardingMessage {
    staffName:string
    type:string
    role:string
    startDate: string
    endDate: string
    days: number
    tasks:string[]
    statusWithUsers: StatusWithUsers
}

export type { ForwardingMessage, StatusWithUsers }