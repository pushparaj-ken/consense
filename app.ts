import express from "express";
import path from "path";
import cors from "cors";
import bodyParser from "body-parser"
import cookieParser from "cookie-parser";
import { errorHandler } from "./utils/ApiError";
import { generateSwagger, serveSwagger } from './swagger/swagger';

// Users routes
import userRoutes from "./routes/user/user.routes";
import vehicleRoutes from "./routes/user/vehicle.routes";

// Admin Routes
import roleRoutes from "./routes/admin/role.routes";
import adminRoutes from "./routes/admin/admin.routes";
import customersRoutes from "./routes/admin/customers.routes";
import driverRoutes from "./routes/admin/driver.routes";
import vehicleAdminRoutes from "./routes/admin/vehicle.routes";
import locationRoutes from "./routes/admin/location.routes";

import { startSchedulers } from "./schedulers/schedulers";

// Fleet Routes
import fleetUserRoutes from "./routes/fleet/user.routes"
import fleetBookingRoutes from "./routes/fleet/booking.routes"

const app = express();

const routes = ['./swagger/user/*.ts'];

const swaggerSpec = generateSwagger('CONSENSE USER', '1.0.0', routes);

serveSwagger(app, swaggerSpec, '/api/user/docs');

const routes2 = ['./swagger/admin/*.ts'];

const swaggerSpec2 = generateSwagger('CONSENSE ADMIN', '1.0.0', routes2);

serveSwagger(app, swaggerSpec2, '/api/admin/docs');


const routesFleet = ['./swagger/fleet/*.ts'];

const swaggerSpecFleet = generateSwagger('CONSENSE FLEET', '1.0.0', routesFleet);

serveSwagger(app, swaggerSpecFleet, '/api/fleet/docs');

app.use(cors({
  origin: ['http://localhost:4000', 'http://localhost:4200', 'https://consense.smcmtechnologies.com', 'http://consense.smcmtechnologies.com']
}));

app.use(express.json());
app.use(errorHandler);
app.use(express.urlencoded({ extended: true }));
app.use(bodyParser.urlencoded({ extended: true }));
app.use(cookieParser());
app.set('views', path.join(__dirname, 'views'));
app.use(express.static(path.join(__dirname, 'public')));
app.set('view engine', 'pug');

// Users routes
app.use('/api/users', userRoutes);
app.use('/api/users/vehicle', vehicleRoutes);

// Admin Routes
app.use('/api/admin/roles', roleRoutes);
app.use('/api/admin', adminRoutes);
app.use('/api/admin/customers', customersRoutes);
app.use('/api/admin/driver', driverRoutes);
app.use('/api/admin/vehicle', vehicleAdminRoutes);
app.use('/api/admin/location', locationRoutes);

// Fleet Routes
app.use('/api/fleet', fleetUserRoutes);
app.use('/api/fleet/booking', fleetBookingRoutes);

startSchedulers();

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
