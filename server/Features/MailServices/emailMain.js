import fs from 'fs/promises'
import path from 'path'

const TEMPLATE_DIR = path.join(process.cwd(), 'emails') // carpeta con tus templates

// Función genérica para leer e inyectar variables
export async function getEmailTemplate (templateName, variables = {}) {
  const filePath = path.join(TEMPLATE_DIR, `${templateName}.html`)

  let html = await fs.readFile(filePath, 'utf-8')

  // Reemplazo simple de {{variable}} por su valor
  for (const [key, value] of Object.entries(variables)) {
    const regex = new RegExp(`{{\\s*${key}\\s*}}`, 'g') // soporta {{ variable }}
    html = html.replace(regex, value)
  }

  return html
}
