import { Tag } from "react-tag-autocomplete"
import { Channel, EmailRecipients, EmailRecipientTypes, Staff } from "./types"

const bytesToMegaBytes = (bytes: number) => {
    const MB = bytes / (1024 * 1024)
    return MB.toFixed(2)
}
const getRecipientLabel = (channels: Array<{ sendMode?: string | EmailRecipientTypes }> = []) => {
    const hasInternal = channels?.some(
        (channel) => channel.sendMode === EmailRecipientTypes.INTERNAL,
    );

    const hasExternal = channels?.some(
        (channel) => channel.sendMode === EmailRecipientTypes.EXTERNAL,
    );

    if (hasInternal && hasExternal) {
        return Staff.INTERNAL_EXTERNAL;
    } else if (hasInternal) {
        return Staff.INTERNAL;
    } else if (hasExternal) {
        return Staff.EXTERNAL;
    }

    return '-';
};
const isEmailRecipient = (item: EmailRecipients | Tag): item is EmailRecipients => {
    return (item as EmailRecipients).id !== undefined;
};
const mapEmailData = ({
    emails,
    messageId,
    sendMode,
}: {
    emails: Partial<EmailRecipients>[] | Tag[];
    messageId?: string;
    sendMode?: string;
}): Partial<Channel>[] => {
    return (
        emails
            ?.filter((item): item is EmailRecipients | Tag => item !== undefined)
            .map((item) => {
                const receiverUserId = isEmailRecipient(item as EmailRecipients) ? (item as EmailRecipients).id : null;
                const externalEmail = isEmailRecipient(item as EmailRecipients)
                    ? (item as EmailRecipients)?.contactInfo?.email || ''
                    : String((item as Tag).value || '');

                return {
                    messageId,
                    recordStatus: 'Active',
                    receiverType: 'MAIN',
                    receiverStatus: 'Dispatch',
                    sendMode,
                    receiverUserId,
                    externalEmail,
                    readTimeStamp: new Date().toISOString(),
                    isRead: false,
                    isReplied: false,
                    receiverStatusDetail: 'string',
                    externalMessageId: 'string',
                };
            }) || []
    );
};
function splitName(fullName: string) {
    const [firstName, ...lastName] = fullName.trim().split(" ");
    return {
        firstName: firstName,
        lastName: lastName.join(" ")
    };
}
const getFullName = (
    firstName?: string,
    lastName?: string,
    externalEmail?: string,
) =>
    firstName && lastName ? `${firstName} ${lastName}` : externalEmail || '-'
function isEmail(keyword: string) {
    const emailRegex = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/;
    return emailRegex.test(keyword);
}
export { bytesToMegaBytes, mapEmailData, getRecipientLabel, splitName, getFullName, isEmail }