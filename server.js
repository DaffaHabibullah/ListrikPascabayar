const app = require('./index');

app.listen(9000, () => {
    console.log('Server berjalan di http://localhost:9000!');
}).on('error', (err) => {
    console.log('Server error: ', err);
});