// initial state
export const initialState = {pokemon:[]};

 export function AppReducer(state, action) {
    switch (action.type) {
        case 'init_stored': 
            return action.value;
        case 'ADD_POKEMON':
            return {...state,pokemon:[...state.pokemon,action.pokemon]}
        case 'REMOVE_POKEMON':
            return {...state,pokemon:action.pokemon}
        default:
            throw new Error();
      }
  }