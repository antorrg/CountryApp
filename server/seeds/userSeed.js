import { userService } from '../Modules/Users/user.routes.js'
import User from '../shared/Models/user.js'
import env from '../Configs/envConfig.js'
import bcrypt from 'bcrypt'

export const userSeed = async ()=>{
  try {
    const data = {
      email: env.EmailAdmin,
      password: await bcrypt.hash(env.PassAdmin.trim(), 12),
      nickname: env.EmailAdmin.trim().split('@')[0],
      role: 9,
      picture : env.DefaultImg.trim(),
      isVerify: true,
      isRoot: true
    }
    const exists = await User.find()
    if (exists.length>0){
      console.log('The database document already contain users')
      return
    }
    await userService.create(data, 'email')
    console.log('User created successfully')
  } catch (error) {
    console.error('Error creating user: ', error)
  }
}
