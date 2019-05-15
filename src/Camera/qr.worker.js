/* eslint-disable no-restricted-globals */
import jsQR from 'jsqr';

self.addEventListener('message', (event) => {
    if (!event) {
        return;
    }

    try {
        const { data, width, height } = event.data;
        const code = jsQR(data, width, height);

        if (code) {
            self.postMessage(code);
        }
    } catch (error) {
        console.log(error);
    }
});




