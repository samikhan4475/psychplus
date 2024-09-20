import { SecureMessageStatus } from "./types"

const getStatusColor = (status: SecureMessageStatus) => {
    switch (status) {
        case SecureMessageStatus.READ:
            return "gray"
        case SecureMessageStatus.REPLIED:
        case SecureMessageStatus.UNREAD:
            return "blue"
        default:
            return "gray";
    }
}

export {
    getStatusColor

}