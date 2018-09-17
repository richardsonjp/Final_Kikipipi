
const initialState = ''

export default (state = initialState,action) =>{
    switch(action.type){
        case 'showdisplay':
            return action.payload;

            default:
                return state
    }
}