import React from 'react';
import './DeliveryRoute.css';
import history from "../history"

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
        fetch("https://private-595cf-zitrafry.apiary-mock.com/deliverers/api/routes")
            .then(response => response.json())
            .then(route => this.setState({pickUpPoints: route.pickUpPoints}));
    }

    checkIn() {
        fetch("https://private-595cf-zitrafry.apiary-mock.com/deliverers/api/pick-up-points/pickUpPointId/check-ins",
            {method: "post"})
            .catch();
            history.push("/skaner")
    }

    render() {
        return (
            <div className="list-group">
                <div className="list-group-item list-group-item-secondary">
                    Adresy dostaw
                </div>
                <div className="list-group">
                    {this.state.pickUpPoints.map((pickUpPoint, index) => {
                        return (
                                <div key={index}>
                                    <li className="list-group-item list-group-item-action flex">
                                        {pickUpPoint.street} {pickUpPoint.biuldingNumber}<br/>
                                        {pickUpPoint.postalCode} {pickUpPoint.city}
                                        <button
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
