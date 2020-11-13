let baseUrl = ''

if (process.env.NODE_ENV === 'development') {
  baseUrl = 'https://api.arena.shabloool.co.il'
} else if (process.env.NODE_ENV === 'production') {
}

export const API_ENDPOINTS = {
  LOGIN: {
    SIGN_IN: `${baseUrl}/auth/login`,
    LOST_PASSWORD: `${baseUrl}/auth/lost-password `,
  },
  ACCOUNT: {
    GET_ACCOUNTS: `${baseUrl}/accounts?limit=<LIMIT>&offset=<OFFSET>&search=<SEARCH_PARM>`,
    SEARCH_ACCOUNTS: `${baseUrl}/accounts?search=<SEARCH_PARM>`,
    GET_USER_ACCOUNT: `${baseUrl}/accounts/<ACT_ID>`,
    POST_ACCOUNT: `${baseUrl}/accounts`,
    GET_USERS: `${baseUrl}/users?search=<USER_NAME>`,
    EDIT_ACCOUNT: `${baseUrl}/accounts/<ACT_ID>`
  },
  USER: {
    GET_USERS: `${baseUrl}/users?limit=<LIMIT>&offset=<OFFSET>&search=<SEARCH_PARM>`,
    SEARCH_USERS: `${baseUrl}/users?search=<SEARCH_PARM>`,
    SEARCH_USERS_ACCOUNT: `${baseUrl}/accounts/<ACCOUNT_ID>/users?limit=<LIMIT>&offset=<OFFSET>`,
    POST_USER: `${baseUrl}/users`,
    GET_SINGLE_USER: `${baseUrl}/users/<USER_ID>`,
    EDIT_USER: `${baseUrl}/users/<USER_ID>`,
    BLOCK_USER: `${baseUrl}/users/<USER_ID>/blocked`
  },
  MISC: {
    UPLOAD_IMAGE: `${baseUrl}/uploads/image`,
    UPLOAD_DOCUMENT: `${baseUrl}/uploads/document`,
    GET_COMMENTS: `${baseUrl}/subjects/<SUBJECT_ID>/comments`,
    DELETE_COMMENT: `${baseUrl}/comments/<COMMENT_ID>`
  },
  GROUPS: {
    POST_GROUPS: `${baseUrl}/groups`,
    SEARCH_GROUPS_BY_ACCOUNT_ID: `${baseUrl}/accounts/<ACCOUNT_ID>/groups?limit=<LIMIT>&offset=<OFFSET>&search=<SEARCH_PARM>`,
    GET_GROUP : `${baseUrl}/groups/<GROUP_ID>`,
    EDIT_GROUP: `${baseUrl}/groups/<GROUP_ID>`
  },
  CATEGORIES: {
    GET_CATEGORIES_BY_ACCOUNT_ID: `${baseUrl}/accounts/<ACCOUNT_ID>/categories?limit=<LIMIT>&offset=<OFFSET>&search=<SEARCH_PARM>`,
    POST_CATEGORIES: `${baseUrl}/categories`,
    GET_CATEGORIES_BY_ID: `${baseUrl}/categories/<CATEGORY_ID>`,
    EDIT_CATEGORY: `${baseUrl}/categories/<CATEGORY_ID>`
  },
  SUBJECTS: {
    GET_SUBJECTS_BY_ACCOUNT_ID: `${baseUrl}/accounts/<ACCOUNT_ID>/subjects?limit=<LIMIT>&offset=<OFFSET>&search=<SEARCH_PARM>`,
    POST_SUBJECT: `${baseUrl}/subjects`,
    GET_SUBJECT_BY_ID: `${baseUrl}/subjects/<SUBJECT_ID>`,
    EDIT_SUBJECT: `${baseUrl}/subjects/<SUBJECT_ID>`

  }
}