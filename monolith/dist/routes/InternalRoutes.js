import { Router } from "express";
import { updateSeatsInternal } from "../controllers/InternalController.js";
const InternalRouter = Router();
InternalRouter.post("/updateSeatStatus", updateSeatsInternal);
export default InternalRouter;
//# sourceMappingURL=InternalRoutes.js.map