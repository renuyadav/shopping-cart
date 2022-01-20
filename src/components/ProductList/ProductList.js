import React, {useState, useEffect} from 'react';
import ProductTile from '../ProductTile/ProductTile';
import {Container, Row, Col, Button} from 'react-bootstrap';
import { useSelector, useDispatch } from 'react-redux'

import './ProductList.scss';
import {fetchProducts, fetchCategories} from '../../store/actions/cartActions';


export default function ProductList() {
   const cartData = useSelector((store) => 
        store.cartData
    );

    const {items, categories} = cartData

    const dispatch = useDispatch()
    const [products, setProducts] = useState([]);
    const [category, setCategory] = useState('');
    const [q, setQ] = useState('');
    
    useEffect(() => {
       /* const axiosPosts = async () => {
          const response = await axios('https://fakestoreapi.com/products');
          setProducts(response.data);
         // dispatch(setProducts(response.data));
         dispatch(setProducts([{test:'123'}]))
        };
        axiosPosts();*/
        dispatch(fetchProducts());
        dispatch(fetchCategories());
      }, [dispatch]);
    
    function filterCategory(event, category) {
        console.log("filter category>>>" + category);
        setCategory(category);
    }
    function filterProducts(event) {
        setQ(event.target.value);
    }
    return (
        <Container fluid>
        <Row>
        <header className="header-container">    
        <div className="search-wrapper">
           <label htmlFor="search-form">
                <input type="search" name="search-form" id="search-form" className="search-input" placeholder="Search for products" value={q}
                                    onChange={filterProducts}/>
                <span className="sr-only"> Search products</span>
            </label>
        </div>
        </header>
        </Row>
        <Row className = "main-container">
        <Col xs={12} md={3} className="mb-4 product-filters"> 
            <h5>Filters</h5>
            <div className="btn-group product-category-group" role="group" aria-label="Basic button  group example">
                <button key={category} className={`product-category-btn btn btn-transparent gap-2 ${category === '' ? 'active' : ''}`} onClick={(event) => filterCategory(event, '')} value={category}>All</button>

                {categories.map(objCategory => (
                    <button key={objCategory} className={`product-category-btn btn btn-transparent gap-2 ${objCategory === category ? 'active' : ''}`} onClick={(event) => filterCategory(event,objCategory)} >{objCategory}</button>
                ))}  
            </div>
        </Col>  
        <Col className="product-list-wrapper">
            <Row className="product-list">
            {
                items.filter(product => (
                    category === '' ? product.title.toLowerCase().includes(q.toLowerCase()) : product.title.toLowerCase().includes(q.toLowerCase()) && (product.category === category))
                    
                    ).map((filteredproduct) => {
                    return <ProductTile key={filteredproduct.id} product={filteredproduct}></ProductTile>
                })
            }
            </Row>
        </Col>
        </Row>

        </Container>
    )
}
