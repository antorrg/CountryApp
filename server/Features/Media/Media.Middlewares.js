
export class MediaMiddlewares{
  static createMed = (req, res, next)=>{
    const { url, type, title }= req.body
    const { userId } = req.userInfo
    req.body = {
      url,
      type,
      title,
      userId,
      whereField: 'title'
    }
    next()
  }
}
