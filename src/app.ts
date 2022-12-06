import createError, { HttpError } from 'http-errors';
import express, { Request, Response, NextFunction } from 'express';
import path from 'path';
import cookieParser from 'cookie-parser';
import logger from 'morgan';
import swaggerUI from 'swagger-ui-express';
import YAML from 'yamljs';
import cors from 'cors';
import db from './config/dbConfig';
import corsOptions from './config/corsConfig';
import indexRouter from './routes/index';
import usersRouter from './routes/users';
import riderRouter from './routes/riderRoute';
import clientRouter from './routes/clientRoute';

const app = express();

const swaggerDoc = YAML.load('./document.yaml');

app.use(cors(corsOptions));
app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));
db.sync({
  // force: true,
})
  .then(() => {
    // eslint-disable-next-line no-console
    console.log('Database connected successfully');
  })
  // eslint-disable-next-line no-console
  .catch((err) => console.log(err));

app.use('/', indexRouter);
app.use('/user', usersRouter);
app.use('/rider', riderRouter);
app.use('/client', clientRouter);

app.use('/api/doc', swaggerUI.serve, swaggerUI.setup(swaggerDoc));

// catch 404 and forward to error handler
app.use(function (req: Request, res: Response, next: NextFunction) {
  next(createError(404));
});

// error handler
app.use(function (err: HttpError, req: Request, res: Response) {
  // set locals, only providing error in development
  res.locals.message = err.message;
  res.locals.error = req.app.get('env') === 'development' ? err : {};

  res.status(err.status || 500);
  res.json({ msg: res.locals.message, error: res.locals.error });
});

export default app;
