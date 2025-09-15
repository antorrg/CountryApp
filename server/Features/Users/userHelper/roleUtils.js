
const ROLE_CODES = {
  1: 'user',
  2: 'admin',
  3: 'manager',
  9: 'superadmin'
}

// Objeto inverso para convertir nombres a códigos
const ROLE_NAMES = {
  user: 1,
  admin: 2,
  manager: 3,
  superadmin: 9
}

/**
 * Convierte un código de rol numérico a su nombre en texto
 * @param {number} roleCode - Código numérico del rol
 * @param {string} defaultRole - Rol por defecto si no se encuentra el código
 * @returns {string} Nombre del rol o el valor por defecto
 */
export const roleToString = (roleCode, defaultRole = 'guest') => {
  return ROLE_CODES[Number(roleCode)] || defaultRole
}

/**
 * Convierte un nombre de rol en texto a su código numérico
 * @param {string} roleName - Nombre del rol
 * @param {number} defaultCode - Código por defecto si no se encuentra el nombre
 * @returns {number} Código numérico del rol o el valor por defecto
 */
export const roleToCode = (roleName, defaultCode = 1) => {
  const key = String(roleName).toLowerCase()
  return ROLE_NAMES[key] || defaultCode
}

export default {
  roleToString,
  roleToCode
}
