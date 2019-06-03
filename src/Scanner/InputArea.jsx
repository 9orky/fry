import React from 'react';
import InputGroup from 'react-bootstrap/InputGroup'
import FormControl from 'react-bootstrap/FormControl'
import Button from 'react-bootstrap/Button';
import "./InputArea.css"

class InputArea extends React.Component{

    onSubmitHandler = (event) => {
        console.log(event.target.value);
        event.preventDefault();
        this.props.getProduct();
    };

    render() {
        return (
            <div className="input-area">
                <FormControl className="form-control-scanner"
                    placeholder="Wpisz kod zamówienia"
                    aria-label="Default"
                    aria-describedby="inputGroup-sizing-default"/>
                <Button
                    variant={"light"}
                    onClick={this.onSubmitHandler}
                >OK</Button>
            </div>
        );
    }
}

export default InputArea;