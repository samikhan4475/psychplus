import { ClinicAddress, LegalName, Metadata, } from "@/types"
import { Table, TableOptions, TableState, Updater } from "@tanstack/react-table"
import { Dispatch, ReactNode, SetStateAction } from "react"
import { SchemaType } from "./schema"
import { Tag } from "react-tag-autocomplete"

enum SecureMessagesTab {
    INBOX = 'Inbox',
    DRAFT = 'Draft',
    SENT = 'Sent',
    ARCHIVED = 'Archived',

}

enum ActiveComponent {
    NEW_EMAIL = 'new-email',
    COMPOSE_MAIL = "New Message",
    PREVIEW_EMAIL = 'preview-email',
    FORWARD = 'Forward',
    REPLY = 'Reply',
    REPLY_TO_ALL = 'Reply to all',
    DRAFT = 'Draft',
}

enum SendMode {
    EXTERNAL = 'EmrDirect',
    INTERNAL = 'Internal',
    SUCCESS = "Success",
    DRAFT = 'Draft',
}

enum SendType {
    SEND = 'Send',
}

enum ReceiverUserRole {
    STAFF = 'Staff',
    PATIENT = "Patient"
}

enum SecureMessageStatus {
    READ = 'READ',
    UNREAD = 'UNREAD',
    REPLIED = 'REPLIED',
    ARCHIVED = 'Archived',
}

enum EmailRecipientTypes {
    INTERNAL = 'Internal',
    EXTERNAL = 'EmrDirect',
    PATIENT = 'Patient',
    STAFF = 'Staff',
}
enum Staff {
    INTERNAL_EXTERNAL = 'INT/EXT Staff',
    INTERNAL = 'INT Staff',
    EXTERNAL = 'EXT Staff',
}
enum messageStatus {
    READ = 'read',
    UNREAD = 'unread',
    REPLIED = 'replied',
}
interface MetadataMapping extends Metadata {
    deletedOn: string
    deletedByFullName: string
    deletedBy: number
    createdOn: string
}

interface Name {
    firstName: string;
    middleName: string;
    lastName: string;
    preferredName: string;
    title: string;
    suffix: string;
    honors: string;
}


interface Channel {
    id: string;
    metadata: Metadata;
    recordStatus: string;
    receiverUserRole: string;
    receiverUserId: number | null;
    receiverEmail: string;
    receiverName: {
        firstName: string;
        middleName: string;
        lastName: string;
    };
    receiverUserType: string;
    messageId: string;
    receiverType: string;
    receiverStatus: string;
    sendMode: string;
    receiverStatusDetail: string;
    externalMessageId: string;
    externalEmail: string;
    readTimeStamp: string;
    isRead: boolean;
    isReplied: boolean;
};


interface Attachment {
    createdOn: string;
    createdBy: number;
    updatedOn: string;
    updatedBy: number;
    recordStatus: string;
    id: string;
    messageId: string;
    name: string;
    uri: string;
    size: number;
    mimeType: string;
    fileName: string;
    fileUrl: string;
    file: File;
    fileDescription: string;
}


interface SecureMessage {
    id: string;
    metadata: MetadataMapping;
    recordStatus: string;
    senderUserId: number;
    senderEmail: string;
    senderName: Name;
    senderUserRole: string;
    conversationId: string;
    externalEmailAddress: string;
    subject: string;
    text: string;
    messageStatus: string;
    isMessageSent: boolean;
    channels: Channel[];
    attachments: Attachment[];
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
    name?: string
    email?: string
    userType: string
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
    rowHover: string
}

type CustomTableOptions<T> = Omit<TableOptions<T>, 'meta'> & {
    meta: TableMeta
}

