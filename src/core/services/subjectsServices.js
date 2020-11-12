import http from 'axios';
import { API_ENDPOINTS } from '../constants/apiConstant'
import { handleResponse, handleError } from '../utility'
import { getAuthHeader } from "../utility/authHeader"

const GET_SUBJECTS_BY_ACCOUNT_ID = API_ENDPOINTS.SUBJECTS.GET_SUBJECTS_BY_ACCOUNT_ID
const POST_SUBJECT = API_ENDPOINTS.SUBJECTS.POST_SUBJECT
const GET_SUBJECT_BY_ID = API_ENDPOINTS.SUBJECTS.GET_SUBJECT_BY_ID
const EDIT_SUBJECT = API_ENDPOINTS.SUBJECTS.EDIT_SUBJECT

export function getSubjectsByAccountId(accountId, limit, offset, value) {
    const headers = getAuthHeader()
    const url = GET_SUBJECTS_BY_ACCOUNT_ID.replace("<ACCOUNT_ID>", accountId).replace("<SEARCH_PARM>", value).replace("<LIMIT>", limit).replace("<OFFSET>", offset)
    debugger
    return http.get(url, { headers })
}

export function postSubject(payload) {
    const headers = getAuthHeader()
    return http.post(POST_SUBJECT, payload, { headers })
}

export function fetchSubjectById(subjectId) {
    const headers = getAuthHeader()
    const url = GET_SUBJECT_BY_ID.replace("<SUBJECT_ID>", subjectId)
    debugger
    return http.get(url, { headers })
}

export function editSubject(payload, subjectId) {
    const headers = getAuthHeader()
    const url = EDIT_SUBJECT.replace("<SUBJECT_ID>", subjectId)
    debugger
    return http.put(url, payload, { headers })
}
