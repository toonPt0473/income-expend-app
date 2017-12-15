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

export const sendFormStatement = (values) => {
    return async dispatch => {
        const res = await axios.post('/api/new/statement' , values)
        dispatch({type: "SEND_NEW_STATEMENT" , payload: res})
    }
}
