Perfecto. Vamos a crear un controlador `getAllCountries` que permita:

1. **Buscar por nombre de país** (`name` query param)
2. **Paginar los resultados** (`page` y `limit` query params)
3. **Contar el total de documentos coincidentes**

Asumo que usás Express y que tus datos vienen del endpoint de [restcountries.com](https://restcountries.com/v3.1/all), donde los nombres están en `name.common`.

---

### ✅ Controlador `getAllCountries.js`

```js
// controllers/getAllCountries.js
import Country from '../models/Country.js'

export const getAllCountries = async (req, res) => {
  try {
    const { name = '', page = 1, limit = 10 } = req.query

    const searchRegex = new RegExp(name, 'i') // búsqueda insensible a mayúsculas

    const filter = name ? { 'name.common': searchRegex } : {}

    const total = await Country.countDocuments(filter)
    const countries = await Country.find(filter)
      .skip((page - 1) * limit)
      .limit(parseInt(limit))

    res.json({
      success: true,
      total,
      page: parseInt(page),
      totalPages: Math.ceil(total / limit),
      results: countries
    })
  } catch (err) {
    res.status(500).json({ success: false, message: 'Error al obtener países', error: err.message })
  }
}
```

---

### ✅ Ruta en Express

```js
// routes/countries.js
import express from 'express'
import { getAllCountries } from '../controllers/getAllCountries.js'

const router = express.Router()

router.get('/', getAllCountries)

export default router
```

Y en tu `app.js` o `index.js`:

```js
import countriesRouter from './routes/countries.js'
app.use('/api/countries', countriesRouter)
```

---

### 🧪 Ejemplos de uso desde el frontend o Postman

* `GET /api/countries` → primeros 10 países
* `GET /api/countries?page=2&limit=5` → página 2, 5 países por página
* `GET /api/countries?name=argentina` → búsqueda por nombre
* `GET /api/countries?name=a&page=1&limit=3` → búsqueda con paginación

---

¿Querés que también incluya ordenamiento (por nombre u otra propiedad)?
<hr>


Perfecto, vamos a añadir también un filtro por región (`region`), ya que la API de países (como la de [REST Countries](https://restcountries.com)) incluye esta propiedad. Quedará un endpoint muy completo:

---

### ✅ Versión final de `getAllCountries` con:

* Paginación (`page`, `limit`)
* Búsqueda por nombre (`name`)
* Ordenamiento (`sortBy`, `sort`)
* Filtro por región (`region`)

---

```js
// controllers/getAllCountries.js
import Country from '../models/Country.js'

export const getAllCountries = async (req, res) => {
  try {
    const {
      name = '',
      page = 1,
      limit = 10,
      sortBy = 'name.common',
      sort = 'asc',
      region = ''
    } = req.query

    const filter = {}

    if (name) {
      filter['name.common'] = new RegExp(name, 'i') // búsqueda por nombre
    }

    if (region) {
      filter.region = new RegExp(`^${region}$`, 'i') // búsqueda exacta insensible a mayúsculas
    }

    const allowedSortFields = ['name.common', 'population', 'area']
    const sortOptions = {}

    if (allowedSortFields.includes(sortBy)) {
      sortOptions[sortBy] = sort === 'desc' ? -1 : 1
    }

    const total = await Country.countDocuments(filter)

    const countries = await Country.find(filter)
      .sort(sortOptions)
      .skip((page - 1) * limit)
      .limit(parseInt(limit))

    res.json({
      success: true,
      total,
      page: parseInt(page),
      totalPages: Math.ceil(total / limit),
      sortBy,
      sort,
      region: region || null,
      results: countries
    })
  } catch (err) {
    res.status(500).json({
      success: false,
      message: 'Error al obtener países',
      error: err.message
    })
  }
}
```

---

### 📌 Ejemplos de consultas útiles

| Ejemplo de URL                                     | Resultado                               |
| -------------------------------------------------- | --------------------------------------- |
| `/api/countries?region=Europe`                     | Países de Europa                        |
| `/api/countries?name=land&region=Europe`           | Países europeos con “land” en el nombre |
| `/api/countries?sortBy=area&sort=desc&region=Asia` | Países asiáticos más grandes            |
| `/api/countries?page=2&limit=20`                   | Página 2, 20 países por página          |

---

¿Quieres que prepare también una ruta de Express (`GET /api/countries`) lista para conectar esto?
