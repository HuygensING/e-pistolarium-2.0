#!/usr/bin/env node

import 'isomorphic-fetch';
import * as express from 'express';
import * as bodyParser from 'body-parser';
import * as cors from 'cors';
import addSearchInterface from './add-search-interface';
import addLetterInterface from './add-letter-interface';

const app = express();
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));
app.use(cors());

const state = new Map();

addSearchInterface(app, state);
addLetterInterface(app, state);

const port = 3999;
app.listen(port, () => console.log(`Listening on port ${port}!`));
