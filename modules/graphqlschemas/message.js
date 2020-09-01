module.exports = `
type Message {
  _id: ID!
  content: String!
  path: String!
  email: String!
  fileImage: Boolean!
  files_id: ID
  created_at: String!
  modified_at: String!
}
type Query {
  message(_id: ID!): Message
  messages: [Message!]
}
type Mutation {
  uploadMessage(file: Upload, content: String!, email: String!, fileImage: Boolean!, path: String): Message
  deleteMessage(_id: ID!, fileImage: Boolean!): Message
  updateMessage(_id: ID!, fileImage: Boolean, file: Upload, content: String, path: String): Message
}
`;