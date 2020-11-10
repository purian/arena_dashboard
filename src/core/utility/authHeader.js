import { getToken } from '../services/tokenServices'

export function getAuthHeader() {
    // return authorization header with jwt token
    const token = getToken()
    if (token) {
        return { 'Authorization': `Bearer ${token}` }
    } else {
        return {}
    }
}