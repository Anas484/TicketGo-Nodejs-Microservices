import "dotenv/config";
import express from 'express';
import AuthRouter from './routes/AuthRouter.js';
const app = express();
app.use(express.json());
app.use('/auth', AuthRouter);
app.listen(process.env.PORT || 3000, () => {
    console.log(`Server started on port ${process.env.PORT}`);
});
//# sourceMappingURL=index.js.map