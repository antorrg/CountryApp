import eh from '../../../Configs/errorHandlers.js'

const REPORT_THRESHOLD = 3 // Puedes ajustar este valor

export class ExperienceReport{

  static async reportExperience (Experience, experienceId, userId, reason = '') {
    const experience = await Experience.findById(experienceId)
    if (!experience) eh.throwError('Experience not found', 404)

    if (!experience.reports) experience.reports = []
    const alreadyReported = experience.reports.some(r => r.userId.toString() === userId)
    if (alreadyReported) eh.throwError('You have already reported this experience', 400)

    experience.isReported = true
    experience.reportCount = (experience.reportCount || 0) + 1
    experience.reports.push({ userId, reason, reportedAt: new Date() })

    // Si supera el umbral, se oculta automáticamente y queda para moderación
    if (experience.reportCount >= REPORT_THRESHOLD) {
      experience.isModerated = true
      experience.visibility = 'private'
    }

    await experience.save()
    return { message: 'Experience reported' }
  }

  static async reportComment (Experience, experienceId, commentId, userId, reason = '') {
    const experience = await Experience.findById(experienceId)
    if (!experience) eh.throwError('Experience not found', 404)

    const comment = experience.comments.id(commentId)
    if (!comment) eh.throwError('Comment not found', 404)

    if (!comment.reports) comment.reports = []
    const alreadyReported = comment.reports.some(r => r.userId.toString() === userId)
    if (alreadyReported) eh.throwError('You have already reported this comment', 400)

    comment.isReported = true
    comment.reportCount = (comment.reportCount || 0) + 1
    comment.reports.push({ userId, reason, reportedAt: new Date() })

    // Si supera el umbral, se oculta automáticamente y queda para moderación
    if (comment.reportCount >= REPORT_THRESHOLD) {
      comment.isModerated = true
      comment.visibility = 'private'
    }

    await experience.save()
    return { message: 'Comment reported' }
  }

  // Métodos para que el moderador pueda restaurar o eliminar: ( 'restore', 'delete' )
  static async moderateExperience (Experience, experienceId, action = 'restore') {
    const experience = await Experience.findById(experienceId)
    if (!experience) eh.throwError('Experience not found', 404)

    if (action === 'restore') {
      experience.isModerated = false
      experience.visibility = 'public'
    } else if (action === 'delete') {
      await experience.deleteOne()
      return { message: 'Experience deleted by moderator' }
    }
    await experience.save()
    return { message: `Experience ${action}d by moderator` }
  }

  static async moderateComment (Experience, experienceId, commentId, action = 'restore') {
    const experience = await Experience.findById(experienceId)
    if (!experience) eh.throwError('Experience not found', 404)

    const comment = experience.comments.id(commentId)
    if (!comment) eh.throwError('Comment not found', 404)

    if (action === 'restore') {
      comment.isModerated = false
      comment.visibility = 'public'
    } else if (action === 'delete') {
      comment.deleteOne()
      await experience.save()
      return { message: 'Comment deleted by moderator' }
    }
    await experience.save()
    return { message: `Comment ${action}d by moderator` }
  }
}
