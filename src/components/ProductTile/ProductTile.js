import React, {useState, useEffect} from 'react';
import { useSelector, useDispatch } from 'react-redux';
import {Row, Col, Button} from 'react-bootstrap';
import {addToCart} from '../../store/actions/cartActions';
import ProductRating from '../ProductRating/ProductRating';

import './ProductTile.scss';
import LazyLoad from 'react-lazyload';
import { Spinner } from '../Spinner/Spinner';
export default function ProductTile(props) {

    const{ id, title, image, price, rating }  = props.product;

    const dispatch = useDispatch();
    
    let d = new Date();
    let formattedDate = `${d.getFullYear()}-${d.getMonth() + 1}-${d.getDate()}`;

    function handleClick(event) {
        console.log("AddTo cart clicked>>>" + event.currentTarget.getAttribute("data-product-id"));

        dispatch(addToCart(event.currentTarget.getAttribute("data-product-id")));

    }

    return (
        <Col xs={6} md={3} className="product-tile">
            <div className="product-tile__media">
          
                <LazyLoad className="product-tile__media-container" height={100}
                    offset={100} placeholder={<Spinner />} once>
                <img className="product-tile__image" src= {image} alt="product image"/>
                </LazyLoad>
 
            </div>
            <div className="product-tile__content">
                <div className="product-tile__content-section product-tile__title">{title}</div>
                <ProductRating rating={rating}></ProductRating>
                <div className="product-tile__content-section product-tile__price">${price}</div>
            </div>
            <Button variant="dark" className="product-tile__addToCart" value="Add To Cart" data-product-id= {id} onClick={handleClick}>Add To Cart</Button>
               
            
        </Col>
    )
}
