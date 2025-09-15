import eh from '../Configs/errorHandlers.js'
import { experienceService } from '../Features/Experiences/experiences.routes.js'
import { mediaService } from '../Features/Media/media.routes.js'
import parseVisitDate from '../Shared/Helpers/validDate.js'

class Experience{
  constructor (expServ, mediaServ, parserFunction){
    this.expServ = expServ
    this.mediaServ = mediaServ
    this.parserFunction = parserFunction
  }
  createExperience = async (data) => {
    const { userId, countryId, title, description, rating, visitDate, tags, category, budget, visibility, media } = data
    try {
      //const media = [{ url, order, type, title}]
      const mediaResults = await Promise.allSettled(media.map(async(med)=>{ 
        const medSaved = await this.mediaServ.create(med, 'title')
        return medSaved.id
      }))
      const mediaSaved = mediaResults
      .filter(r => r.status === 'fulfilled')
      .map(r => r.value)
      const rejected = mediaResults
        .filter(r => r.status === 'rejected')
        .map(r => r.reason)
      if (mediaSaved.length===0) eh.throwError(`No media could be saved`, 500)
      
      const dateParsed = parseVisitDate(visitDate)
      const expData = { userId, countryId, description, rating, tags, category, budget, visibility,
        title,
        visitDate: dateParsed.results,
        media: mediaSaved
      }
      const newExperience = await this.expServ.create(expData, 'title')
      if (!newExperience) eh.throwError(`Error creating experience ${expTitle}`, 500)

      return {
        message:  rejected.length > 0 
          ? `Experience ${title} created with warnings: ${rejected.length} media failed`
          : `Experience ${title} created successfully`,
        results: this.parserFunction(newExperience)
      }

    } catch (error) {
      console.error('ExpCommonMethods error', error)
      throw error
    }
  }
}

export const experienceCommonMethods = new Experience(experienceService, mediaService)
