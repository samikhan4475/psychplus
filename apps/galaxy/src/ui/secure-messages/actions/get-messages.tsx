import * as api from '@/api'
import { SecureMessage } from '../types'

const getAllSecureMessagesAction = async ({
  ...rest
}): Promise<api.ActionResult<SecureMessage[]>> => {
  const response = await mockFetchAllSecureMessages()
  if (response.state === 'error') {
    return {
      state: 'error',
      error: response.error,
    }
  }
  return {
    state: 'success',
    data: response.data,
  }
}

const mockFetchAllSecureMessages = async (): Promise<
  api.NetworkResult<SecureMessage[]>
> => {
  return new Promise((resolve) => {
    setTimeout(() => {
      resolve({
        headers: new Headers({}),
        state: 'success',
        data: [
          ...Array(7)
            .fill(null)
            .map((item, index) => ({
              id: '3fa85f64-5717-4562-b3fc-2c963f66afa6' + index,
              metadata: {
                createdOn: '2024-09-16T11:30:10.310Z',
                createdBy: 0,
                createdByFullName: 'Ronald Richards',
                updatedOn: '2024-09-16T11:30:10.310Z',
                updatedBy: 0,
                updatedByFullName: 'string',
                deletedOn: '2024-09-16T11:30:10.310Z',
                deletedBy: 0,
                deletedByFullName: 'string',
              },
              recordStatus: 'Active',
              senderUserId: 0,
              conversationId: '3fa85f64-5717-4562-b3fc-2c963f66afa6',
              externalEmailAddress: 'john@psychplus.com',
              subject: 'Treatment Options and Plans ' + (index + 1),
              text: `Dear Dr. John Smith,

I hope this email finds you well. I am reaching out to discuss a patient case that I believe could benefit from your expertise.
I recently saw a patient, [Patient's Name], who presents with [brief description of patient's condition or symptoms]. After conducting a thorough examination and reviewing their medical history, I have identified [diagnosis or preliminary assessment].

Given the complexity of the case and considering your specialization in [mention recipient's area of expertise], I believe that involving you in the patient's care would greatly contribute to their treatment plan and overall well-being.`,
              messageStatus: 'Success',
              isMessageSent: true,
              channels: [
                {
                  createdOn: '2024-09-16T11:30:10.310Z',
                  createdBy: 0,
                  updatedOn: '2024-09-16T11:30:10.310Z',
                  updatedBy: 0,
                  recordStatus: 'Active',
                  id: '3fa85f64-5717-4562-b3fc-2c963f66afa6',
                  receiverUserId: 0,
                  messageId: '3fa85f64-5717-4562-b3fc-2c963f66afa6',
                  receiverType: 'MAIN',
                  receiverStatus: 'Dispatch',
                  sendMode: 'EXT Staff',
                  receiverStatusDetail: 'string',
                  externalMessageId: 'string',
                  externalEmail: 'john@psychplus.com',
                  readTimeStamp: '2024-09-16T11:30:10.310Z',
                  isRead: true,
                  isReplied: true,
                },
              ],
              attachments: [
                {
                  createdOn: '2024-09-16T11:30:10.310Z',
                  createdBy: 0,
                  updatedOn: '2024-09-16T11:30:10.310Z',
                  updatedBy: 0,
                  recordStatus: 'Active',
                  id: '3fa85f64-5717-4562-b3fc-2c963f66afa6',
                  messageId: '3fa85f64-5717-4562-b3fc-2c963f66afa6',
                  name: 'Result Report',
                  uri: 'string',
                  size: 2000,
                  mimeType: 'string',
                  fileDescription: 'string',
                },
              ],
            })),
        ],
      })
    }, 2000)
  })
}

export { getAllSecureMessagesAction }
