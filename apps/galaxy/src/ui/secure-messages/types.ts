import { Table, TableOptions, TableState, Updater } from "@tanstack/react-table"

interface Metadata {
    createdOn: string
    createdBy: number
    createdByFullName: string
    updatedOn: string
    updatedBy: number
    updatedByFullName: string
    deletedOn: string
    deletedBy: number
    deletedByFullName: string
}
enum SecureMessagesTab {
    ALL = 'Inbox',
    DRAFT = 'Draft',
    SENT = 'Sent',
    ARCHIVED = 'Archived',
}

enum ActiveComponent {
    NEW_EMAIL = 'new-email',
    PREVIE_EMAIL = 'preview-email',
    COMPOSE_MAIL = 'compose-email',
}

enum SecureMessageStatus {
    READ = 'READ',
    UNREAD = 'UNREAD',
    REPLIED = 'REPLIED',
    ARCHIVED = 'ARCHIVED',
}

enum EmailRecipientTypes {
    STAFF = 'Staff',
    EXTERNAL = 'External',
    PATIENT = 'Patient',
}

enum SecureMessageType {
    NEW = 'New',
    FORWARD = 'Forward',
    REPLY = 'Reply',
}
interface SecureMessage {
    id?: string
    senderUserId?: number
    conversationId?: string
    metadata?: Metadata
    attachments?: Attachment[] | []
    channels?: Channel[] | []
    recordStatus: string
    subject: string
    text: string
    externalEmailAddress: string
    messageStatus: string
    isMessageSent: boolean
}

interface Channel {
    receiverStatus?: string
    sendMode?: string
    receiverStatusDetail?: string
    externalMessageId?: string
    externalEmail?: string
    updatedOn?: string
    updatedBy?: number
    recordStatus: string
    readTimeStamp?: string
    id: string
    receiverUserId: number
    messageId: string
    receiverType: string
    isRead: boolean
    isReplied: boolean
    createdOn: string
    createdBy: number
}

interface EmailPreview {
    id: string
    metadata: Metadata
    recordStatus: string
    receiverUserId: number
    messageId: string
    receiverType: string
    receiverStatus: string
    sendMode: string
    receiverStatusDetail: string
    externalMessageId: string
    externalEmail: string
    readTimeStamp: string
    isRead: boolean
    isReplied: boolean
}

interface ChannelMessageStatus {
    id: string
    metadata: Metadata
    recordStatus: string
    receiverUserId: number
    messageId: string
    receiverType: string
    receiverStatus: string
    sendMode: string
    receiverStatusDetail: string
    externalMessageId: string
    externalEmail: string
    readTimeStamp: string
    isRead: boolean
    isReplied: boolean
}

interface EmailRecipient {
    name: string
    email: string
    userType: string
}


interface Attachment {
    id: string
    messageId: string
    name: string
    uri: string
    mimeType: string
    fileDescription: string
    createdOn: string
    createdBy: number
    updatedOn: string
    updatedBy: number
    recordStatus: string
}
interface SecureMessageData {
    secureMessages: SecureMessage[]
    total: number
}
interface EmailPreviewTypes {
    emails: EmailPreview[]
    total: number
}
interface TableMeta {
    rowHover?: string // Adjust type as needed based on your row ID type
}

type CustomTableOptions<T> = Omit<TableOptions<T>, 'meta'> & {
    meta?: TableMeta
}

type CustomTable<T> = Table<T> & {
    options: CustomTableOptions<T> & {
        onStateChange: (updater: Updater<TableState>) => void
        renderFallbackValue?: any // Ensure this is optional if it's not required
    }
}
interface DataTableFooterProps {
    currentPage: number;
    totalPages: number;
    onPageChange: (page: number) => void;
    previousPage: () => void;
    nextPage: () => void;
}
interface SecureMessageStore {
    secureMessages: SecureMessage[],
    setSecureMessages: (secureMessages: SecureMessage[]) => void,
}



type SecureMessageStoreType = SecureMessageStore
export {
    type SecureMessageStoreType,
    type DataTableFooterProps,
    type CustomTable,
    type SecureMessageData,
    type SecureMessage,
    type EmailPreviewTypes,
    type EmailPreview,
    type ChannelMessageStatus,
    type EmailRecipient,
    type Attachment,
    type Channel,
    SecureMessageStatus,
    SecureMessagesTab,
    ActiveComponent,
    EmailRecipientTypes,
    SecureMessageType,
}
