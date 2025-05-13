const throwError = (message, status) => {
  const error = new Error(message)
  error.status = status
  throw error
}

export function mockDeleteFunction (url, result) {
  if (result) {
    return {
      success: true,
      message: `ImageUrl ${url} deleted succesfully`
    }
  } else {
    throwError(`Error processing ImageUrl ${url}`, 500)
  }
}
export const deletFunctionTrue = (url) => {
  // console.log('probando deleteFunction: ', url);
  return {
    success: true,
    message: `ImageUrl ${url} deleted succesfully`
  }
}
export const deletFunctionFalse = (url) => {
  // console.log('probando deleteErrorFunction: ', url);
  throwError(`Error processing ImageUrl: ${url}`, 500)
}
