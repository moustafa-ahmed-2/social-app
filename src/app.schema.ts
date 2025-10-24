


import { GraphQLObjectType, GraphQLSchema } from "graphql";
import { postQuery } from "./module/Post/graphql/query.js";

const RootQuery = new GraphQLObjectType({
  name: "RootQuery",
  fields: {
    ...postQuery
  }
});

export const appSchema = new GraphQLSchema({
  query: RootQuery
});























//  getPost:{},
//         getAllPosts:{},
//         getUser:{} ,
//         getUsers:{},
//         getComment:{},
//         getChat:{},
//         getChats:{},
//         getMessage:{},
//         getMessages:{}
        