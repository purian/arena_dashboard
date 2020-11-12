import http from 'axios';
import { API_ENDPOINTS } from '../constants/apiConstant'
import { handleResponse, handleError } from '../utility'
import { getAuthHeader } from "../utility/authHeader"

const GET_CATEGORIES_BY_ACCOUNT_ID = API_ENDPOINTS.CATEGORIES.GET_CATEGORIES_BY_ACCOUNT_ID
const POST_CATEGORIES = API_ENDPOINTS.CATEGORIES.POST_CATEGORIES
const GET_CATEGORIES_BY_ID = API_ENDPOINTS.CATEGORIES.GET_CATEGORIES_BY_ID
const EDIT_CATEGORY = API_ENDPOINTS.CATEGORIES.EDIT_CATEGORY

export function fetchCategoryByAccountId(accountId, limit, offset, value) {
    const headers = getAuthHeader()
    const url = GET_CATEGORIES_BY_ACCOUNT_ID.replace("<ACCOUNT_ID>", accountId).replace("<SEARCH_PARM>", value).replace("<LIMIT>", limit).replace("<OFFSET>", offset)
    debugger
    return http.get(url, { headers })
}

export function postCategory(payload) {
    const headers = getAuthHeader()
    return http.post(POST_CATEGORIES, payload, { headers })
}

export function fetchCategoryById(categoryId) {
    const headers = getAuthHeader()
    const url = GET_CATEGORIES_BY_ID.replace("<CATEGORY_ID>", categoryId)
    debugger
    return http.get(url, { headers })
}

export function editCategory(payload, categoryId) {
    const headers = getAuthHeader()
    const url = EDIT_CATEGORY.replace("<CATEGORY_ID>", categoryId)
    debugger
    return http.put(url, payload, { headers })
}