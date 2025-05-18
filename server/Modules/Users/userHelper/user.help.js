
export const userCreate = [
  { name: 'email', type: 'string' },
  { name: 'password', type: 'string' } ]

export const userProfile = [
  { name: 'email', type: 'string' },
  { name: 'name', type: 'string' },
  { name: 'username', type: 'string' },
  { name: 'country', type: 'string' },
  { name: 'picture', type: 'string' }]

export const userUpgrade = [
  { name: 'enable', type: 'boolean' },
  { name: 'role', type: 'string' }]

export const verifyPassword = [
  { name: 'id', type: 'string' },
  { name: 'password', type: 'string' }]

export const changePassword = [
  { name: 'password', type: 'string' }]

export const userQueries = [
  { name: 'page', type: 'int', default: 1 },
  { name: 'limit', type: 'int', default: 5 },
  { name: 'name', type: 'string', default:'' },
  { name: 'sort', type: 'string', default: 'asc' }
]

export const regexEmail = /^[^\s@]+@[^\s@]+\.[^\s@]+$/

export const regexPassword =/^(?=.*[A-Z])(?=.*\d)[A-Za-z\d@$!%*?&]{8,}$/
