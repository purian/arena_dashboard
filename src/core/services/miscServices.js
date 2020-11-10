import http from 'axios'
import { handleError, handleResponse } from '../utility'
import { API_ENDPOINTS } from '../constants/apiConstant'
import { getAuthHeader } from "../utility/authHeader"

const API_ENDPOINT_EXPORT = API_ENDPOINTS.MISC.EXPORT_TO_EXEL
const API_ENDPOINT_LIST_CITIES = API_ENDPOINTS.MISC.GET_CITY_LIST
const API_ENDPOINT_LIST_STORES = API_ENDPOINTS.MISC.STORE_LIST
const API_ENDPOINT_LIST_INSPECTORS = API_ENDPOINTS.MISC.INSPECTOR_LIST
const UPLOAD_IMAGE = API_ENDPOINTS.MISC.UPLOAD_IMAGE;

export function exportToExel(payload) {
  return http.post(API_ENDPOINT_EXPORT, payload)
    .then(handleResponse)
    .catch(handleError)
}

export function listCities() {
  return http.get(API_ENDPOINT_LIST_CITIES)
    .then(handleResponse)
    .catch(handleError)
}

export function listStores(cityId) {
  const url = API_ENDPOINT_LIST_STORES.replace('<CITY_ID>', cityId)
  return http.get(url)
    .then(handleResponse)
    .catch(handleError)
}

export function listInspectors(cityId) {
  const url = API_ENDPOINT_LIST_INSPECTORS.replace('<CITY_ID>', cityId)
  return http.get(url)
    .then(handleResponse)
    .catch(handleError)
}
export function uploadImage(payload) {
  const headers = getAuthHeader()
  return http.post(UPLOAD_IMAGE, payload, { headers })
}