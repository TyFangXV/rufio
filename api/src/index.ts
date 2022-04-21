import express from 'express';
import authRouter from './middleware/auth'
import cors from 'cors';

const app = express();

app.use(cors())
app.use("/auth", authRouter)

app.get("/", (req, res) => {
    res.send("Hello World!");
})


app.listen(3001, () => {
  console.log('Server is running on port 3001');
});
