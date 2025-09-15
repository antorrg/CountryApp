export default {
  name: {
    type: 'string',
    default: '',
    sanitize: {
      trim: true,
      escape: true,
      lowercase: true
    }
  },
  page: {
    type: 'int',
    default: 1
  },
  limit: {
    type: 'int',
    default: 10
  },
  sortBy: {
    type: 'string',
    default: 'name.common',
    sanitize: {
      trim: true,
      escape: true
    }
  },
  sort: {
    type: 'string',
    default: 'asc',
    sanitize: {
      trim: true,
      escape: true
    }
  },
  region: {
    type: 'string',
    default: '',
    sanitize: {
      trim: true,
      escape: true,
      lowercase: true
    }
  }
}
