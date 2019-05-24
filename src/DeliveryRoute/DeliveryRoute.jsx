import React from 'react';
import './DeliveryRoute.css';
import history from "../history"
import http from '../http';

class DeliveryRoute extends React.Component{
    constructor(props) {
        super(props);
        this.state = {
            pickUpPoints: []
        };
    }

    componentDidMount() {
        this.getPickUpPoints()
    }

    getPickUpPoints() {
        http
            .get("/deliverers/api/routes")
            .then(route => {
                this.setState({pickUpPoints: route.data.pickUpPoints})
            });
    }

    checkIn() {
        http
            .post("/deliverers/api/pick-up-points/pickUpPointId/check-ins", {method: "post"})
            .catch();

            history.push("/skaner")
    }

    render() {
        console.log(this.state)
        return (
            <div className="list-group">
                <div className="list-group-item list-group-item-secondary">
                    Adresy dostaw
                </div>
                <div className="list-group">
                    {this.state.pickUpPoints.length && this.state.pickUpPoints.map((pickUpPoint, index) => {
                        return (
                            <div key={index}>
                                <li className="list-group-item list-group-item-action flex">
                                    {pickUpPoint.street} {pickUpPoint.biuldingNumber}<br/>
                                    {pickUpPoint.postalCode} {pickUpPoint.city}
                                    <button
                                        disabled={pickUpPoint.visited}
                                        onClick={this.checkIn}
                                        className="btn btn-primary">Już jestem!
                                    </button>
                                </li>
                            </div>
                        )
                    })}
                </div>
            </div>
        );
    }
}

export default DeliveryRoute;
