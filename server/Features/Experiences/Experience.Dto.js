
export class ExperienceDto{
  static parser = (u) => {
    if (!u) return null

    const raw = typeof u.toObject === 'function' ? u.toObject() : u

    return {
      id: raw._id.toString(),
      userId: raw.userId.toString(),
      countryId: raw.countryId.toString(),
      title: raw.title,
      description: raw.description,
      rating: raw.rating,
      visitDate: raw.visitDate,
      media: (u.media || []).map(m => ({
        title: m.title,
        order: m.order,
        type: m.type,
        url: m.url
      })),
      tags: raw.tags,
      category: raw.category,
      budget: raw.budget,
      visibility: raw.visibility,
      reactions: {
        likes: (u.reactions?.likes || []).map(l => l.userId.toString()),
        dislikes: (u.reactions?.dislikes || []).map(d => d.userId.toString()),
        likesCount: raw.reactions?.likesCount || 0,
        dislikesCount: raw.reactions?.dislikesCount || 0,
        netScore: raw.reactions?.netScore || 0
      },
      comments: (u.comments || []).map(c => ({
        userId: c.userId.toString(),
        text: c.text,
        createdAt: c.createdAt,
        isReported: c.isReported,
        reportCount: c.reportCount,
        reports: (c.reports || []).map(r => ({
          userId: r.userId.toString(),
          reason: r.reason,
          reportedAt: r.reportedAt
        }))
      }))
    }
  }

}
export const emptyData = {
  id: 'sinIdporelmomento',
  userId: 'nohayidtodavia',
  countryId: 'noIdCountry',
  title: 'Experiencia fantasia',
  description: 'Aun no hay experiencias registradas aqui. Una vez creada la experiencia, este mensaje desaparecerá',
  rating: 1,
  visitDate: '2025-09-01',
  media: 'No data yet',
  tags: ['No tags'],
  category: 'example',
  budget: 'low',
  visibility: 'public'
}
