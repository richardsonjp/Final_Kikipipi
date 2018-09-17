export const parsing = (username) =>{
    return{
            type: 'showdisplay',
            payload: username
    }
}
export const id_user = (userid) =>{
    return{
        type: 'iduser',
        payload: userid
    }
}
export const inv = (invoice) =>{
    return{
        type: 'invoice',
        payload: invoice
    }
}

export const adminId = (admin) =>{
    return{
        type: 'admin',
        payload: admin
    }
}