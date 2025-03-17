import express from "express";
import path from "path";
import cors from "cors";
import bodyParser from "body-parser"
import cookieParser from "cookie-parser";
import { errorHandler } from "./utils/ApiError";
import { generateSwagger, serveSwagger } from './swagger/swagger';

import userRoutes from "./routes/user/user.routes";
import vehicleRoutes from "./routes/user/vehicle.routes";

const app = express();

const routes = ['./swagger/user/*.ts'];

const swaggerSpec = generateSwagger('CONSENSE', '1.0.0', routes);

serveSwagger(app, swaggerSpec, '/api/user/docs');

app.use(cors({
  origin: ['http://localhost:4000',]
}));

app.use(express.json());
app.use(errorHandler);
app.use(express.urlencoded({ extended: true }));
app.use(bodyParser.urlencoded({ extended: true }));
app.use(cookieParser());
app.set('views', path.join(__dirname, 'views'));
app.use(express.static(path.join(__dirname, 'public')));
app.set('view engine', 'pug');


app.use('/api/users', userRoutes);
app.use('/api/users/vehicle', vehicleRoutes);

app.use(function (req: any, res: any, next: any) {
  res.status(404);
  res.render('error', { errorMessage: 'Page Not Found' });
});

app.use(function (err: any, req: any, res: any, next: any) {
  const statusCode = err.statusCode || 500;
  return res.status(statusCode).json({
    success: false,
    code: statusCode,
    message: err.message || 'Internal Server Error',
    timestamp: new Date()
  });

});


export default app;
