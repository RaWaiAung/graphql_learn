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
    published: true,
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

const db = {
  users,
  posts,
  comments,
};

export default db;
