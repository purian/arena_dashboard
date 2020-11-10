import http from 'axios';
import { API_ENDPOINTS } from '../constants/apiConstant'
import { handleResponse, handleError } from '../utility'
import { getAuthHeader } from "../utility/authHeader"
const GET_ACCOUNTS = API_ENDPOINTS.ACCOUNT.GET_ACCOUNTS;
const GET_USER_ACCOUNTS = API_ENDPOINTS.ACCOUNT.GET_USER_ACCOUNT;
const GET_USERS = API_ENDPOINTS.ACCOUNT.GET_USERS;
const POST_ACCOUNT = API_ENDPOINTS.ACCOUNT.POST_ACCOUNT;
const EDIT_ACCOUNT = API_ENDPOINTS.ACCOUNT.EDIT_ACCOUNT;
const SEARCH_ACCOUNT = API_ENDPOINTS.ACCOUNT.SEARCH_ACCOUNTS;


export function getAccounts(limit, offset, seacrhPrm) {
    const headers = getAuthHeader()
    const url = GET_ACCOUNTS.replace("<LIMIT>", limit).replace("<OFFSET>", offset).replace("<SEARCH_PARM>", seacrhPrm)
    return http.get(url, { headers })
}

export function searchAccounts(seacrhPrm) {
    const headers = getAuthHeader()
    const url = SEARCH_ACCOUNT.replace("<SEARCH_PARM>", seacrhPrm)
    return http.get(url, { headers })
}

export function postAccounts(payload) {
    const headers = getAuthHeader()
    return http.post(POST_ACCOUNT, payload, { headers })
}

export function getAcntUsers(user) {
    const headers = getAuthHeader()
    const url = GET_USERS.replace("<USER_NAME>", user)
    return http.get(url, { headers })
}
export function editAccount(actId, payload) {
    const headers = getAuthHeader()
    const url = EDIT_ACCOUNT.replace("<ACT_ID>", actId)
    return http.put(url, payload, { headers })
}
export function getUserAccount(actId) {
    const headers = getAuthHeader()
    const url = GET_USER_ACCOUNTS.replace("<ACT_ID>", actId)
    return http.get(url, { headers })
}

