const SetStorage = (id, value) => {
  localStorage.setItem(id, value)
}

const GetStorage = (id) => {
  var item = localStorage.getItem(id);
  
  if(item == 'null')
    return null
  
  return item
}

export {
  SetStorage,
  GetStorage
}