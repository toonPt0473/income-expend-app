import axios from 'axios'

export const devLogin = (username , password) => {
    return async dispatch => {
        await axios.post('/login' , {username: username || "toonpt" , password: password || "3074621"})
    }
    
    
}

export const fetchStatement = () => {
    return async dispatch => {
        const res = await axios.get('/api/statement');
        dispatch({type: "FETCH_STATEMENT" , payload: res})
    }
}
