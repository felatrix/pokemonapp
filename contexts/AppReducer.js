// initial state
export const initialState = {pokemon:[]};

 export function AppReducer(state, action) {
    switch (action.type) {
        case 'init_stored': 
            return action.value;
        case 'ADD_POKEMON':
            console.log(action.pokemon)
            return {...state,pokemon:[...state.pokemon,action.pokemon]}
        default:
            throw new Error();
      }
  }