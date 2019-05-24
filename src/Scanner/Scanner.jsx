import React from 'react';
import "./Scanner.css"
import Camera from "./Camera/Camera"
import http from "../http";

class Scanner extends React.Component {
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
        http
            .get("/deliverers/api/deliveries/deliveryId/products")
            .then(response => this.setState({products: response.data}))
    }

    render() {
        return(
            <div className="scanner">
                <Camera/>
                <div className="list-group">
                    <p className="list-group-item list-group-item-secondary">Zamówienie</p>
                    {this.state.products.map((item, index) => {
                        return (
                            <div key={index}>
                                <li className="list-group-item list-group-item-action">{item.name}</li>
                            </div>
                        )})
                    }
                </div>

            </div>)
    }
}

export default Scanner;