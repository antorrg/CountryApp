
```javascript
media = {
           url,
            type,
            title, 
            userId,
            whereField: 'title'
}
experience = {
        userId: ref ,
    countryId: ref,
    title:string,
    description: string,
    rating: {
      type: Number,
      min: 1,
      max: 5,
      required: true
    },
    visitDate: {
      type: Date,
      required: true
    },
    media: [{
      ref: 'Media'
    }],
    tags: [String],
    category: {
      type: String,
      enum: ['adventure', 'cultural', 'gastronomic', 'family', 'business', 'romantic']
    },
    budget: {
      type: String,
      enum: ['low', 'medium', 'high', 'luxury']
    },
    // Configuración de privacidad
    visibility: {
      type: String,
      enum: ['public', 'friends', 'private'],
      default: 'public'
    },
  
}
        
```