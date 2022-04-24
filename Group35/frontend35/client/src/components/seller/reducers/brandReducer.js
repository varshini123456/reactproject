let initialState ={
    brand: ""
}
//Reducer for exporting the brand name as state to BrandList component after user selects the brand 
//and ProductForm for setting the value of brandname   

const brandReducer =(state=initialState,action)=>{
    switch (action.type){
        case "sendBrand":
            console.log(action.payload.brand)
            return{
                ...state,
                brand: action.payload.brand
            }
        default: return state
    }
}

export default brandReducer