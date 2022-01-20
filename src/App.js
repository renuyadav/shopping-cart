import './App.scss';
import ProductList from './components/ProductList/ProductList';
import NavBar  from './components/NavBar/NavBar';
import {BrowserRouter as Router, Routes, Route} from 'react-router-dom';
import Cart from './components/Cart/Cart';
import About from './components/About/About';
import Services from './components/Services/Services';

function App() {
  return (
    <Router>

    <div className="App">
      <NavBar></NavBar>
      <Routes>
        <Route exact path="/" element={<ProductList/>} />

        <Route path="/cart" element={<Cart />}/>
        <Route path="/about" element={<About />}/>
        <Route path="/services" element={<Services />}/> 
      </Routes>
    </div>
    </Router>
  );
}

export default App;
