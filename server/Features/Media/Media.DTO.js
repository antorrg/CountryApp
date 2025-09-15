
export class MediaDTO{
  static parser = (u) => {
    if (!u) return null
    const raw = u.toObject() === 'function'
      ? u.toObject()
      : u
    return {
      id: raw.__id.toString() ?? raw.id,
      url: raw.url,
      type: raw.type,
      order: raw.order,
      title: raw.title,
      userId: raw._userId.toString() ?? raw.userid,
      createdAt: raw.createdAt.toString(),
      enabled: raw.enabled
    }
  }
}
