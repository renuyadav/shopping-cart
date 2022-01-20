import {GET_PRODUCTS, ADD_TO_CART, DELETE_ITEM, PRODUCTS_ERROR, UPDATE_QUANTITY, GET_CATEGORIES} from '../actions/cartActions';

const initState = {
    items :[],
    categories:[],
    addedItems:[],
    total:0,
    loading:true,
    totalItems:0
}
/*
const updatedPrice = (itemsArr) => {
    let updated_price  = itemsArr.reduce((accumulator, current) => 
               {

                   return accumulator + (current.price*current.quantity)
               }, 0);
    return  updated_price;          
}

const totalCount = (itemsArr) => {
    let total_Items =  itemsArr.reduce((accumulator, current) => 
                {
                    console.log("total quanity of items>>" + current+ "::"+ accumulator);
                    return accumulator + current.quantity
                }, 0);
    return  total_Items;          
}*/

const updatedPrice = (itemsArr) =>  itemsArr.reduce((accumulator, current) => accumulator + (current.price*current.quantity), 0);
          

const totalCount = (itemsArr) => itemsArr.reduce((accumulator, current) => accumulator + current.quantity, 0);
       


export default function(state = initState, action) {
    switch (action.type) {
        case GET_PRODUCTS:
            return { ...state, items:action.payload, loading:false}
            break; 
        case GET_CATEGORIES:
            return { ...state, categories:action.payload, loading:false}
            break;
        case PRODUCTS_ERROR:
            return {...state, error:action.payload, loading:false}
            break;
        case ADD_TO_CART:
            let added_Item = state.items.find(item => item.id === parseInt(action.id));
            let existed_Item = state.addedItems.find(item => item.id === parseInt(action.id));
            let totalPrice = 0;
            if(existed_Item){
                existed_Item.quantity += 1;
                totalPrice = parseFloat(state.total) + existed_Item.price;
                return {...state, total:(totalPrice).toFixed(2), totalItems:state.totalItems+1}
            }else{
                added_Item.quantity = 1;
                totalPrice = parseFloat(state.total) + added_Item.price;
                return{...state, addedItems: [...state.addedItems, added_Item], total: (totalPrice).toFixed(2), totalItems:state.totalItems+1}
            }

        break;
        case UPDATE_QUANTITY:
            let updated_Item = state.addedItems.find(item => item.id === parseInt(action.payload.id));
            if(updated_Item){
                updated_Item.quantity = parseInt(action.payload.quantity);
                let updatedArr = updated_Item.quantity !== 0 ? state.addedItems :state.addedItems.filter((item) => item.quantity !== 0); 
                
                return {...state, addedItems: updatedArr, total: parseFloat(updatedPrice(updatedArr)).toFixed(2), totalItems:totalCount(updatedArr) }
            }
            break;
        case DELETE_ITEM:
            let updated_Items = state.addedItems.filter(item => item.id !== parseInt(action.id));
        
            return {...state, addedItems: updated_Items, total: parseFloat(updatedPrice(updated_Items)).toFixed(2), totalItems:totalCount(updated_Items) }
           
            break;
        default:
            break;
    }
    return state;
} 
