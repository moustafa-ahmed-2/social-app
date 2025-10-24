"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.appSchema = void 0;
const graphql_1 = require("graphql");
const query_js_1 = require("./module/Post/graphql/query.js");
const RootQuery = new graphql_1.GraphQLObjectType({
    name: "RootQuery",
    fields: {
        ...query_js_1.postQuery
    }
});
exports.appSchema = new graphql_1.GraphQLSchema({
    query: RootQuery
});
