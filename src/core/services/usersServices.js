import http from 'axios';
import { API_ENDPOINTS } from '../constants/apiConstant'
import { handleResponse, handleError } from '../utility'
import { getAuthHeader } from "../utility/authHeader"
const GET_USERS = API_ENDPOINTS.USER.GET_USERS;
const POST_USER = API_ENDPOINTS.USER.POST_USER;
const GET_SINGLE_USER = API_ENDPOINTS.USER.GET_SINGLE_USER;
const EDIT_USER = API_ENDPOINTS.USER.EDIT_USER;
const BLOCK_USER = API_ENDPOINTS.USER.BLOCK_USER;
const SEARCH_USER = API_ENDPOINTS.USER.SEARCH_USERS;
const SEARCH_USER_ACCOUNT = API_ENDPOINTS.USER.SEARCH_USERS_ACCOUNT;
const GET_ACCOUNT_ACTIVITY_USERS = API_ENDPOINTS.USER.GET_ACCOUNT_ACTIVITY_USERS

export function getUsers(limit, offset, seacrhPrm) {
    const headers = getAuthHeader()
    const url = GET_USERS.replace("<LIMIT>", limit).replace("<OFFSET>", offset).replace("<SEARCH_PARM>", seacrhPrm)
    return http.get(url, { headers })
}

export function searchUser(seacrhPrm) {
    const headers = getAuthHeader()
    const url = SEARCH_USER.replace("<SEARCH_PARM>", seacrhPrm)
    return http.get(url, { headers })
}

export function seacrUserByAccount(acntId, limit, offset) {
    const headers = getAuthHeader()
    const url = SEARCH_USER_ACCOUNT.replace("<LIMIT>", limit).replace("<OFFSET>", offset).replace("<ACCOUNT_ID>", acntId)
    return http.get(url, { headers })

}

export function postUsers(payload) {
    const headers = getAuthHeader()
    return http.post(POST_USER, payload, { headers })
}
export function getSingleUser(userId) {
    const headers = getAuthHeader()
    const url = GET_SINGLE_USER.replace("<USER_ID>", userId)
    return http.get(url, { headers })
}

export function editUser(userId, payload) {
    const headers = getAuthHeader()
    const url = GET_SINGLE_USER.replace("<USER_ID>", userId)
    return http.put(url, payload, { headers })
}

export function blockUser(payload, userId) {
    const headers = getAuthHeader()
    const url = BLOCK_USER.replace("<USER_ID>", userId)
    return http.post(url, payload, { headers })
}

export function getAccountActivityUsers(accountId, limit, offset, seacrhPrm) {
    debugger
    const headers = getAuthHeader()
    const url = GET_ACCOUNT_ACTIVITY_USERS.replace("<ACCOUNT_ID>", accountId).replace("<LIMIT>", limit).replace("<OFFSET>", offset).replace("<SEARCH_PARM>", seacrhPrm)
    return http.get(url, { headers })
}