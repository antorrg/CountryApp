export default class CountryHelper {
    
  static countryDTO (countryDoc) {
    return {
      id: countryDoc._id.toString(),
      name: countryDoc.name?.common || '',
      capital: countryDoc.capital?.[0] || 'No capital',
      code: countryDoc.cca3,
      region: countryDoc.region || 'No region',
      population: countryDoc.population || 0,
      flagEmoji: countryDoc.flag || '',
      flagImage: countryDoc.flags?.png || countryDoc.flags?.svg || '',
      enabled: countryDoc.enabled,
      deleted: countryDoc.deleted,
    }
  }
  static typeCreate = []
  static typeUpdate = []
  static typeQueries = [{
    name:'page', 
    type:'int'
     },{
    name:'limit', 
    type:'int'
     },{
    name:'name', 
    type:'string'
     },{
    name:'sort', 
    type:'string'
     },{
    name:'region', 
    type:'string'
     }];
}
