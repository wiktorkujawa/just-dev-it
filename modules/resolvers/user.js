const User = require('../../models/user');

module.exports = {
  Query: {
    // user: (_, __, { req }) => {
    //   if (!req.userId) {
    //     return null;
    //   }
    //   return User.findOne({_id:req.userId});
    // },
    users: () => User.find({}),
    currentUser: (parent, args, context) => context.getUser()
  },
  
  Mutation: {
    logout: (parent, args, context) => context.logout()
  }
};