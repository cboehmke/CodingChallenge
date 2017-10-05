import { SET_GAMES, ADD_USER } from '../actions';

export default function users(state = [], action={}){
    switch(action.type){
        case ADD_USER:
            return [
                ...state,
                action.state
            ];
        case SET_GAMES:
            return action.users;
        default: return state;
    }
}