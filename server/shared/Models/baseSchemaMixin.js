const baseSchemaFields = {
  enabled: { type: Boolean, default: true },
  deleted: { type: Boolean, default: false },
};

export function applyBaseSchema(schema) {
  schema.add(baseSchemaFields);

  // Garantiza que los campos estén siempre presentes
  schema.pre('save', function (next) {
    if (this.enabled === undefined) this.enabled = true;
    if (this.deleted === undefined) this.deleted = false;
    next();
  });

  // Método de instancia: soft delete
  schema.methods.softDelete = function () {
    this.deleted = true;
    this.enabled = false;
    return this.save();
  };

  // Método estático: encuentra solo activos
  schema.statics.findEnabled = function (filter = {}) {
    return this.find({ ...filter, enabled: true, deleted: false });
  };

  return schema;
}



// import mongoose from 'mongoose';

// const baseSchemaFields = {
//   enabled: { type: Boolean, default: true },
//   deleted: { type: Boolean, default: false },
// };

// export function applyBaseSchema(schema) {
//   schema.add(baseSchemaFields);

//   // Método de instancia: marca como eliminado
//   schema.methods.softDelete = function () {
//     this.deleted = true;
//     this.enabled = false;
//     return this.save();
//   };

//   // Método estático: encuentra solo documentos habilitados y no eliminados
//   schema.statics.findEnabled = function (filter = {}) {
//     return this.find({ ...filter, enabled: true, deleted: false });
//   };

//   return schema;
// }
