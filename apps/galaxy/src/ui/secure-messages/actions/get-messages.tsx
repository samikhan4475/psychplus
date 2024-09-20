import * as api from '@/api'
import { SecureMessage } from '../types'

const getAllSecureMessagesAction = async (): Promise<
  api.ActionResult<SecureMessage[]>
> => {
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
            .map((item) => ({
              id: '3fa85f64-5717-4562-b3fc-2c963f66afa6',
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
              externalEmailAddress: 'string',
              subject: 'Treatment Options and Plans',
              text: 'Ronald Richards',
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
                  sendMode: 'EXt Staff',
                  receiverStatusDetail: 'string',
                  externalMessageId: 'string',
                  externalEmail: 'string',
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
                  name: 'sdfsdfsdfdf',
                  uri: 'string',
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

export { mockFetchAllSecureMessages, getAllSecureMessagesAction }
