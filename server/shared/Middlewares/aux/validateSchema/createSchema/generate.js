import inquirer from "inquirer";


export default async function promptForField(){
  const field = {}

  const { name } = await inquirer.prompt({
    type: 'input',
    name: 'name',
    message: 'Nombre del campo:'
  })

  const { kind } = await inquirer.prompt({
    type: 'list',
    name: 'kind',
    message: `Tipo de campo "${name}":`,
    choices: ['string', 'int', 'float', 'boolean', 'object', 'array']
  })

  if (['string', 'int', 'float', 'boolean'].includes(kind)) {
    const fieldConfig = { type: kind }

    const { isOptional } = await inquirer.prompt({
      type: 'confirm',
      name: 'isOptional',
      message: '¿Es opcional?',
      default: false
    })

    const { hasDefault } = await inquirer.prompt({
      type: 'confirm',
      name: 'hasDefault',
      message: '¿Querés establecer un valor por defecto?',
      default: false
    })

    if (hasDefault) {
      const { defaultValue } = await inquirer.prompt({
        type: 'input',
        name: 'defaultValue',
        message: 'Valor por defecto:',
        validate: input => input.length > 0
      })

      // parsear según tipo
      fieldConfig.default =
        kind === 'int' ? parseInt(defaultValue) :
        kind === 'float' ? parseFloat(defaultValue) :
        kind === 'boolean' ? defaultValue === 'true' :
        defaultValue
    }

    if (isOptional) {
      fieldConfig.optional = true
    }

    field[name] = fieldConfig
    return field
  }

  if (kind === 'object') {
    const subfields = {}
    let addMore = true
    while (addMore) {
      const child = await promptForField()
      Object.assign(subfields, child)
      const { cont } = await inquirer.prompt({
        type: 'confirm',
        name: 'cont',
        message: '¿Agregar otro campo dentro del objeto?',
        default: true
      })
      addMore = cont
    }
    field[name] = subfields
    return field
  }

  if (kind === 'array') {
    const { itemType } = await inquirer.prompt({
      type: 'list',
      name: 'itemType',
      message: '¿Tipo de elementos del array?',
      choices: ['string', 'int', 'float', 'boolean', 'object']
    })

    if (itemType === 'object') {
      const subfields = {}
      let addMore = true
      while (addMore) {
        const child = await promptForField()
        Object.assign(subfields, child)
        const { cont } = await inquirer.prompt({
          type: 'confirm',
          name: 'cont',
          message: '¿Agregar otro campo al objeto dentro del array?',
          default: true
        })
        addMore = cont
      }
      field[name] = [subfields]
    } else {
      field[name] = [{ type: itemType }]
    }
    return field
  }
}
