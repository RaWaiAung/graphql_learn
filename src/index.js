// import { GraphqlServer } from "graphql-yoga";
import { GraphQLServer } from "graphql-yoga";
const users = [
  {
    id: "13asdf",
    name: "mon",
    age: 26,
  },
  {
    id: "12asdf",
    name: "yimon",
    age: 24,
  },
  {
    id: "123asdf",
    name: "rawaiaung",
    age: 28,
  },
];
const typeDefs = `
    type Query {
        users(query: String): [User!]!
        grades: [Int!]!
        add(numbers: [Float!]!) : Float!
    }

    type User {
      id: ID!
      name: String!
      age: Int!
    }
`;

const resolvers = {
  Query: {
    users(parent, args, ctx, info) {
      if (!args.query) {
        return users;
      }
      return users.filter((user) => {
        return user.name.toLowerCase().includes(args.query.toLowerCase());
      });
    },
    add(parent, args, ctx, info) {
      if (args.numbers.length === 0) {
        return 0;
      }
      return args.numbers.reduce((accumulator, currentValue) => {
        return accumulator + currentValue;
      });
    },
    grades() {
      return [99, 100];
    },
  },
};

const server = new GraphQLServer({
  typeDefs,
  resolvers,
});

server.start(() => {
  console.log("Server started");
});
