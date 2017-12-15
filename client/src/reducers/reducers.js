import { combineReducers } from 'redux';

const userStatements = (state = null , action) => {
    switch (action.type) {
        case "FETCH_STATEMENT":
            return action.payload.data
        default:
            return state
    }
}

export default combineReducers({
    userStatements
})