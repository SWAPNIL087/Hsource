export let initialState = null;

initialState = {
    loggedIn: localStorage.getItem('isLoggedin') ,
}

export const reducer = (state,action)=>{
    if (action.type === "USER"){
        return action.payload;
    }
    return state;
}

