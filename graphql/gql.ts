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
const authors = [
  { name: "wilson", bio: "i am programmmer from LablabAI", id: 1 },
];
const books: TBooks[] = [
  { id: 1, name: "Baasic Elelctronis", authorId: 1 },
  { id: 2, name: "Baasic Elelctronis", authorId: 2 },
  { id: 3, name: "Baasic Elelctronis", authorId: 3 },
  { id: 4, name: "Baasic Elelctronis", authorId: 4 },
  { id: 5, name: "Baasic Elelctronis", authorId: 5 },
  { id: 6, name: "Baasic Elelctronis", authorId: 6 },
  { id: 7, name: "Baasic Elelctronis", authorId: 7 },
];
const AuthorType = new GraphQLObjectType({
  name: "author",
  description: "Specifies the Authors schema",
  fields: () => ({
    id: { type: new GraphQLNonNull(GraphQLInt) },
    name: { type: new GraphQLNonNull(GraphQLString) },
    bio: { type: GraphQLString },
  }),
});

const BookType = new GraphQLObjectType({
  name: "Book",
  description: "",
  fields: () => ({
    id: { type: new GraphQLNonNull(GraphQLInt) },
    desc: { type: GraphQLString },
    authorId: { type: new GraphQLNonNull(GraphQLInt) },
    name: { type: new GraphQLNonNull(GraphQLString) },
    authors: {
      type: new GraphQLList(AuthorType),
      resolve: (book) => {
        return authors.find((author) => author.id === book.authorId);
      },
    },
    author: {
      type: AuthorType,
      args: {
        id: { type: new GraphQLNonNull(GraphQLInt) },
      },
      resolve: (book, args) => {
        return authors.find((author) => author.id === args.id);
      },
    },
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
    book: {
      type: BookType,
      args: {
        id: { type: GraphQLInt },
      },
      resolve: (book, args) => books.find((book) => book.id === args.id),
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
