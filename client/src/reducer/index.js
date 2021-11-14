const initialState = {
  Pokemons:[],
  types:[],
  tmpPokemons:[],
  page:1,
  toShow:[],
  totalPages:0,
  PokemonDetail:{}
};

function sortAsc(arr,property){
  
  property = property !== '' ? property.toLowerCase() : 'id'

  property = property.toLowerCase()
  arr.sort(function (a, b) {
    if (a[property] > b[property]) {
      return 1;
    }
    if (a[property] < b[property]) {
      return -1;
    }
    
    return 0;
  });
  return arr;
}

function sortDesc(arr,property){
  property = property !== '' ? property.toLowerCase() : 'id'
  
  arr.sort(function (a, b) {
    if (a[property] < b[property]) {
      return 1;
    }
    if (a[property] > b[property]) {
      return -1;
    }
    
    return 0;
  });

  return arr;
}

function getShowPages(arr){
      let toShow = []
      arr.forEach((el,idx) => {
        if(idx < 9) toShow.push(el)
      })
      let row = Math.floor((arr.length - 9)/12)
      row = row + 2
      let arrPages = []
      for(let i=1; i <= row;i++){
        arrPages.push(i)
      }

      return [toShow,arrPages]
}

//En nuestro estado guardaremos objetos con `todos`. Cada todo tendra: title, description, place, date, id y un status;
const pokemons = (state = initialState, action) => {
  // console.log("entre",action.type);
  switch(action.type) {
    
    case "getPokemons":
      let tmp1 = getShowPages(action.payload)
      return {...state,
        tmpPokemons:action.payload,
        Pokemons:action.payload,
        toShow:tmp1[0],
        totalPages:tmp1[1],
        Page:1
      };
    
    case "changePage":
      let toShow = []
      let tempMinRow = action.payload - 2 
      let tempMaxRow = action.payload - 1
      let min = action.payload === 1 ? 0 : 9 + (12*tempMinRow )
      let max = action.payload === 1 ? 8 : 8 + (12*tempMaxRow )
   
      state.tmpPokemons.forEach((el,idx) => {
        if(idx >= min && idx <= max) toShow.push(el)
      })
      return {...state,
        toShow:toShow,
        page:action.payload 
      };
    
      case "getTypes":
  
      return {...state,
        types:action.payload
      };
      case "orderBy":
      let tmpOrder = action.payload.order === 'ASC' ? sortAsc(state.tmpPokemons,action.payload.value) : sortDesc(state.tmpPokemons,action.payload.value)
      let tmp2 = getShowPages(tmpOrder)
      return {...state,
        tmpPokemons:tmpOrder,
        toShow:tmp2[0],
        totalPages:tmp2[1],
        page:1
      };

      case "filterCreated":

      let tmpFilters = action.payload.Type !== '' ? state.Pokemons.filter( el => el.types.includes(action.payload.Type)) : state.Pokemons
      if(action.payload.created === "N") 
          tmpFilters = tmpFilters.filter( el => el.created === false)
      else if(action.payload.created === "C") 
        tmpFilters = tmpFilters.filter( el => el.created === true) 

      let tmp3 = getShowPages(tmpFilters)
      return {...state,
        tmpPokemons:tmpFilters,
        toShow:tmp3[0],
        totalPages:tmp3[1],
        page:1
      };

      case "getByID":

      return {...state,
        PokemonDetail:action.payload.length > 0 ? action.payload[0] : {},
        page:1
      };

      case "getByName":

      return {...state,
        PokemonDetail:action.payload.length > 0 ? action.payload[0] : {},
        page:1
      };

      case "reset":
      return {
        ...state,
        Pokemons:[],
        tmpPokemons:[],
        page:1,
        toShow:[],
        totalPages:0,
        PokemonDetail:{}
      };

      // case "search":

      // let tmpSearch = action.payload !== '' ? state.Pokemons.filter( el => el.name.toLowerCase() === action.payload.toLowerCase()) : state.Pokemons


      // let tmp4 = getShowPages(tmpSearch)

      // return {...state,
      //   tmpPokemons:tmpSearch,
      //   toShow:tmp4[0],
      //   totalPages:tmp4[1],
      //   page:1
      // };
      
    default:
      return state
  }
}

export default pokemons;