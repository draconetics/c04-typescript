"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const cors_1 = __importDefault(require("cors"));
const morgan_1 = __importDefault(require("morgan"));
const note_routes_1 = __importDefault(require("./routes/note.routes"));
const error_middleware_1 = require("./middleware/error.middleware");
const notFound_middleware_1 = require("./middleware/notFound.middleware");
const app = express_1.default();
// middlewares
app.use(morgan_1.default('dev'));
app.use(cors_1.default());
app.use(express_1.default.urlencoded({ extended: false }));
app.use(express_1.default.json());
app.use(note_routes_1.default);
app.get('/', (req, res) => {
    return res.send(`The API is at http://localhost:${app.get('port')}`);
});
app.use(error_middleware_1.errorHandler);
app.use(notFound_middleware_1.notFoundHandler);
const { PORT } = require('./config/portConfig');
const db = require('./config/db');
db.connect()
    .then(() => {
    console.log('database connected..');
    app.listen(PORT, () => {
        console.log(`Listening on http://localhost:${PORT} with typescript`);
    });
});
module.exports = app;
