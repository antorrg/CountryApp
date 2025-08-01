const schema = {
  name: { type: 'string' },                  // requerido
  active: { type: 'boolean', default: true }, // con valor por defecto
  nickname: { type: 'string', optional: true }, // opcional
  profile: {
    age: { type: 'int' },
    rating: { type: 'float', default: 0.0 }
  },
  tags: [{ type: 'string' }],
  addresses: [{
    street: { type: 'string' },
    number: { type: 'int' }
  }]
}
