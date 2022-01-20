import axios from 'axios';

export const GET_PRODUCTS = 'GET_PRODUCTS';
export const PRODUCTS_ERROR = 'PRODUCTS_ERROR';
export const ADD_TO_CART = 'ADD_TO_CART';
export const UPDATE_CART = 'UPDATE_CART';
export const DELETE_ITEM = 'DELETE_ITEM';
export const UPDATE_QUANTITY ='UPDATE_QUANTITY';
export const GET_CATEGORIES ='GET_CATEGORIES';

export const fetchProducts = () => async dispatch => {
    
    try{
        const res = await axios.get(`https://fakestoreapi.com/products`)
        dispatch( {
            type: GET_PRODUCTS,
            payload: res.data
        })
    }
    catch(error){
        dispatch( {
            type: PRODUCTS_ERROR,
            payload: error,
        })
    }

}
export const addToCart= (id)=>{
    return{
        type: ADD_TO_CART, 
         id 
    }
}

export const fetchCategories = () => async dispatch => {
        
    try{
        const res = await axios.get(`https://fakestoreapi.com/products/categories`)
        dispatch( {
            type: GET_CATEGORIES,
            payload: res.data
        })
    }
    catch(error){
        dispatch( {
            type: PRODUCTS_ERROR,
            payload: error,
        })
    }
}

export const updateQuantity = ({id, quantity}) =>{
    return{
        type: UPDATE_QUANTITY,
        payload: ({id:id, quantity:quantity})
    }
}

export const deleteItem = (id) => {
    return{
        type: DELETE_ITEM, 
         id 
    }
}

/* export const addToCart = ({id, date}) => async dispatch => {
    
    try{
        const res = await axios.post(`https://fakestoreapi.com/carts` ,{
            method:"POST",
            body:JSON.stringify(
                {
                    userId:5,
                    date:date,
                    products:[{productId:id,quantity:1}]
                }
            )
        })
        console.log("ADD To Cart sucess>>" + res.data);
        dispatch( {
            type: ADD_TO_CART,
            payload: res.data
        })
    }
    catch(error){
        dispatch( {
            type: PRODUCTS_ERROR,
            payload: error,
        })
    }

} */