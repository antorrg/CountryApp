import mongoose from 'mongoose'
import ExperienceService from './experiences.service.js'
import Experience from '../../shared/Models/experience.js' // Tu modelo mongoose
import UserModel from '../../Models/User.js' // Si lo necesitas

const experienceService = new ExperienceService(Experience, false,  null, false, null,  null, 'Experience')

describe('ExperienceService - Tests reales con Mongoose', () => {

  let testExperience
  let testUserId

  //   beforeAll(async () => {
  //     connection = await mongoose.connect(process.env.MONGODB_URI_TEST, {
  //       useNewUrlParser: true,
  //       useUnifiedTopology: true
  //     })

  // // Crear usuario de prueba
  // const user = await UserModel.create({ name: 'Test User' })
  // testUserId = user._id

  //   // Crear experiencia inicial
  //   testExperience = await ExperienceModel.create({
  //     title: 'Test Experience',
  //     countryId: new mongoose.Types.ObjectId(),
  //     userId: testUserId,
  //     reactions: { likes: [], dislikes: [], likesCount: 0, dislikesCount: 0, netScore: 0 },
  //     comments: [],
  //     reports: []
  //   })
  // })

  // afterAll(async () => {
  //   await ExperienceModel.deleteMany()
  //   await UserModel.deleteMany()
  //   await mongoose.disconnect()
  // })

  test('addLike debería agregar un like y actualizar contadores', async () => {
    const result = await experienceService.addLike(testExperience._id, testUserId.toString())
    expect(result.likesCount).toBe(1)
    expect(result.dislikesCount).toBe(0)
    expect(result.netScore).toBe(1)
  })

  test('addDisLike debería agregar un dislike y actualizar contadores', async () => {
    const result = await experienceService.addDisLike(testExperience._id, testUserId.toString())
    expect(result.likesCount).toBe(0)
    expect(result.dislikesCount).toBe(1)
    expect(result.netScore).toBe(-1)
  })

  test('addComment debería agregar un comentario', async () => {
    const text = 'Comentario de prueba'
    await experienceService.addComment(testExperience._id, testUserId.toString(), text)

    const updated = await ExperienceModel.findById(testExperience._id)
    expect(updated.comments.length).toBe(1)
    expect(updated.comments[0].data).toBe(text)
  })

  test('deleteComment debería eliminar el comentario del usuario', async () => {
    const result = await experienceService.deleteComment(testExperience._id, testUserId.toString())
    expect(result.message).toBe('Comment deleted')

    const updated = await ExperienceModel.findById(testExperience._id)
    expect(updated.comments.length).toBe(0)
  })

  test('reportExperience debería marcar experiencia como reportada', async () => {
    const response = await experienceService.reportExperience(testExperience._id, testUserId.toString(), 'Contenido inapropiado')
    expect(response.message).toBe('Experience reported')

    const updated = await ExperienceModel.findById(testExperience._id)
    expect(updated.isReported).toBe(true)
    expect(updated.reportCount).toBe(1)
  })

})
test('getFeedByCountry debería devolver experiencias filtradas por país', async () => {
  const countryId = new mongoose.Types.ObjectId()

  // Crear experiencias de prueba
  await ExperienceModel.create([
    { title: 'Exp1', countryId, userId: testUserId, createdAt: new Date(), reactions: { likes: [], dislikes: [], likesCount: 0, dislikesCount: 0, netScore: 0 } },
    { title: 'Exp2', countryId, userId: testUserId, createdAt: new Date(), reactions: { likes: [], dislikes: [], likesCount: 0, dislikesCount: 0, netScore: 0 } },
    { title: 'Exp3', countryId: new mongoose.Types.ObjectId(), userId: testUserId, createdAt: new Date() } // Otro país
  ])

  const feed = await experienceService.getFeedByCountry(countryId.toString(), 10)

  expect(Array.isArray(feed)).toBe(true)
  expect(feed.length).toBe(2)
  feed.forEach(exp => {
    expect(exp.countryId.toString()).toBe(countryId.toString())
  })
})

