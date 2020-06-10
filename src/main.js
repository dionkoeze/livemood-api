import { config } from 'dotenv';
import express from 'express';
import { Server } from 'http';
import sio from 'socket.io';
import { connect } from 'mongoose';

import authRoutes from './routes/auth';

config();

connect(`mongodb+srv://app:${process.env.MONGOPW}@livemood.a56qt.azure.mongodb.net/${process.env.DBNAME}?retryWrites=true&w=majority`, { useNewUrlParser: true, useUnifiedTopology: true });

const app = express();

app.use(express.json());

app.use(authRoutes);

const server = Server(app);

const io = sio(server);

server.listen(process.env.PORT);
