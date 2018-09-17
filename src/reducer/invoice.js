const initialState = 'INV'

export default (state = initialState,action) =>{
    switch(action.type){
        case 'invoice':
            return action.payload;

            default:
                return state
    }
}