test('getPopularOfMonth debería devolver experiencias populares filtradas por mes y país', async () => {
  const countryId = new mongoose.Types.ObjectId()
  const now = new Date()

  // Crear experiencias con reacciones
  await ExperienceModel.create([
    { title: 'Popular1', countryId, createdAt: now, reactions: { likesCount: 5, dislikesCount: 1, netScore: 4 }, userId: testUserId },
    { title: 'Popular2', countryId, createdAt: now, reactions: { likesCount: 3, dislikesCount: 0, netScore: 3 }, userId: testUserId },
    { title: 'Otra', countryId: new mongoose.Types.ObjectId(), createdAt: now, reactions: { likesCount: 10, dislikesCount: 0, netScore: 10 }, userId: testUserId }
  ])

  const popular = await experienceService.getPopularOfMonth(
    countryId.toString(),
    now.getMonth() + 1,
    now.getFullYear(),
    5
  )

  expect(Array.isArray(popular)).toBe(true)
  expect(popular.length).toBe(2)
  expect(popular[0].reactions.netScore).toBeGreaterThanOrEqual(popular[1].reactions.netScore)
})

test('moderateExperience debería ocultar y restaurar experiencias', async () => {
  const exp = await ExperienceModel.create({
    title: 'Moderate Me',
    countryId: new mongoose.Types.ObjectId(),
    userId: testUserId,
    isModerated: false,
    visibility: 'public'
  })

  // Ocultar
  const hideRes = await experienceService.moderateExperience(exp._id.toString(), 'delete')
  expect(hideRes.message).toBe('Experience deleted by moderator')

  const deleted = await ExperienceModel.findById(exp._id)
  expect(deleted).toBeNull()

  // Crear otra para restaurar
  const exp2 = await ExperienceModel.create({
    title: 'Restore Me',
    countryId: new mongoose.Types.ObjectId(),
    userId: testUserId,
    isModerated: true,
    visibility: 'private'
  })

  const restoreRes = await experienceService.moderateExperience(exp2._id.toString(), 'restore')
  expect(restoreRes.message).toBe('Experience restored by moderator')

  const updated = await ExperienceModel.findById(exp2._id)
  expect(updated.isModerated).toBe(false)
  expect(updated.visibility).toBe('public')
})

test('moderateComment debería eliminar y restaurar comentarios', async () => {
  const exp = await ExperienceModel.create({
    title: 'With Comments',
    countryId: new mongoose.Types.ObjectId(),
    userId: testUserId,
    comments: [{
      _id: new mongoose.Types.ObjectId(),
      userId: testUserId,
      data: 'Test Comment',
      isModerated: false,
      visibility: 'public'
    }]
  })

  const commentId = exp.comments[0]._id.toString()

  // Eliminar
  const delRes = await experienceService.moderateComment(exp._id.toString(), commentId, 'delete')
  expect(delRes.message).toBe('Comment deleted by moderator')

  const updated = await ExperienceModel.findById(exp._id)
  expect(updated.comments.length).toBe(0)

  // Crear otra para restaurar
  const exp2 = await ExperienceModel.create({
    title: 'Restore Comment',
    countryId: new mongoose.Types.ObjectId(),
    userId: testUserId,
    comments: [{
      _id: new mongoose.Types.ObjectId(),
      userId: testUserId,
      data: 'Hidden Comment',
      isModerated: true,
      visibility: 'private'
    }]
  })

  const commentId2 = exp2.comments[0]._id.toString()

  const resRes = await experienceService.moderateComment(exp2._id.toString(), commentId2, 'restore')
  expect(resRes.message).toBe('Comment restored by moderator')

  const restored = await ExperienceModel.findById(exp2._id)
  expect(restored.comments[0].isModerated).toBe(false)
  expect(restored.comments[0].visibility).toBe('public')
})

