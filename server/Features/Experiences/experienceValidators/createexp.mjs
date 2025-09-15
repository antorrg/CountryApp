export default {
  userId: {
    type: "string"
  },
  countryId: {
    type: "string"
  },
  title: {
    type: "string",
    sanitize: {
      trim: true
    }
  },
  description: {
    type: "string",
    sanitize: {
      trim: true,
      escape: true
    }
  },
  rating: {
    type: "int",
    default: 1
  },
  visitDate: {
    type: "string",
    sanitize: {
      trim: true,
      escape: true
    }
  },
  tags: {
    type: "string",
    sanitize: {
      trim: true,
      escape: true
    }
  },
  category: {
    type: "string",
    sanitize: {
      trim: true,
      escape: true
    }
  },
  budget: {
    type: "string",
    sanitize: {
      trim: true,
      escape: true
    }
  },
  visibility: {
    type: "string",
    sanitize: {
      trim: true,
      escape: true
    }
  },
  media: [
{
      title: {
        type: "string",
        sanitize: {
          trim: true,
          escape: true
        }
      },
      order: {
        type: "int"
      },
      type: {
        type: "string",
        default: "photo",
        sanitize: {
          trim: true,
          escape: true,
          lowercase: true
        }
      },
      url: {
        type: "string",
        sanitize: {
          trim: true,
          escape: true
        }
      }
    }
  ]
};
