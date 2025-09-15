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
      trim: true
    }
  },
  rating: {
    type: "float"
  },
  media: [
{
      photos: [
{
          type: "string",
          sanitize: {
            trim: true
          }
        }
      ]
    }
  ],
  videos: {
    type: "string",
    sanitize: {
      trim: true
    }
  }
};
