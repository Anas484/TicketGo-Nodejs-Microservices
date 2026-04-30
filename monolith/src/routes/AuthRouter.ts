import {Router} from "express"
import {signup, login} from "../controllers/AuthController.js"

const AuthRouter = Router()


AuthRouter.post("/signup", signup)
AuthRouter.post("/login", login)

export default AuthRouter