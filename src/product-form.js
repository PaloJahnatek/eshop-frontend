import {useState} from "react";

function ProductForm(props) {

    const [productName, setProductName] = useState("");
    const [price, setPrice] = useState(0);
    const [image, setImage] = useState("");

    const [feedback, setFeedback] = useState();


    const onSubmitHandler = event => {
        event.preventDefault();

        const newProduct = {
            name: productName,
            price: price,
            image
        }

        fetch(`${process.env.REACT_APP_TARGET_SHOP_DOMAIN}/products`, {
            method: 'POST', // *GET, POST, PUT, DELETE, etc.
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(newProduct)// body data type must match "Content-Type" header
        }).then(response => response.json())
            .then(json => setFeedback(json))
            .finally(() => {
                props.onNewProduct(newProduct)
                setProductName("");
                setPrice(0);
                setImage("")
            });


    }

    return (
        <>
            <form onSubmit={onSubmitHandler}>
                <input type={"text"} value={productName} placeholder={"Name"} onChange={(event) => setProductName(event.target.value)}/>
                <input type={"text"} value={image} placeholder={"Image"} onChange={(event) => setImage(event.target.value)}/>
                <input type={"number"} value={price} placeholder={"Price"} onChange={(event) => setPrice(event.target.value)}/>
                <input type={"submit"}/>

            </form>

            {feedback && <div>{JSON.stringify(feedback)}</div>}

        </>
    )
}

export default ProductForm;