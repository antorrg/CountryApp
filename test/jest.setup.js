import mongoose from 'mongoose';
import connectDB from '../server/Configs/database.js';
import Test from './baseHelperTest/modelTest.js'

// Inicializa la base de datos de MongoDB antes de las pruebas
async function initializeDatabase() {
  try {
    await connectDB();
    // Asegurarse de empezar en una BD vacía
    await mongoose.connection.dropDatabase();
      // Asegura que se creen los índices
  //await Test.syncIndexes()
  console.log('Índices sincronizados')
    console.log('Base de datos MongoDB inicializada correctamente ✔️');
  } catch (error) {
    console.error('Error inicializando DB MongoDB ❌', error);
  }
}

// Resetea la base de datos antes de cada prueba si es necesario
export async function resetDatabase() {
  try {
    await mongoose.connection.dropDatabase();
    console.log('Base de datos MongoDB reseteada ✔️');
  } catch (error) {
    console.error('Error reseteando MongoDB ❌', error);
  }
}

beforeAll(async () => {
  await initializeDatabase();
});

// afterEach(async () => {
//   // Opcional: limpiar tras cada test unitario
//   await resetDatabase();
// });

afterAll(async () => {
  try {
    await mongoose.disconnect();
    console.log('Conexión MongoDB cerrada ✔️');
  } catch (error) {
    console.error('Error cerrando conexión MongoDB ❌', error);
  }
});
