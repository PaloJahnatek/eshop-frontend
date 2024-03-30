import './App.css';
import Product from "./product";
import {useEffect, useState} from "react";
import ProductForm from "./product-form";
import {Link} from 'react-router-dom';
import {BrowserRouter as Router, Routes, Route} from 'react-router-dom';


function App() {


    const [sortBy, setSortBy] = useState("id");
    const [page, setPage] = useState(0);
    const [cart, setCart] = useState([]);
    const [data, setData] = useState([]);
    const [isPending, setIsPending] = useState(true);
    const [error, setError] = useState();

    const onNewProductHandler = (product) => {
        const newData = [...data];
        newData.push(product);
        console.log(newData);
        setData(newData);
    };


    useEffect(() => {
        setTimeout(() => {
                fetch(`${process.env.REACT_APP_TARGET_SHOP_DOMAIN}/products?pageNumber=${page}&sortBy=${sortBy}`)
                    .then(response => {
                        if (response.ok) {
                            return response.json()
                        }
                        throw new Error(`Unable to get data: ${response.statusText}`)
                    })
                    .then(json => setData(json))
                    .catch((err) => setError(err.message))
                    .finally(() => setIsPending(false))
            }
            , 10)
    }, [page, sortBy]);


    const addToCartHandler = function (product) {
        const newCart = [...cart]
        newCart.push(product)
        console.log(newCart)
        setCart(newCart)
    };
    const removeFromCartHandler = function (product) {
        const newCart = [...cart];
        const productIndex = newCart.findIndex(item => item.id === product.id)
        newCart.splice(productIndex, 1)
        setCart(newCart)
    };

    return (
        <Router>
            <div className="App">
                <nav>
                    <ul>
                        <li>
                            <Link to="/">Home</Link>
                        </li>
                        <li>
                            <Link to="/edit-product">Edit product</Link>
                        </li>
                        <li>
                            <Link to="/cart">Cart</Link>
                        </li>
                    </ul>
                </nav>
                <Routes>
                    <Route
                        path="/cart"
                        element={
                            <div>
                                <h1>Shopping cart</h1>
                                {cart.map((item) => (
                                    <div key={item.id}>{item.name}
                                        <button onClick={() => removeFromCartHandler(item.id)}>x</button>
                                    </div>
                                ))}
                            </div>
                        }
                    />
                    <Route
                        path="/edit-product"
                        element={<ProductForm onNewProduct={onNewProductHandler}/>}
                    />
                    <Route
                        path="/"
                        element={
                            <div>
                                <div>
                                    <button onClick={() => setSortBy("price")}>By price</button>
                                    <button onClick={() => setSortBy("name")}>By name</button>
                                </div>
                                {!isPending && <div>{cart.length}</div>}
                                {isPending && 'Loading data...'}
                                {error && <div>{error}</div>}
                                {!isPending && (
                                    <div style={{display: 'flex', flexWrap: 'wrap', margin: '5px'}}>
                                        {data.map((item) => (
                                            <Product key={item.id} product={item} onClickHandler={addToCartHandler}/>
                                        ))}
                                    </div>
                                )}
                                <div>
                                    {page}
                                    <button onClick={() => setPage(page - 1)}>Prev</button>
                                    <button onClick={() => setPage(page + 1)}>Next</button>
                                </div>
                            </div>
                        }
                    />
                </Routes>
            </div>
        </Router>
    );
}

export default App;
