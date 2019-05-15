/* eslint-disable no-restricted-globals */
import jsQR from 'jsqr';

self.addEventListener('message', (event) => {
    if (!event) {
        return;
    }

    const date = new Date();
    try {
        // console.log(event.data);
        const { data, width, height } = event.data;
        const start = date.getMilliseconds();
        const code = jsQR(data, width, height);

        console.log(start, date.getMilliseconds());

        self.postMessage(code);
    } catch (error) {
        console.log(error);
    }
});




