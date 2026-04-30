import "dotenv/config";
import express from 'express';
const app = express();
app.listen(process.env.PORT || 3000, () => {
    console.log(`Server started on port ${process.env.PORT}`);
});
//# sourceMappingURL=index.js.map