import { DateTime } from 'luxon'

export default function parseVisitDate (input) {
  let success = false
  let message = ''
  let results
  const dt = DateTime.fromISO(input, { setZone: true })

  if (dt.isValid) {
    success = true
    message = 'ok'
    results = dt.toJSDate() // objeto Date en UTC listo para guardar
  } else {
    success = false
    message = `[WARN] Invalid visitDate received: "${input}". Using now instead.`,
    results= new Date()
  }
  return {
    success,
    message,
    results
  }
}
