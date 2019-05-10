// import jsQR from 'jsQR';

// console.log("1", 'function' === typeof importScripts)
if( 'function' === typeof importScripts) {
    importScripts("jsQR.js");
    // addEventListener('message', onMessage);
    // console.log(2)
    addEventListener('message', (event) => {
        const date = new Date();
        try {
            // console.log(event.data);
            const { data, width, height } = event.data;
            const start = date.getMilliseconds();
            const code = jsQR(data, width, height);
            console.log(start, date.getMilliseconds());
            // console.log(height, width);
            // console.log(code);
            self.postMessage(code);
            // console.log('OK')
        } catch (error) {
            console.log(error);
        }
    });
}
