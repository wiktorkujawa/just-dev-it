const { mergeResolvers } = require('@graphql-tools/merge');
const launch = require('./launch');
const post = require('./post');
const user = require('./user');
const message = require('./message');

const resolvers = [
  launch,
  post,
  user,
  message
];

module.exports = mergeResolvers(resolvers);