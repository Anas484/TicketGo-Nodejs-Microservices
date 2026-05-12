import "dotenv/config";
import express from 'express';
import AuthRouter from './routes/AuthRouter.js';
import AdminRouter from './routes/AdminRouter.js';
import UserRouter from './routes/UserRouter.js';
// import { connectRedis } from "./configs/redisConfig.js"
import cors from 'cors';
const app = express();
app.use(cors({
    origin: "http://localhost:3000",
    credentials: true
}));
// (() => {
//     connectRedis();
// })()
app.use(express.json());
app.use('/auth', AuthRouter);
app.use('/admin', AdminRouter);
app.use('/user', UserRouter);
app.listen(process.env.PORT || 3000, () => {
    console.log(`Server started on port ${process.env.PORT}`);
});
//# sourceMappingURL=index.js.map