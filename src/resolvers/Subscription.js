const Subscription = {
  comment: {
    subscribe(parent, { postId }, { db, pubsub }, info) {
      const findPost = db.posts.find(
        (post) => post.id === postId && post.published
      );

      if (!findPost) {
        throw new Error("Post not found");
      }

      return pubsub.asyncIterator(`comment ${postId}`);
    },
  },
};

export default Subscription;
