Perfecto, usar `combineReducers` es una muy buena práctica para mantener separados los concerns (preocupaciones) de `public` y `admin`. Aquí tienes un ejemplo de cómo organizarlo:

---

### 📁 Estructura recomendada:

```
/reducers
  └── publicReducer.js
  └── adminReducer.js
  └── rootReducer.js
```

---

### 1. `publicReducer.js`

```js
const initialState = {
  items: [],
  loading: false,
  error: null,
};

export default function publicReducer(state = initialState, action) {
  switch (action.type) {
    case 'PUBLIC/SET_ITEMS':
      return { ...state, items: action.payload };
    case 'PUBLIC/SET_LOADING':
      return { ...state, loading: action.payload };
    case 'PUBLIC/SET_ERROR':
      return { ...state, error: action.payload };
    default:
      return state;
  }
}
```

---

### 2. `adminReducer.js`

```js
const initialState = {
  users: [],
  settings: {},
  loading: false,
  error: null,
};

export default function adminReducer(state = initialState, action) {
  switch (action.type) {
    case 'ADMIN/SET_USERS':
      return { ...state, users: action.payload };
    case 'ADMIN/SET_SETTINGS':
      return { ...state, settings: action.payload };
    case 'ADMIN/SET_LOADING':
      return { ...state, loading: action.payload };
    case 'ADMIN/SET_ERROR':
      return { ...state, error: action.payload };
    default:
      return state;
  }
}
```

---

### 3. `rootReducer.js`

```js
import { combineReducers } from 'redux';
import publicReducer from './publicReducer';
import adminReducer from './adminReducer';

const rootReducer = combineReducers({
  public: publicReducer,
  admin: adminReducer,
});

export default rootReducer;
```

---

### 4. En tu configuración de Redux (`store.js`)

```js
import { createStore } from 'redux';
import rootReducer from './reducers/rootReducer';

const store = createStore(rootReducer);

export default store;
```

---

### ✅ Ahora puedes acceder así en tus componentes:

```js
const publicItems = useSelector(state => state.public.items);
const adminUsers = useSelector(state => state.admin.users);
```

¿Quieres que te ayude a convertir tus reducers actuales a esta estructura o a crear acciones reutilizables para ambos?
