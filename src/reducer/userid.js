
const initialState = 0

export default (state = initialState,action) =>{
    switch(action.type){
        case 'iduser':
            return action.payload;

            default:
                return state
    }
}