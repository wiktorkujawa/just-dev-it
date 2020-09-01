module.exports = `
  type User {
    _id: ID,
    email: String,
    displayName: String,
    firstName: String,
    lastName: String,
    image: String
    isAdmin: Boolean
  },
 
  type Query {
    users: [User]
    currentUser: User
  },
  type Mutation {
    logout: Boolean
  },

   type Error {
     path: String!
     message: String!
   }
`;