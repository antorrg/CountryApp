import fs from 'fs'
import path from 'path'

export function loadComponentSchemas (){
  const schemasDir = path.resolve(process.cwd(), 'server/shared/Swagger/schemas/components')
  const schemaFiles = fs.readdirSync(schemasDir).filter(file => file.endsWith('.json'))

  let components = {}

  for (const file of schemaFiles) {
    const schemaPath = path.join(schemasDir, file)
    const schemaContent = JSON.parse(fs.readFileSync(schemaPath, 'utf-8'))
    Object.assign(components, schemaContent)
  }
  return components
}
