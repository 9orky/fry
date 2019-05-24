import React from 'react';
import "./Scanner.css";
import ListGroup from 'react-bootstrap/ListGroup';
import Camera from "./Camera/Camera";
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
                <ListGroup>
                    <ListGroup.Item variant="secondary">Zamówienie</ListGroup.Item>
                    {this.state.products.map((item, index) => {
                        return (
                            <div key={index}>
                                <ListGroup.Item variant="action">{item.name}</ListGroup.Item>
                            </div>
                        )})
                    }
                </ListGroup>
            </div>
        )
    }
}

export default Scanner;