
const initialState = 0

export default (state = initialState,action) =>{
    switch(action.type){
        case 'admin':
            return action.payload;

            default:
                return state
    }
}