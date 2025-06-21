let token = ''
let AdminToken = ''
let userId = ''

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
export const setId = (newid) => {
  userId = newid
}

export const getId = () => {
  return userId
}
