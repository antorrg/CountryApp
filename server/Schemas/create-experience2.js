export default {
  userId: {
    type: "string"
  },
  countryId: {
    type: "string"
  },
  title: {
    type: "string"
  },
  description: {
    type: "string"
  },
  rating: {
    type: "float",
    optional: true
  },
  media: {
    photos: [
{
        type: "string"
      }
    ],
    videos: [
{
        type: "string"
      }
    ]
  },
  tags: [
{
      type: "string"
    }
  ],
  category: {
    enum: [
{
        type: "string"
      }
    ]
  },
  budget: {
    enum: [
{
        type: "string"
      }
    ]
  }
};
