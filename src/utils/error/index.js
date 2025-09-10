"use strict";
var __extends = (this && this.__extends) || (function () {
    var extendStatics = function (d, b) {
        extendStatics = Object.setPrototypeOf ||
            ({ __proto__: [] } instanceof Array && function (d, b) { d.__proto__ = b; }) ||
            function (d, b) { for (var p in b) if (Object.prototype.hasOwnProperty.call(b, p)) d[p] = b[p]; };
        return extendStatics(d, b);
    };
    return function (d, b) {
        if (typeof b !== "function" && b !== null)
            throw new TypeError("Class extends value " + String(b) + " is not a constructor or null");
        extendStatics(d, b);
        function __() { this.constructor = d; }
        d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
    };
})();
Object.defineProperty(exports, "__esModule", { value: true });
exports.BadRequestException = exports.NotAuthorizedException = exports.NotFoundException = exports.ConflictException = exports.AppError = void 0;
var AppError = /** @class */ (function (_super) {
    __extends(AppError, _super);
    function AppError(message, statuscode) {
        var _this = _super.call(this, message) || this;
        _this.statuscode = statuscode;
        return _this;
    }
    return AppError;
}(Error));
exports.AppError = AppError;
var ConflictException = /** @class */ (function (_super) {
    __extends(ConflictException, _super);
    function ConflictException(message) {
        return _super.call(this, message, 409) || this;
    }
    return ConflictException;
}(AppError));
exports.ConflictException = ConflictException;
var NotFoundException = /** @class */ (function (_super) {
    __extends(NotFoundException, _super);
    function NotFoundException(message) {
        return _super.call(this, message, 404) || this;
    }
    return NotFoundException;
}(AppError));
exports.NotFoundException = NotFoundException;
var NotAuthorizedException = /** @class */ (function (_super) {
    __extends(NotAuthorizedException, _super);
    function NotAuthorizedException(message) {
        return _super.call(this, message, 401) || this;
    }
    return NotAuthorizedException;
}(AppError));
exports.NotAuthorizedException = NotAuthorizedException;
var BadRequestException = /** @class */ (function (_super) {
    __extends(BadRequestException, _super);
    function BadRequestException(message) {
        return _super.call(this, message, 400) || this;
    }
    return BadRequestException;
}(AppError));
exports.BadRequestException = BadRequestException;
