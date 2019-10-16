import React, {useState} from 'react';
import InputGroup from 'react-bootstrap/InputGroup'
import FormControl from 'react-bootstrap/FormControl'
import Button from 'react-bootstrap/Button';
import styles from "./InputArea.module.css";

const InputArea = (props) => {
    const [code, setCode] = useState("");

    const onSubmitHandler = (event) => {
        event.preventDefault();
        if (code.length !== 8) {
            alert("Kod zamówienia powinien mieć 8 znaków")
        } else {
            props.onCodeTyped(code);
        }
    };

    return (
        <div className={styles.inputArea}>
            <InputGroup>
                <FormControl
                    className={styles.formControlScanner}
                    placeholder="Wpisz kod zamówienia"
                    aria-label="Default"
                    aria-describedby="inputGroup-sizing-default"
                    onChange={(e) => {setCode(e.target.value)}}
                />
                <InputGroup.Append>
                    <Button
                        variant={"outline-secondary"}
                        onClick={onSubmitHandler}
                    >OK</Button>
                </InputGroup.Append>
            </InputGroup>

        </div>
    );
};

export default InputArea;