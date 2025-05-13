import env from '../../Configs/envConfig.js'

const swaggerOptions = {
  swaggerDefinition: {
    openapi: '3.0.0',
    info: {
      title: 'Countries',
      version: '1.0.0',
      description: 'Documentación de mi API Countries con Swagger. Este modelo es ilustrativo'
    },

    servers: [
      {
        url: `http://localhost:${env.Port}`
      }
    ]
    // components: {
    //   securitySchemes: {
    //     bearerAuth: {
    //       type: 'http',
    //       scheme: 'bearer',
    //       bearerFormat: 'JWT'
    //     }
    //   }
    // },
    // security: [
    //   {
    //     bearerAuth: []
    //   }
    // ]
  },
  apis: ['./server/shared/Swagger/schemas/user.jsdoc.js'], // Ruta a tus archivos de rutas
  swaggerOptions: {
    docExpansion: 'none' // 👈 Oculta todas las rutas al cargar
  }
}

export default swaggerOptions
