import "dotenv/config"
import express from 'express'
import AuthRouter from './routes/AuthRouter.js'
import AdminRouter from './routes/AdminRouter.js'

const app = express()

app.use(express.json())


app.use('/auth', AuthRouter)
app.use('/admin', AdminRouter)

app.listen(process.env.PORT || 3000, () => {
    console.log(`Server started on port ${process.env.PORT}`)
})