import { randomBytes } from "crypto";

const Mutation = {
  createUser(parent, args, { db }, info) {
    const isEmail = db.users.some((user) => user.email === args.data.email);
    if (isEmail) {
      throw new Error("Email already taken");
    }
    const createdUser = {
      id: randomBytes(4).toString("hex"),
      ...args.data,
    };

    db.users.push(createdUser);
    return createdUser;
  },
  createPost(parent, args, { db }, info) {
    const isUser = db.users.some((user) => user.id === args.data.author);
    if (!isUser) {
      throw new Error("User not found");
    }
    const createdPost = {
      id: randomBytes(4).toString("hex"),
      ...args.data,
    };

    db.posts.push(createdPost);
    return createdPost;
  },
  createComment(parent, args, { db }, info) {
    const isAuthor = db.users.some((user) => (user.id = args.data.author));
    const findPost = db.posts.some(
      (post) => (post.id = args.data.post && post.published)
    );

    if (!isAuthor || !findPost) {
      throw new Error("Unable to find user or post");
    }

    const newComment = {
      id: randomBytes(4).toString("hex"),
      ...args.data,
    };

    db.comments.push(newComment);

    return newComment;
  },
};

export default Mutation;
