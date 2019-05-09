self.addEventListener('message', (event) => {
    console.log(event.data);
    self.postMessage({});
});