import { config } from 'dotenv';
import express from 'express';
import { Server } from 'http';
import sio from 'socket.io';
import { connect } from 'mongoose';
import cookieParser from 'cookie-parser';

import authRoutes from './routes/auth';
import userRoutes from './routes/user';
import check_token from './routes/guard';

config();

connect(`mongodb+srv://app:${process.env.MONGOPW}@livemood.a56qt.azure.mongodb.net/${process.env.DBNAME}?retryWrites=true&w=majority`, { useNewUrlParser: true, useUnifiedTopology: true });

const app = express();

app.use(cookieParser());
app.use(express.json());

app.use(authRoutes);
app.use('/user', check_token);
app.use('/user', userRoutes);

const server = Server(app);

const io = sio(server);

server.listen(process.env.PORT);
