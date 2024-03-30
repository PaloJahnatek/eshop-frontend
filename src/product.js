import {useState} from "react";

function Product({product, onClickHandler}) {

    const [isInCart, setIsInCart] = useState(false)

    return (<div style={{
        width: "190px",
        border: "1px solid black",
        display: "flex",
        flexDirection: "column",
        margin: "5px",
        padding: "5px"
    }}>
        <h2>{product.name}</h2>
        <div><img src={product.image} height={150} width={175}/></div>
        <div>{product.price} €</div>
        <div>{isInCart && "In Cart"}</div>
        <button onClick={() => {
            setIsInCart(true)
            onClickHandler(product)
        }}>Buy
        </button>
    </div>)
}

export default Product;