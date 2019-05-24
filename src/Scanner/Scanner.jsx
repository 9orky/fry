import React from 'react';
import "./Scanner.css"
import Camera from "./Camera/Camera"

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
        fetch("https://private-595cf-zitrafry.apiary-mock.com/deliverers/api/deliveries/deliveryId/products")
            .then(response => response.json())
            .then(response => this.setState({products: response}))
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