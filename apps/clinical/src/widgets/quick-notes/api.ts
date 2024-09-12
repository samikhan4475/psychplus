import { handleRequest } from '@psychplus/utils/api'
import { createHeaders } from '@psychplus/utils/client'
import { Order } from './types'
import { LabOrders } from '@psychplus/lab-orders/types'

const getQuickNotesContentData = (request: string) =>
    handleRequest(
        fetch(
            `/api/codeset/authorities/PsychPlusPublic/codesets/${request}?includeExtraDetails=true`,
            {
                method: 'POST',
                body: JSON.stringify(request),
                headers: createHeaders(),
            },
        ),
    )
const getOrdersData = (
    appointmentId: number,
    payload: LabOrders,
    offset = 0, limit = 0,
): Promise<Order[]> =>
    handleRequest(
        fetch(
            `/galaxy/api/appointments/${appointmentId}/laborders/actions/search?offset=${offset}&limit=${limit}`,
            {
                method: 'POST',
                body: JSON.stringify(payload || {}),
                cache: 'no-store',
                headers: createHeaders(),
            },
        ),
    )
export { getQuickNotesContentData, getOrdersData }
