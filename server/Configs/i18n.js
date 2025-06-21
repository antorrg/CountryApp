import i18n from 'i18n'
import path from 'path'

console.log('direccion: ',path.join(process.cwd(), 'locales'))
i18n.configure({
  locales: ['en', 'es'],
  directory: path.join(process.cwd(), 'server/locales'),
  defaultLocale: 'es',
  autoReload: true,
  updateFiles: false,
  objectNotation: true,
  // 👇 esta línea permite detectar Accept-Language automáticamente
  header: 'accept-language'
})

export default i18n
