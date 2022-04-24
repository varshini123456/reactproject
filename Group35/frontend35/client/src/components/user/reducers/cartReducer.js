const initialState = {
    cart: [],
    quantity : 0            // Initial state
  };
  
  export const actionTypes = {
    ADD_TO_CART: "ADD_TO_CART",
    DELETE_FROM_CART: "DELETE_FROM_CART",
    RESET_CART: "RESET_CART",
    // ADJUST_QUANTITY : "ADJUST_QUANTITY",
    INCREMENT_QUANTITY : "INCREMENT_QUANTITY",
    DECREMENT_QUANTITY : "DECREMENT_QUANTITY",
    TotalQty : "TotalQty"

  };
  
  const CartReducer = (state = initialState, action) => {
    switch (action.type) { 
      case actionTypes.ADD_TO_CART:   // Add to cart
        const isPre = state.cart.find((i) => i.id === action.payload.item.id);
        console.log(action.payload.username)
        return {
        //   ...state,
        //   cart:
        //     isPre !== undefined
        //       ? [...state.cart, {...isPre, qty : isPre.qty + 1}  ]
        //       : [...state.cart, { ...action.payload.item, qty : 1 }],

            ...state,
            cart: isPre !== undefined ? 
            state.cart.map((item)=> item.id === action.payload.item.id ? {...item, qty: item.qty +1}: item ):
            [...state.cart,{...action.payload.item, qty: 1, username : action.payload.username}],
        };
  
      case actionTypes.DELETE_FROM_CART:   // Delete from cart
        return {
          ...state,
          cart: state.cart.filter((i) => i.id !== action.payload.item.id),
        };
  
      case actionTypes.RESET_CART:   // Reset cart
        return {
          ...state,
          cart: [],
        };

      // case actionTypes.ADJUST_QUANTITY:
      //       console.log('true? '+ action.payload.item.id);
      //       return {
      //           ...state,
      //           cart: state.cart.map((item)=>item.id === action.payload.item.id ? {...item,qty: +action.payload.qty}: item )
      //       }
      case actionTypes.INCREMENT_QUANTITY:   // Increment quantity
              console.log('true? '+ action.payload.item.id);
              return {
                  ...state,
                  cart: state.cart.map((item)=>item.id === action.payload.item.id ? {...item,qty: item.qty + 1}: item )
              }

      case actionTypes.DECREMENT_QUANTITY:   // Decrement quantity
                console.log('true? '+ action.payload.item.id);
                return {
                    ...state,
                    cart: state.cart.map((item)=>item.id === action.payload.item.id ? {...item,qty: item.qty - 1}: item )
                }

      case actionTypes.TotalQty:    // To get the total quantity in the cart
                  return {
                      ...state,
                      quantity : action.payload.totalQty
                  }
      
  
      default:
        return state;
    }
  };
  
  export default CartReducer;