import React from 'react';
import './DeliveryRoute.css';

class DeliveryRoute extends React.Component{
    render() {
        return (
            <div className="list-group">
                <div className="list-group-item list-group-item-secondary">
                    Adresy dostaw
                </div>
                <div className="list-group">
                    <div className="list-group-item">
                        <div className="flex">
                            <p >Warsaw Spire,<br/>Plac Europejski 1<br/>00-844 Warszawa</p>
                            <a href="#" className="btn btn-primary">Już jestem!</a>
                        </div>

                    </div>
                </div>
            </div>
        );
    }
}

export default DeliveryRoute;
