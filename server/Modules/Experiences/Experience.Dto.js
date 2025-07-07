export default class ExperienceDto{

}
/*
Datos de creacion:
userId:
countryid:
title: string
description: string
rating: number
visitDate : date
media{
  photos []
  videos []
  }
tags: []
tags: [String],
category: {
      type: String,
      enum: ['adventure', 'cultural', 'gastronomic', 'family', 'business', 'romantic']
    },
budget: {
      type: String,
      enum: ['low', 'medium', 'high', 'luxury']
    },
reactions: {
  likes: [
  {userId}
  ],
  dislikes: [
  {userId}
    ],
  likesCount: type: Number,
  dislikesCount: type: Number
  netScore: type: Number
  },

comments: [
  {userId:ObjectId, text: String}
    ],
isPublic: type: Boolean
createdAt: type: Date
updatedAt: type: Date,
*/
