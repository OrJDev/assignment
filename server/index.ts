import express from 'express';
import InitApp from './middlewares';

const app = express();
const PORT = 4000;

InitApp(app);

app.listen(PORT, () => {
    console.log(`http://localhost:${PORT}`)
});
