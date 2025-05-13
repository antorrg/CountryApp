export const infoClean = (data)=>{
    return {
        id: data._id.toString(),
        title: data.title,
        count: data.count,
        picture: data.picture,
        enabled: data.enabled,
    }
}
export const resultParsedCreate={
   id: expect.any(String),
   title: "page", 
   count: 5, 
   picture: 'https//pepe.com', 
   enabled: true,
}
export const newData={
   title: "page", 
   count: 5, 
   picture: 'https://donJose.com', 
   enabled: true
}
export const responseNewData={
   id: expect.any(String),
   title: "page", 
   count: 5, 
   picture: 'https://donJose.com', 
   enabled: true
}