let initialState ={
    cid: ""
}


//Reducer for exporting the category id as state to BrandList component after user selects the category
//and ProductForm for setting the Form for Features(MObile,Laptop).
const categoryReducer =(state=initialState,action)=>{
    switch (action.type){
        case "sendCategoryid":
            console.log(action.payload.cid)
            return{
                ...state,
                cid: action.payload.cid
            }
        default: return state
    }
}

export default categoryReducer