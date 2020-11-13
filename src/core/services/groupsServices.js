import http from 'axios';
import { API_ENDPOINTS } from '../constants/apiConstant'
import { handleResponse, handleError } from '../utility'
import { getAuthHeader } from "../utility/authHeader"
const POST_GROUPS = API_ENDPOINTS.GROUPS.POST_GROUPS;
const SEARCH_GROUPS_BY_ACCOUNT_ID = API_ENDPOINTS.GROUPS.SEARCH_GROUPS_BY_ACCOUNT_ID
const GET_GROUP = API_ENDPOINTS.GROUPS.GET_GROUP
const EDIT_GROUP = API_ENDPOINTS.GROUPS.EDIT_GROUP



export function postGroups(payload) {
    const headers = getAuthHeader()
    return http.post(POST_GROUPS, payload, { headers })
}

export function searchGroupByAccountId(value, accountId, limit, offset) {
    const headers = getAuthHeader()
    const url = SEARCH_GROUPS_BY_ACCOUNT_ID.replace("<ACCOUNT_ID>", accountId).replace("<SEARCH_PARM>", value).replace("<LIMIT>", limit).replace("<OFFSET>", offset)
    
    return http.get(url, { headers })
}

export function fetchGroupData(groupId) {
    const headers = getAuthHeader()
    const url = GET_GROUP.replace("<GROUP_ID>", groupId)
    
    return http.get(url, { headers })
}

export function editGroup(payload, groupId) {
    const headers = getAuthHeader()
    const url = EDIT_GROUP.replace("<GROUP_ID>", groupId)

    return http.post(url, payload, { headers })
}