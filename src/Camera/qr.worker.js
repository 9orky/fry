/* eslint-disable no-restricted-globals */
import jsQR from 'jsqr';

addEventListener('message', (event) => {
    if (!event) {
        return;
    }

    try {
        const { data, width, height } = event.data;

        const code = jsQR(data, width, height, {
            inversionAttempts: "dontInvert"
        });
        console.log(code, width, height);
    } catch (error) {
        console.log(error);
    }
});




