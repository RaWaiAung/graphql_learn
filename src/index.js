// import { GraphqlServer } from "graphql-yoga";
import { GraphQLServer } from "graphql-yoga";
import { randomBytes, randomUUID } from "crypto";
const users = [
  {
    id: "1",
    name: "peter",
    age: 26,
  },
  {
    id: "2",
    name: "john doe",
    age: 24,
  },
  {
    id: "3",
    name: "smith",
    age: 28,
  },
];

const posts = [
  {
    id: "10",
    title: "Learn graphql",
    body: "lorem",
    published: false,
    author: "1",
  },
  {
    id: "11",
    title: "Learn graphql for shopping",
    body: "lorem for shopping",
    published: false,
    author: "2",
  },
  {
    id: "12",
    title: "Learn graphql for projects",
    body: "lorem for project",
    published: false,
    author: "3",
  },
];

const comments = [
  {
    id: "101",
    text: "Your first comment",
    author: "1",
    post: "10",
  },
  {
    id: "102",
    text: "Your second comment",
    author: "2",
    post: "11",
  },
  {
    id: "103",
    text: "Your third comment",
    author: "3",
    post: "12",
  },
  {
    id: "104",
    text: "Your first comment",
    author: "1",
    post: "10",
  },
];
const typeDefs = `
    type Query {
        users(query: String): [User!]!
        posts(query: String): [Post!]!
        comments: [Comment!]!
        grades: [Int!]!
        add(numbers: [Float!]!) : Float!
    }

    type Mutation {
      createUser(name: String!,email: String,age: Int): User!
    }

    type User {
      id: ID!
      name: String!
      email: String
      age: Int
      posts: [Post!]!
      comments: [Comment!]!
    }

    type Post {
      id: ID!
      title: String!
      body: String!
      published: Boolean
      author: User!
      comments: [Comment!]!
    }

    type Comment {
      id: ID!
      text: String!
      author: User!
      post: Post!
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

    posts(parent, args, ctx, info) {
      if (!args.query) {
        return posts;
      }
      return posts.filter((post) => {
        return post.title.toLowerCase().includes(args.query.toLowerCase());
      });
    },

    comments(parent, args, ctx, info) {
      return comments;
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
  Mutation: {
    createUser(parent, args, ctx, info) {
      const isEmail = users.some((user) => user.email === args.email);
      if (isEmail) {
        throw new Error("Email already taken");
      }
      const createdUser = {
        id: randomBytes(4).toString("hex"),
        name: args.name,
        email: args.email,
        age: args.agg,
      };

      users.push(createdUser);
      return createdUser;
    },
  },
  Post: {
    author(parent, args, ctx, info) {
      return users.find((user) => {
        return user.id === parent.author;
      });
    },
    comments(parent, args, ctx, info) {
      return comments.filter((comment) => {
        return comment.post === parent.id;
      });
    },
  },

  Comment: {
    author(parent, args, ctx, info) {
      return users.find((user) => {
        return user.id === parent.author;
      });
    },
    post(parent, args, ctx, info) {
      return posts.find((post) => {
        return post.id === parent.post;
      });
    },
  },

  User: {
    posts(parent, args, ctx, info) {
      return posts.filter((post) => {
        return post.author === parent.id;
      });
    },
    comments(parent, args, ctx, info) {
      return comments.filter((comment) => {
        return comment.author === parent.id;
      });
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
