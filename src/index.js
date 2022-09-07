import express from 'express';
import userRouter from './routers/users.js';
import taskRouter from './routers/tasks.js';
import { Tasks } from './models/tasks.js';
import { User } from './models/user.js'
import auth from './middleware/auth.js'
import './db/mongoose.js';

const app = express();
const port = process.env.PORT;

//app.use(auth);

app.use(express.json());
app.use(userRouter);
app.use(taskRouter);

app.listen(port, () => {
    console.log('Server is up on port ', port);
})
