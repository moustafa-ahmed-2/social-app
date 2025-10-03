"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.BadRequestException = exports.NotAuthorizedException = exports.NotFoundException = exports.ForBiddenException = exports.ConflictException = exports.AppError = void 0;
class AppError extends Error {
    statusCode;
    errorDetails;
    constructor(message, statusCode, errorDetails) {
        super(message);
        this.statusCode = statusCode;
        this.errorDetails = errorDetails;
    }
}
exports.AppError = AppError;
class ConflictException extends AppError {
    constructor(message, errorDetails) {
        super(message, 409, errorDetails);
    }
}
exports.ConflictException = ConflictException;
class ForBiddenException extends AppError {
    constructor(message, errorDetails) {
        super(message, 403, errorDetails);
    }
}
exports.ForBiddenException = ForBiddenException;
class NotFoundException extends AppError {
    constructor(message, errorDetails) {
        super(message, 404, errorDetails);
    }
}
exports.NotFoundException = NotFoundException;
class NotAuthorizedException extends AppError {
    constructor(message, errorDetails) {
        super(message, 401, errorDetails);
    }
}
exports.NotAuthorizedException = NotAuthorizedException;
class BadRequestException extends AppError {
    constructor(message, errorDetails) {
        super(message, 400, errorDetails);
    }
}
exports.BadRequestException = BadRequestException;
