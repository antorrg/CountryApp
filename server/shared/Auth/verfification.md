

# Cómo funciona normalmente la verificación por email:

1. Cuando un usuario se registra, creas un **token único de verificación** (puede ser un JWT o un token aleatorio).
2. Guardas ese token en la base de datos o lo codificas en el propio JWT con un tiempo de expiración corto (por ejemplo 1 hora).
3. Envías un email al usuario con un enlace que incluye ese token, algo así:
   `https://tu-dominio.com/verify-email?token=TOKEN_GENERADO`
4. Cuando el usuario hace clic en ese enlace, tu servidor recibe el token, lo verifica y si es válido, activa el usuario (por ejemplo, poniendo `isVerify = true`).
5. Si el token es inválido o expiró, informas al usuario que el enlace no es válido y quizás permites reenviar otro email.

---

## Ejemplo básico para tu API

### 1. Generar token de verificación

Podrías crear un token JWT que incluya el id del usuario y un flag específico para verificación, con expiración corta (ej. 1 hora):

```js
import pkg from 'jsonwebtoken'
import env from '../../Configs/envConfig.js'

function generateEmailVerificationToken(userId) {
  return pkg.sign(
    { userId, type: 'emailVerification' }, 
    env.Secret, 
    { expiresIn: '1h' }
  );
}
```

---

### 2. Enviar email con enlace

Usa un servicio de email (nodemailer, SendGrid, etc.) para enviar el link:

```js
async function sendVerificationEmail(userEmail, token) {
  const verificationUrl = `https://tu-dominio.com/verify-email?token=${token}`;
  
  // Aquí va tu código para enviar email, por ejemplo con nodemailer
  // El contenido del email debe incluir el verificationUrl para que el usuario haga click

  // Ejemplo mínimo:
  console.log(`Enviar email a ${userEmail} con link: ${verificationUrl}`);
}
```

---

### 3. Endpoint para verificar token

En tu backend defines ruta tipo:

```js
import pkg from 'jsonwebtoken'

app.get('/verify-email', async (req, res, next) => {
  const token = req.query.token;

  if (!token) return res.status(400).send('Token missing.');

  try {
    const decoded = pkg.verify(token, env.Secret);

    if (decoded.type !== 'emailVerification') {
      return res.status(400).send('Invalid token type.');
    }

    const userId = decoded.userId;

    // Actualizar usuario: marcar como verificado
    await User.findByIdAndUpdate(userId, { isVerify: true });

    res.send('Email verified successfully!');

  } catch (error) {
    res.status(400).send('Invalid or expired token.');
  }
});
```

---

### 4. En tu flujo de creación de usuario

* Guardas usuario con `isVerify: false`.
* Generas token con `generateEmailVerificationToken(user.id)`.
* Envías email con `sendVerificationEmail(user.email, token)`.

---

## ¿Quieres que te arme el código completo para integrar en tu clase `Auth` o en otro módulo?

También puedo ayudarte con el envío de emails usando `nodemailer` o servicios externos.

Solo dime qué prefieres, y cómo quieres manejarlo.
<hr>

Perfecto, entonces te armo un diseño para que lo integres en tu clase `Auth` como métodos estáticos, siguiendo tu estilo actual.

Aquí va una propuesta que incluye generación de token de verificación, envío (con nodemailer) y verificación desde un endpoint:

```js
import pkg from 'jsonwebtoken'
import nodemailer from 'nodemailer'
import env from '../../Configs/envConfig.js'
import User from '../models/User.js' // ajusta ruta según corresponda
import eh from '../../Configs/errorHandlers.js'

export default class Auth {

  // ...tus métodos actuales (generateToken, verifyToken, etc)

  // Generar token específico para verificación de email (expira en 1h)
  static generateEmailVerificationToken(userId) {
    return pkg.sign(
      { userId, type: 'emailVerification' }, 
      env.Secret, 
      { expiresIn: '1h' }
    )
  }

  // Enviar email de verificación con link
  static async sendVerificationEmail(userEmail, token) {
    const verificationUrl = `${env.Host}/verify-email?token=${token}`

    // Configura el transporter (puedes usar SMTP o servicios tipo Gmail, SendGrid, etc)
    const transporter = nodemailer.createTransport({
      host: env.SMTPHost,
      port: env.SMTPPort,
      secure: env.SMTPPort === 465, // true para 465, false para otros puertos
      auth: {
        user: env.SMTPUser,
        pass: env.SMTPPass,
      },
    })

    // Opciones del email
    const mailOptions = {
      from: `"No Reply" <${env.SMTPUser}>`,
      to: userEmail,
      subject: 'Email Verification',
      html: `
        <p>Please verify your email clicking the link below:</p>
        <a href="${verificationUrl}">${verificationUrl}</a>
        <p>This link expires in 1 hour.</p>
      `,
    }

    // Enviar email
    await transporter.sendMail(mailOptions)
  }

  // Middleware para verificar token en la ruta de verificación
  static async verifyEmailToken(req, res, next) {
    const token = req.query.token
    if (!token) return res.status(400).send('Verification token missing.')

    try {
      const decoded = pkg.verify(token, env.Secret)
      if (decoded.type !== 'emailVerification') {
        return res.status(400).send('Invalid token type.')
      }

      const userId = decoded.userId

      // Actualizar el usuario para marcar como verificado
      const user = await User.findById(userId)
      if (!user) return res.status(404).send('User not found.')
      if (user.isVerify) return res.send('User already verified.')

      user.isVerify = true
      await user.save()

      res.send('Email verified successfully!')

    } catch (error) {
      return res.status(400).send('Invalid or expired token.')
    }
  }

}
```

---

### Qué necesitarías configurar en `envConfig.js`:

```js
export default {
  Secret: 'tu_secret_jwt',
  ExpiresIn: 2,  // por ejemplo, horas para otros tokens
  Host: 'https://tu-dominio.com',  // dominio donde estará la app
  SMTPHost: 'smtp.tu-proveedor.com',
  SMTPPort: 587,
  SMTPUser: 'usuario@tu-dominio.com',
  SMTPPass: 'tu_contraseña_smtp',
}
```

---

### En tu router podrías usar:

```js
import Auth from './path/to/Auth.js'

app.get('/verify-email', Auth.verifyEmailToken)
```

---

### Y en el registro de usuario (o después de crear):

```js
const user = await User.create({ ...datos, isVerify: false })
const token = Auth.generateEmailVerificationToken(user.id)
await Auth.sendVerificationEmail(user.email, token)
```

---

¿Quieres que te ayude a armar la parte del envío de email con nodemailer para que puedas probar? ¿O prefieres integrar otro servicio de correo?
También dime si quieres ayuda para la ruta completa del frontend que reciba el click y muestre algo bonito.
