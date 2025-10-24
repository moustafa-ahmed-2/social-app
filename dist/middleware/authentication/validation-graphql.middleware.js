"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.isValidGraphql = void 0;
const error_1 = require("../../utils/error");
const isValidGraphql = (schema, args) => {
    let data = args;
    const result = schema.safeParse(args);
    if (result.success == false) {
        let errorMessages = result.error.issues.map(issue => {
            return {
                path: issue.path[0],
                message: issue.message
            };
        });
        console.log(errorMessages);
        let errormessageStrings = JSON.stringify(errorMessages);
        throw new error_1.BadRequestException(errormessageStrings);
    }
};
exports.isValidGraphql = isValidGraphql;
