import mongoose from 'mongoose'
import ExperienceService from './experiences.service.js'
import Experience from '../../Shared/Models/experience.js' // Tu modelo mongoose
import { ExperienceDto } from './Experience.Dto.js'
import * as store from '../../../test/baseHelperTest/testStore.js'

const experienceService = new ExperienceService(Experience, false, null, ExperienceDto.parser, 'Experience', null, false, null, )

describe('ExperienceService - Tests reales con Mongoose', () => {

  test('create deberia crear una experiencia con fotos o videos', async()=>{
    const data = {userId: new mongoose.Types.ObjectId(), countryId:new mongoose.Types.ObjectId(), title: 'experience-test', description: 'descripcion', rating: 1, visitDate: '2025-09-12', tags: ['adventure'], category: 'adventure', budget: 'low', visibility:'public', media: [{url:'http://localhost:4000/test/baseHelperTest/uploads/edicion.png', order:1, type: 'photo', title:'Foto compu'}]}
    const result = await experienceService.create(data, 'title')
    //console.log('resultado', result)
    expect(result.message).toBe('title experience-test created successfully')
    expect(result.results).toEqual({
        id: expect.any(String),
        userId: expect.any(String),
        countryId: expect.any(String),
        title: 'experience-test',
        description: 'descripcion',
        rating: 1,
        visitDate: expect.any(Date),
        media: [{url:'http://localhost:4000/test/baseHelperTest/uploads/edicion.png', order:1, type: 'photo', title:'Foto compu'}],
        tags: [ 'adventure' ],
        category: 'adventure',
        budget: 'low',
        visibility: 'public',
        reactions: {
          likes: [],
          dislikes: [],
          likesCount: 0,
          dislikesCount: 0,
          netScore: 0
        },
        comments: []
      })
      store.setCountryId(result.results.countryId)
      store.setUserId(result.results.userId)
      store.setExpId(result.results.id)
  })

  test('addLike debería agregar un like y actualizar contadores', async () => {
    const result = await experienceService.addLike(store.getExpId(), store.getUserId())
    expect(result.likesCount).toBe(1)
    expect(result.dislikesCount).toBe(0)
    expect(result.netScore).toBe(1)
  })

  test('addDisLike debería agregar un dislike y actualizar contadores', async () => {
    const result = await experienceService.addDisLike(store.getExpId(), store.getUserId())
    expect(result.likesCount).toBe(0)
    expect(result.dislikesCount).toBe(1)
    expect(result.netScore).toBe(-1)
  })

  test('addComment debería agregar un comentario', async () => {
    const text = 'Comentario de prueba'
    await experienceService.addComment(store.getExpId(), store.getUserId(), text)

    const updated = await Experience.findById(store.getExpId())
    //console.log('A ver el comentario: ', updated)
    expect(updated.comments.length).toBe(1)
    expect(updated.comments[0].text).toBe(text)
  })

  test('deleteComment debería eliminar el comentario del usuario', async () => {
    const result = await experienceService.deleteComment(store.getExpId(), store.getUserId())
    expect(result.message).toBe('Comment deleted')

    const updated = await Experience.findById(store.getExpId())
    expect(updated.comments.length).toBe(0)
  })

  test('reportExperience debería marcar experiencia como reportada', async () => {
    const response = await experienceService.reportExperience(store.getExpId(), store.getUserId(), 'Contenido inapropiado')
    expect(response.message).toBe('Experience reported')

    const updated = await Experience.findById(store.getExpId())
    expect(updated.isReported).toBe(true)
    expect(updated.reportCount).toBe(1)
  })

test('getFeedByCountry debería devolver experiencias filtradas por país', async () => {
  const countryId = store.getCountryId()

  // Crear experiencias de prueba
  await Experience.create([
    { title: 'Exp1', countryId, userId: store.getUserId(), visitDate:'1918-12-05', rating:1, description: 'descripcion',createdAt: new Date(), reactions: { likes: [], dislikes: [], likesCount: 5, dislikesCount: 1, netScore: 4 } },
    { title: 'Exp2', countryId, userId: store.getUserId(), visitDate:'1918-12-05', rating:1, description: 'descripcion',createdAt: new Date(), reactions: { likes: [], dislikes: [], likesCount: 3, dislikesCount: 0, netScore: 3 } },
    { title: 'Exp3', countryId: new mongoose.Types.ObjectId(), userId: store.getUserId(), visitDate:'1918-12-05', rating:1, description: 'descripcion',createdAt: new Date() } // Otro país
  ])

  const feed = await experienceService.getFeedByCountry(countryId.toString(), 10)

  expect(Array.isArray(feed)).toBe(true)
  expect(feed.length).toBe(3)
  feed.forEach(exp => {
    expect(exp.countryId.toString()).toBe(countryId.toString())
  })
})

test('getPopularOfMonth debería devolver experiencias populares filtradas por mes y país', async () => {
  const countryId = new mongoose.Types.ObjectId()
  const now = new Date()

  // Crear experiencias con reacciones
  await Experience.create([
    { title: 'Popular1', countryId, createdAt: now, reactions: { likesCount: 5, dislikesCount: 1, netScore: 4 }, userId: store.getUserId(),visitDate:'1918-12-05', rating:1, description: 'descripcion', },
    { title: 'Popular2', countryId, createdAt: now, reactions: { likesCount: 3, dislikesCount: 0, netScore: 3 }, userId: store.getUserId(),visitDate:'1918-12-05', rating:1, description: 'descripcion', },
    { title: 'Otra', countryId: new mongoose.Types.ObjectId(), createdAt: now, reactions: { likesCount: 10, dislikesCount: 0, netScore: 10 }, userId: store.getUserId(),visitDate:'1918-12-05', rating:1, description: 'descripcion', }
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
  const exp = await Experience.create({
    title: 'Moderate Me',
    countryId: new mongoose.Types.ObjectId(),
    userId: store.getUserId(),
    isModerated: false,
    visibility: 'public',
    visitDate:'1918-12-05', 
    rating:1, 
    description: 'descripcion',
  })

  // Ocultar
  const hideRes = await experienceService.moderateExperience(exp._id.toString(), 'delete')
  expect(hideRes.message).toBe('Experience deleted by moderator')

  const deleted = await Experience.findById(exp._id)
  expect(deleted).toBeNull()

  // Crear otra para restaurar
  const exp2 = await Experience.create({
    title: 'Restore Me',
    countryId: new mongoose.Types.ObjectId(),
    userId: store.getUserId(),
    isModerated: true,
    visibility: 'private',
    visitDate:'1918-12-05', 
    rating:1, 
    description: 'descripcion',
  })

  const restoreRes = await experienceService.moderateExperience(exp2._id.toString(), 'restore')
  expect(restoreRes.message).toBe('Experience restored by moderator')

  const updated = await Experience.findById(exp2._id)
  expect(updated.isModerated).toBe(false)
  expect(updated.visibility).toBe('public')
})

test('moderateComment debería eliminar y restaurar comentarios', async () => {
  const exp = await Experience.create({
    title: 'With Comments',
    countryId: new mongoose.Types.ObjectId(),
    userId: store.getUserId(),
    comments: [{
      _id: new mongoose.Types.ObjectId(),
      userId: store.getUserId(),
      text: 'Test Comment',
      isModerated: false,
      visibility: 'public'
    }],
    visitDate:'1918-12-05', 
    rating:1, 
    description: 'descripcion',
  })

  const commentId = exp.comments[0]._id.toString()

  // Eliminar
  const delRes = await experienceService.moderateComment(exp._id.toString(), commentId, 'delete')
  expect(delRes.message).toBe('Comment deleted by moderator')

  const updated = await Experience.findById(exp._id)
  expect(updated.comments.length).toBe(0)

  // Crear otra para restaurar
  const exp2 = await Experience.create({
    title: 'Restore Comment',
    countryId: new mongoose.Types.ObjectId(),
    userId: store.getUserId(),
    comments: [{
      _id: new mongoose.Types.ObjectId(),
      userId:store.getUserId(),
      text: 'Hidden Comment',
      isModerated: true,
      visibility: 'private'
    }],
    visitDate:'1918-12-05', 
    rating:1, 
    description: 'descripcion',
  })

  const commentId2 = exp2.comments[0]._id.toString()

  const resRes = await experienceService.moderateComment(exp2._id.toString(), commentId2, 'restore')
  expect(resRes.message).toBe('Comment restored by moderator')

  const restored = await Experience.findById(exp2._id)
  expect(restored.comments[0].isModerated).toBe(false)
  expect(restored.comments[0].visibility).toBe('public')
})
})
