import { ClinicAddress, LegalName, Metadata, } from "@/types"
import { Table, TableOptions, TableState, Updater } from "@tanstack/react-table"
import { Dispatch, SetStateAction } from "react"
import { SchemaType } from "./secure-messages-view"

enum SecureMessagesTab {
    ALL = 'Inbox',
    DRAFT = 'Draft',
    SENT = 'Sent',
    ARCHIVED = 'Archived',
}

enum ActiveComponent {
    NEW_EMAIL = 'new-email',
    PREVIEW_EMAIL = 'preview-email',
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

interface MetadataMapping extends Metadata {
    deletedOn: string
    deletedByFullName: string
    deletedBy: number
}

interface MetadataMapping extends Metadata {
    deletedOn: string
    deletedByFullName: string
    deletedBy: number
}
interface SecureMessage {
    id?: string
    senderUserId?: number
    conversationId?: string
    metadata?: MetadataMapping
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
    metadata: MetadataMapping
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
    metadata: MetadataMapping
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
    size: number
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
    previewSecureMessage: SecureMessage | null
    setPreviewSecureMessage: (value: SecureMessage | null) => void
    loading?: boolean
    error?: string
    fetch: (page?: number, reset?: boolean) => void
    formValues?: Partial<SchemaType>
}



type SecureMessageStoreType = SecureMessageStore

interface PhoneNumber {
    type: string
    number: string
    extension: string
    comment: string
}
interface ContactInfo {
    email: string
    emailVerificationStatus: string
    phoneNumbers?: PhoneNumber[]
    addresses: ClinicAddress[]
    isMailingAddressSameAsPrimary: boolean
}
interface LegalNameMapping extends LegalName {
    suffix: string
}
interface EmailRecipients {
    id: number
    metadata: MetadataMapping
    legalName: LegalNameMapping
    userRoleCode: string
    contactInfo: ContactInfo
    staffId: number
    patientId: number
}
interface ActiveComponentProps {
    setActiveComponent: Dispatch<SetStateAction<ActiveComponent>>
    activeComponent?: ActiveComponent
}
interface AttachmentsProps {
    attachments: File[];
    handleDeleteFile: (index: number) => void;
    activeComponent?: ActiveComponent
}
interface FileTileProps {
    attachment: Attachment | File
    handleDeleteFile: () => void
    activeComponent?: ActiveComponent
}
interface ViewMessageAttachmentProps {
    previewSecureMessage?: SecureMessage | null
    handleDeleteFile: (index: number) => void
    activeComponent?: ActiveComponent
}
export {
    type ViewMessageAttachmentProps,
    type FileTileProps,
    type AttachmentsProps,
    type ActiveComponentProps,
    type EmailRecipients,
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
}
