import userRouter from '../routers/Userrouter.js';
import bookRouter from '../routers/Bookrouter.js';
import borrowingRouter from '../routers/Borrowingrouter.js';

export default function (app) {
  app.use('/api/v1', userRouter);
  app.use('/api/v1', bookRouter);
  app.use('/api/v1', borrowingRouter);
}
