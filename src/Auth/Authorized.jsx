import {useEffect} from 'react';
import history from '../Service/history';

const Authorized = (props) => {

    useEffect(() => {
        if (!props.loggedIn) {
            history.push('/fry/login');
        }
    }, [props]);


    if (props.loggedIn) {
        return props.children;
    }

    return null;
};

export default Authorized;