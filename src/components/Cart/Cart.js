import React from 'react';
import {useSelector,useDispatch} from 'react-redux'
import LazyLoad  from 'react-lazyload';
import { Spinner } from '../Spinner/Spinner';
import './Cart.scss';
import ProductRating from '../ProductRating/ProductRating';
import {updateQuantity, deleteItem} from '../../store/actions/cartActions';


export default function Cart() {
    const cartData = useSelector(state => state.cartData)
    const {addedItems, total, totalItems} = cartData

    const dispatch = useDispatch()

    function handleRemove(event, id) {
        console.log("event traget remove item>>" +  id );
        dispatch(deleteItem(id))
    }

    function Checkout(event) {
        console.log("Proceed to checkout");
    }

    function handleChange(event, id){
        console.log("event traget quantity change>>" + event.target.value +":::"+ id );
        dispatch(updateQuantity({id:id, quantity:event.target.value}))
    }

    const cartItems = () =>{
       return addedItems.map(item =>{
            const {image, title, description, price, quantity, id, rating} = item;

            return(
                <div className="cart-item row" key={id}>
                   <div className="cart-item__media col-4 col-md-2">
  
                        <LazyLoad className="cart-item__media-container" height={100}
                            offset={100} placeholder={<Spinner />} once>
                        <img className="cart-item__image" src= {image} alt="product image"/>
                        </LazyLoad>

                    </div>
                    <div className="cart-item__content col-8 col-md-8">
                        <div className="cart-item__content-section cart-item__title">{title}</div>
                        <div className="cart-item__content-section cart-item__desc color-secondary">{description}</div>
                        <ProductRating rating={rating}></ProductRating>
                        <div className="cart-item__content-section cart-item__actions">
                            <div className="cart-item__quantity">
                            <label>Quantity</label>                            
                            <select className="form-select" value={quantity} onChange={(event) => handleChange(event, id)}>
                            <option value="0">0 (Delete)</option>
                            <option value="1">1</option>
                            <option value="2">2</option>
                            <option value="3">3</option>
                            <option value="4">4</option>
                            <option value="5">5</option>
                            </select>
                            </div>
                            <button className="cart-item__remove btn btn-dark" onClick={(event)=>handleRemove(event,id)}>Remove</button>

                        </div>
                        
                    </div>
                    <div className="cart-item__content-section cart-item__price col-8 offset-4 offset-md-0 col-md-2">${price}</div>

                </div>    
            )
        })
    }
    
    return (
        <div className="row main-content">
        <div className="cart-wrapper col-md-9 col-12 ">
            
            <div class="cart-header">
                <div className="cart-header__title">Shopping Cart</div>
                <div className="cart-header__price color-secondary">Price</div>
            </div>
            <div className="cart-items" >
                {cartItems()}
            </div>
            <div className="cart-subTotal">
               {`subTotal (${totalItems} items:) $${total} `}
            </div>    
        </div>
        <div className="cart-summary col">
            <h5 className="order-summary">Order Summary</h5>
            <div className="cart-order-totals">
                <div className="SubTotal row my-2">
                    <div className="SubTotal__label col-6">{`subTotal (${totalItems} items:)`}</div>
                    <div className="SubTotal__price col-6 text-end">{`$${total}`}</div>
                </div>
                <div className="discount row my-2">
                    <div className="discount__label col-6">Discount:</div>
                    <div className="discount__price col-6 text-end">0</div>
                </div>
                <div className="shipping row my-2">
                    <div className="shipping__label col-6">Delivery Charges:</div>
                    <div className="shipping__price col-6 text-end">Free</div>
                </div>
                <div className="shipping row my-2">
                    <div className="shipping__label col-6 fw-bolder">Total Amount</div>
                    <div className="shipping__price col-6 text-end">{`$${total}`}</div>
                </div>
            </div>
            <button className="cart-item__checkout btn btn-dark" onClick={(event)=>Checkout()}>Checkout</button>

        </div>    
        </div>
    )
}
