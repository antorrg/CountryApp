// services/saveCountries.js
import axios from 'axios'
import Country from './Models/country.js'

export const saveCountriesIndividually = async () => {
  try {
    const response = await axios.get('https://restcountries.com/v3.1/all')
    const countries = response.data

    for (const country of countries) {
      const newCountry = new Country(country)
      await newCountry.save()
    }

    console.log('Todos los países fueron guardados.')
  } catch (err) {
    console.error('Error al guardar países:', err.message)
  }
}