type CustomTable<T> = Table<T> & {
    options: CustomTableOptions<T> & {
        onStateChange: (updater: Updater<TableState>) => void
        renderFallbackValue: any
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
    activeTab: SecureMessagesTab,
    setActiveTab: (activeTab: SecureMessagesTab) => void,
    activeComponent: ActiveComponent,
    setActiveComponent: (activeComponent: ActiveComponent) => void,
    secureMessages: Partial<SecureMessage>[],
    setSecureMessages: (secureMessages: Partial<SecureMessage>[]) => void;
    previewSecureMessage: {
        secureMessage: Partial<SecureMessage> | null;
        activeTab: SecureMessagesTab;
    };
    setPreviewSecureMessage: (preview: { secureMessage: Partial<SecureMessage> | null; activeTab: SecureMessagesTab }) => void;
    loading: boolean
    error?: string
    formValues?: Partial<SchemaType>
    page: number
    pageCache: Record<number, SecureMessage[]>
    search: (
        formValues: Partial<SchemaType>,
        page?: number,
        reset?: boolean,
    ) => void
    next: () => void
    prev: () => void
    jumpToPage: (page: number) => void
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
    phoneNumbers: PhoneNumber[]
    addresses: ClinicAddress[]
    isMailingAddressSameAsPrimary: boolean
}
interface EmailRecipients {
    id: number
    metadata: MetadataMapping
    legalName: LegalName
    userRoleCode: string
    contactInfo: ContactInfo
    staffId: number
    patientId: number
}
interface AttachmentsProps {
    attachments: Partial<Attachment>[];
    handleDeleteFile: (index?: number, messageId?: string, attachmentId?: string) => void;
}
interface FileTileProps {
    attachment: Partial<Attachment>
    viewMessage?: boolean
    handleDeleteFile: () => void
}
interface RichTextEditorWrapperProps {
    children: ReactNode
    attachments: Partial<Attachment>[]
    setAttachments: Dispatch<SetStateAction<Partial<Attachment>[]>>
}
interface AttachmentProps {
    attachments: Partial<Attachment>[]
    setAttachments: Dispatch<SetStateAction<Partial<Attachment>[]>>
}
interface InternalRecipientProps {
    internalRecipientsTag: Tag[]
    setInternalRecipientsTag: Dispatch<SetStateAction<Tag[]>>
    internalEmailSuggestions: EmailRecipients[] | Channel[]
    setInternalEmailSuggestions: Dispatch<SetStateAction<EmailRecipients[] | Channel[]>>
}
interface UserRecipientProps {
    userRecipientsTag: Tag[]
    setUserRecipientsTag: Dispatch<SetStateAction<Tag[]>>
    userEmailSuggestions: EmailRecipients[] | Channel[]
    setUserEmailSuggestions: Dispatch<SetStateAction<EmailRecipients[] | Channel[]>>
}
interface ExternalRecipientProps {
    externalRecipientsTag: Tag[]
    setExternalRecipientsTag: Dispatch<SetStateAction<Tag[]>>
    externalEmailSuggestions: Tag[]
    setExternalEmailSuggestions: Dispatch<SetStateAction<Tag[]>>
}
interface ActiveTabPops {
    setActiveTab: Dispatch<SetStateAction<SecureMessagesTab>>
    activeTab: SecureMessagesTab
}

interface SecureMessagesAttachmentsParams {
    data: FormData
    messageId: string
    attachmentId: string
}
interface AttachmentsParams {
    messageId: string
    fileName: string
    fileDescription: string
    fileUrl: string
    mimeType: string
}

export {
    type UserRecipientProps,
    type ExternalRecipientProps,
    type InternalRecipientProps,
    type AttachmentProps,
    type SecureMessagesAttachmentsParams,
    type RichTextEditorWrapperProps,
    type FileTileProps,
    type ActiveTabPops,
    type AttachmentsProps,
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
    type AttachmentsParams,
    SecureMessageStatus,
    SecureMessagesTab,
    ActiveComponent,
    EmailRecipientTypes,
    SendMode,
    ReceiverUserRole,
    messageStatus,
    SendType,
    Staff,
}
