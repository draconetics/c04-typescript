"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.notFoundHandler = void 0;
exports.notFoundHandler = (request, response) => {
    const message = "Resource not found";
    return response.status(404).send({ status: 404, message });
};
