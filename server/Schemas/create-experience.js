export default {
  userId: {
    type: 'string'
  },
  countryId: {
    type: 'string'
  },
  title: {
    type: 'string'
  },
  description: {
    type: 'string'
  },
  rating: {
    type: 'float',
    optional: true
  },
  media: {
    photos: {
      '0': {
        type: 'string'
      }
    },
    videos: {
      '0': {
        type: 'string'
      }
    }
  },
  tags: {
    '0': {
      type: 'string'
    }
  },
  category: {
    enum: {
      '0': {
        type: 'string'
      }
    }
  },
  budget: {
    enum: {
      '0': {
        type: 'string'
      }
    }
  }
}
