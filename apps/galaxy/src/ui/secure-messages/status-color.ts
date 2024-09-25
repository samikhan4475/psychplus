import { SecureMessageStatus } from "./types"

const getStatusColor = (status: SecureMessageStatus) => {
    switch (status) {
        case SecureMessageStatus.READ:
        case SecureMessageStatus.REPLIED:
            return "gray"
        case SecureMessageStatus.UNREAD:
            return "blue"
        default:
            return "gray";
    }
}

export {
    getStatusColor
}