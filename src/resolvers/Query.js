const Query = {
  users(parent, args, { db }, info) {
    if (!args.query) {
      return db.users;
    }
    return db.users.filter((user) => {
      return user.name.toLowerCase().includes(args.query.toLowerCase());
    });
  },

  posts(parent, args, { db }, info) {
    if (!args.query) {
      return db.posts;
    }
    return db.posts.filter((post) => {
      return post.title.toLowerCase().includes(args.query.toLowerCase());
    });
  },

  comments(parent, args, { db }, info) {
    return db.comments;
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
};

export default Query;