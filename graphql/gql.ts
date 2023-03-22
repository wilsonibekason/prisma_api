import {
  GraphQLDirectiveExtensions,
  graphql,
  GraphQLArgs,
  GraphQLSchema,
  buildSchema,
  GraphQLObjectType,
  GraphQLInterfaceType,
  GraphQLUnionType,
  GraphQLEnumType,
  GraphQLInputObjectType,
  GraphQLString,
  GraphQLBoolean,
  GraphQLScalarTypeExtensions,
  GraphQLList,
  GraphQLInt,
  GraphQLNonNull,
} from "graphql";
import { graphqlHTTP } from "express-graphql";

var schemaold = buildSchema(`
  type Query {
    hello: String
  }
`);
interface TBooks {
  id: number;
  desc?: string;
  authorId: number;
  name: string;
}
const books: TBooks[] = [
  { id: 1, name: "Baasic Elelctronis", authorId: 1 },
  { id: 2, name: "Baasic Elelctronis", authorId: 2 },
  { id: 3, name: "Baasic Elelctronis", authorId: 3 },
  { id: 4, name: "Baasic Elelctronis", authorId: 4 },
  { id: 5, name: "Baasic Elelctronis", authorId: 5 },
  { id: 6, name: "Baasic Elelctronis", authorId: 6 },
  { id: 7, name: "Baasic Elelctronis", authorId: 7 },
];

const BookType = new GraphQLObjectType({
  name: "Book",
  description: "",
  fields: () => ({
    id: { type: new GraphQLNonNull(GraphQLInt) },
    desc: { type: GraphQLString },
    authorId: { type: new GraphQLNonNull(GraphQLInt) },
    name: { type: new GraphQLNonNull(GraphQLString) },
  }),
});

let RootQueryType = new GraphQLObjectType({
  name: "Query",
  description: "Root Query",
  fields: () => ({
    books: {
      type: new GraphQLList(BookType),
      description: "",
      resolve: () => books,
    },
  }),
});

let schema2 = new GraphQLSchema({
  query: new GraphQLObjectType({
    name: "HelloWorld",
    fields: () => ({
      message: {
        type: GraphQLString,
        description: "message item",
        resolve: () =>
          "Thank you very well, for me making my day and my night, i  hope to  working mre ",
      },
    }),
  }),
});

const schema = new GraphQLSchema({ query: RootQueryType });

let rootValue = { hello: () => "Hello World" };

var source = `{ hello }`;

graphql({ schema, source, rootValue }).then((res) =>
  console.log("Response", res)
);

export { source, rootValue, schema };
