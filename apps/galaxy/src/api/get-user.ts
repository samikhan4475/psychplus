
import { UserResponse } from '@/types'
import * as api from '@/api'

const getLoggedInUser = async () => {
    const response = await api.GET<UserResponse>(api.USER_ENDPOINT)

    if(response.state === 'error') {
        throw new Error(response.error)
    }

    return response.data
}

export {getLoggedInUser}