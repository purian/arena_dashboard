import http from 'axios';
import { API_ENDPOINTS } from '../constants/apiConstant'
import { handleResponse, handleError } from '../utility'
import { clearToken, getToken } from './tokenServices'
import jwtDecode from 'jwt-decode'
const LOGIN = API_ENDPOINTS.LOGIN.SIGN_IN
const LOST_PASSWORD = API_ENDPOINTS.LOGIN.LOST_PASSWORD

export function login(payload) {
    return http.post(LOGIN, payload)
}

export function lostPassword(payload) {
    return http.post(LOST_PASSWORD, payload).then(handleResponse).catch(handleError)
}


export function logout() {
    clearToken()
}

function getDecodedToken() {
    const token = getToken()
    try {
        return jwtDecode(token)
    }
    catch{
        return null
    }
}

export function getRole() {
    const token = getDecodedToken()
    if (token) {
        const { userRole } = token
        return userRole
    }
    return null
}

export function getUserID() {
    const token = getDecodedToken()
    if (token) {
        const { userId } = token
        return userId
    }
    return null
}

export function getCityID() {
    const token = getDecodedToken()
    if (token) {
        const { cityId } = token
        return cityId
    }
    return null
}

//routes
export function getHomePage() {
    const role = getRole()
    const UserRoutes = ['SYSTEM_ADMIN']

    if (UserRoutes.includes(role)) {
        return '/admin/accounts'
    }
    return false
}

export function checkRoleIfValid(token){
    const role = jwtDecode(token)
    const UserRoutes = ['SYSTEM_ADMIN']
    debugger
    if (UserRoutes.includes(role?.userRole)) {
        return true
    }
    return false
}

export const RBAC_LINK = {
    UserRoutes: ['SYSTEM_ADMIN']

}

export function isValid() {
    const token = getToken()
    if (token) {
        try {
            const decoded = jwtDecode(token)
            const { exp } = decoded
            const currentTime = new Date().getTime() / 1000
            if (currentTime > exp) {
                clearToken()
                return false
            } else {
                return true
            }
        }
        catch {
            clearToken()
            return false
        }
    }


    return false
}