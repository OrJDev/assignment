import express from 'express';
import InitApp from './middlewares';
import dotenv from 'dotenv';
import path from 'path';

dotenv.config({ path: path.join(__dirname, './.env') });
const app = express();
const PORT = process.env['PORT'] || 4000;

InitApp(app);

app.listen(PORT, () => {
    console.log(`http://localhost:${PORT}`)
});
