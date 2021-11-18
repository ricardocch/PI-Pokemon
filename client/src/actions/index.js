
export  function getTotalPokemons() {

  return function(dispatch){
    fetch('http://www.localhost:3001/pokemons')
    .then(response => response.json())
    .then(json => {
      
      dispatch({ type: 'getPokemons',payload:json });
    
    }).catch( (error)=>{
      
    });
  }
  
}

export  function getTypes() {

  return function(dispatch){
    fetch('http://www.localhost:3001/types')
    .then(response => response.json())
    .then(json => {
      
      dispatch({ type: 'getTypes',payload:json });
    
    }).catch( (error)=>{
      
    });
  }
  
}

export  function getByID(id) {

  return function(dispatch){
    fetch(`http://www.localhost:3001/pokemons/${id}`)
    .then(response => response.json())
    .then(json => {
      
      dispatch({ type: 'getByID',payload:json });
    
    }).catch( (error)=>{
      
    });
  }
  
}

export function getByName(name) {
  return function(dispatch){
    fetch(`http://www.localhost:3001/pokemons?name=${name}`)
    .then(response => response.json())
    .then(json => {
      
      dispatch({ type: 'getByName',payload:json });
    
    }).catch( (error)=>{
      
    });
  }
}

export  function createPokemon(data) {

  return function(dispatch){
    fetch('http://www.localhost:3001/pokemons',{
      method: 'POST', 
      headers: {
        'Content-Type': 'application/json'
      },
      body:JSON.stringify(data)
    })
    .then(response => response.json())
    .then(json => {
      dispatch({ type: 'createPokemon',payload:json });
    
    }).catch( (error)=>{
      
    });
  }
  
}
export function getPage(num){
    return {
      type:'changePage',
      payload:num
    }
}

export function orderBy(payload){
  return {
    type:'orderBy',
    payload
  }
}

export function filterCreated(payload){
  
  return {
    type:'filterCreated',
    payload
  }
}

//Sirve para buscar por por name en el home
export function search(search){
  
  return {
    type:'search',
    payload:search
  }
}

export function reset(){
  return {
    type:'reset'
  }
}

export function resetStatusCreate(){
  return {
    type:'resetStatusCreate'
  }
}