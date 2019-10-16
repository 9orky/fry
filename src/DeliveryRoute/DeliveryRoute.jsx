import React, {useState, useEffect} from 'react';
import styles from './DeliveryRoute.module.css';
import Button from 'react-bootstrap/Button';
import ListGroup from 'react-bootstrap/ListGroup';
import {http} from '../Service/http';

const DeliveryRoute = (props) => {
   const [route, setRoute] = useState("");
   const [visitedPickUpPoints, setVisitedPickUpPoints] = useState([]);


    useEffect((props) => {
        http
            .get(`/deliverers/stores/${props.store.id}/routes`)
            .then(response => {
                setRoute(response.data);
                getVisitedPickupPoints(props.store.id, response.data.id)
            });
    }, [props]);


    const checkIn = (storePickUpPointId) => {
        const storeId = props.store.id;
        const routeId = route.id;

        http
            .post(`/deliverers/stores/${storeId}/routes/${routeId}/check-ins`, {storePickUpPointId})
            .then(() => {
                getVisitedPickupPoints(storeId, routeId)
            })
            .catch(() => alert('Już wysłałeś powiadomienia'));
    };

    const getVisitedPickupPoints = (storeId, routeId) => {
        http
            .get(`/deliverers/stores/${storeId}/routes/${routeId}/check-ins`)
            .then((response) => {
                if (response.data.length) {
                    const visited = response.data.map((visitedPickUpPoint) => {
                        return visitedPickUpPoint.storePickUpPointId;
                    });
                    setVisitedPickUpPoints(visited)
                }
            })
            .catch();
    };

    return (
        <ListGroup>
            <ListGroup.Item variant="secondary">
                Adresy dostaw
            </ListGroup.Item>
            <ListGroup  className={styles.routeScroll}>
                {route && route.pickUpPoints.map((pickUpPoint, index) => {
                    return (
                        <ListGroup key={index}>
                            <ListGroup.Item
                                variant="action"
                                className={styles.flex}>
                                <div className={styles.pickUpPoint}>
                                    {pickUpPoint.street} {pickUpPoint.buildingNumber}<br/>
                                    {pickUpPoint.postalCode} {pickUpPoint.city}
                                </div>
                                <Button
                                    variant={"primary"}
                                    disabled={visitedPickUpPoints.includes(pickUpPoint.id)}
                                    onClick={(e) => {
                                        e.preventDefault();
                                        window.confirm("Czy na pewno chcesz wysłać powiadomienia do klientów?");
                                        checkIn(pickUpPoint.id);
                                    }}>Już jestem!</Button>
                            </ListGroup.Item>
                        </ListGroup>
                    )
                })}
            </ListGroup>
        </ListGroup>
    )
};

export default DeliveryRoute;
