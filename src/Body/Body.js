import React from 'react';
import "./Body.css"
import Camera from "../Camera/Camera"

class Body extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            products: []
        };
    }

    componentDidMount() {
        this.getProduct()
    }

    getProduct() {
        fetch("https://private-595cf-zitrafry.apiary-mock.com/api/deliveries/{deliveryId}/products")
            .then(resp => resp.json())
            .then(resp => this.setState({products: resp}))
    }

    render() {
        return(
            <div className="Body">
                <h1>Zeskanuj kod QR</h1>
                <Camera/>
                <h3>Zamówienie:</h3>
                <ul>
                    {this.state.products.map((item, index) => {
                        return (
                            <div key={index}>
                                <li>{item.name}</li>
                            </div>
                        )})
                    }
                </ul>

            </div>)
    }
}

export default Body;