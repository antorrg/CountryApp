let token = ''
let AdminToken = ''
let userId = ''
let expId = ''
let countryId = ''

export const setToken = (newToken) => {
  token = newToken
}

export const getToken = () => {
  return token
}
export const setEmailToken = (newToken) => {
  AdminToken = newToken
}

export const getEmailToken = () => {
  return AdminToken 
}
export const setExpId = (newid) => {
  expId = newid
}

export const getExpId = () => {
  return expId 
}
export const setCountryId = (newid) => {
  countryId = newid
}

export const getCountryId = () => {
  return countryId
}
export const setUserId = (newid) => {
  userId = newid
}

export const getUserId = () => {
  return userId
}
