/**
* @swagger
* tags:
*   - name: Users
*     description: Operaciones relacionadas con users
 */

/**
* @swagger
* '/api/user':
*   post:
*     summary: Crear un nuevo user
*     tags: [Users]
*     requestBody:
*       required: true
*       content:
*         application/json:
*           schema:
*             type: object
*             required:
*                - email
*                - password
*                - 
*             properties:
*             email:
*               type: string
*               format: email
*               example: email ejemplo
*               description: Descripción de email
*             password:
*               type: string
*               example: password ejemplo
*               description: Descripción de password
*             :
*               type: string
*               example:  ejemplo
*               description: Descripción de 
*     responses:
*       201:
*         description: Creación exitosa
*         content:
*           application/json:
*             schema:
*               type: object
*               properties:
*                 success:
*                   type: boolean
*                 message:
*                   type: string
*                 results:
*                   $ref: '#/components/schemas/User'
 */

/**
* @swagger
* '/api/user':
*   get:
*     summary: Obtener todos los users
*     tags: [Users]
*     parameters:
*       - in: query
*         name: 
*         required: false
*         schema:
*           type: string
*         description: 
*     responses:
*       200:
*         description: Lista de users
*         content:
*           application/json:
*             schema:
*               type: array
*               items:
*                 $ref: '#/components/schemas/User'
 */

/**
* @swagger
* '/api/user/{id}':
*   get:
*     summary: Obtener un user por ID
*     tags: [Users]
*     parameters:
*       - in: path
*         name: id
*         required: true
*         schema:
*           type: string
*         description: Mongoose objectId
*     responses:
*       200:
*         description: user encontrado
*         content:
*           application/json:
*             schema:
*               $ref: '#/components/schemas/User'
*       404:
*         description: user no encontrado
 */

/**
* @swagger
* '/api/user/{id}':
*   put:
*     summary: Actualizar un user
*     tags: [Users]
*     parameters:
*       - in: path
*         name: id
*         required: true
*         schema:
*           type: string
*         description: Mongoose objectId
*     requestBody:
*       required: true
*       content:
*         application/json:
*           schema:
*             type: object
*             properties:
*             email:
*               type: string
*               format: email
*               example: email ejemplo
*               description: Descripción de email
*             password:
*               type: string
*               example: password ejemplo
*               description: Descripción de password
*             :
*               type: string
*               example:  ejemplo
*               description: Descripción de 
*     responses:
*       200:
*         description: Actualización exitosa
*       400:
*         description: Error de validación
 */

/**
* @swagger
* '/api/user/{id}':
*   delete:
*     summary: Eliminar un user
*     tags: [Users]
*     parameters:
*       - in: path
*         name: id
*         required: true
*         schema:
*           type: string
*         description: Mongoose objectId
*     responses:
*       200:
*         description: Eliminado correctamente
*       404:
*         description: user no encontrado
 */