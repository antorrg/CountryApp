import eh from '../../../Configs/errorHandlers.js'

export class ExperienceSocialMethods {

  static async addLike (Experience , experienceId, userId) {
    const experience = await Experience.findById(experienceId)
    if (!experience) eh.throwError('Experience not found', 404)

    // Quitar dislike si existe
    experience.reactions.dislikes = experience.reactions.dislikes.filter(
      r => r.userId.toString() !== userId
    )
    // Agregar like si no existe
    if (!experience.reactions.likes.some(r => r.userId.toString() === userId)) {
      experience.reactions.likes.push({ userId, createdAt: new Date() })
    }

    // Actualizar contadores
    experience.reactions.likesCount = experience.reactions.likes.length
    experience.reactions.dislikesCount = experience.reactions.dislikes.length
    experience.reactions.netScore =
    experience.reactions.likesCount - experience.reactions.dislikesCount

    await experience.save()
    return experience.reactions
  }

  static async addDislike (Experience, experienceId, userId) {
    const experience = await Experience.findById(experienceId)
    if (!experience) eh.throwError('Experience not found', 404)

    // Quitar like si existe
    experience.reactions.likes = experience.reactions.likes.filter(
      r => r.userId.toString() !== userId
    )
    // Agregar dislike si no existe
    if (!experience.reactions.dislikes.some(r => r.userId.toString() === userId)) {
      experience.reactions.dislikes.push({ userId, createdAt: new Date() })
    }

    // Actualizar contadores
    experience.reactions.likesCount = experience.reactions.likes.length
    experience.reactions.dislikesCount = experience.reactions.dislikes.length
    experience.reactions.netScore =
  experience.reactions.likesCount - experience.reactions.dislikesCount

    await experience.save()
    return experience.reactions
  }
  static async addComment (Experience , experienceId, userId, data){
    const experience = await Experience.findById(experienceId)
    if (!experience) eh.throwError('Experience not found', 404)
    const existing = experience.comments.find(c => c.userId.toString() === userId)
    if (existing) {
      existing.text = data
      existing.createdAt = new Date()
    } else {
      experience.comments.push({
        userId,
        data,
        createdAt: new Date()
      })
    }
    await experience.save()
    return experience.comment
  }

  static async deleteComment (Experience , experienceId, userId){
    const experience = await Experience.findById(experienceId)
    if (!experience) eh.throwError('Experience not found', 404)
    // Filtra todos los comentarios que NO sean del usuario
    const prevLength = experience.comments.length
    experience.comments = experience.comments.filter(
      c => c.userId.toString() !== userId
    )

    if (experience.comments.length === prevLength) {
      eh.throwError('Comment not found', 404)
    }

    await experience.save()
    return { message: 'Comment deleted' }
  }

}

/*Endpoints sugeridos:
Para obtener experiencias por país:

GET /countries/:countryId/experiences
GET /experiences?country=:countryId&sort=likes (ordenar por popularidad)
GET /experiences?country=:countryId&sort=recent (más recientes)
Para interacciones sociales:

POST /experiences/:id/like
DELETE /experiences/:id/like
POST /experiences/:id/comments
*/
