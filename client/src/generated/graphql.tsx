import gql from 'graphql-tag';
import * as ApolloReactCommon from '@apollo/react-common';
import * as ApolloReactHooks from '@apollo/react-hooks';
export type Maybe<T> = T | null;
export type Exact<T extends { [key: string]: any }> = { [K in keyof T]: T[K] };
/** All built-in and custom scalars, mapped to their actual values */
export type Scalars = {
  ID: string;
  String: string;
  Boolean: boolean;
  Int: number;
  Float: number;
  /** The `Upload` scalar type represents a file upload. */
  Upload: any;
};

export type Rocket = {
  __typename?: 'Rocket';
  rocket_id?: Maybe<Scalars['String']>;
  rocket_name?: Maybe<Scalars['String']>;
  rocket_type?: Maybe<Scalars['String']>;
};

export type Launch = {
  __typename?: 'Launch';
  _id?: Maybe<Scalars['ID']>;
  flight_number?: Maybe<Scalars['Int']>;
  mission_name?: Maybe<Scalars['String']>;
  launch_year?: Maybe<Scalars['String']>;
  launch_date_local?: Maybe<Scalars['String']>;
  launch_success?: Maybe<Scalars['Boolean']>;
  rocket?: Maybe<Rocket>;
};

export type Query = {
  __typename?: 'Query';
  launches?: Maybe<Array<Maybe<Launch>>>;
  launch?: Maybe<Launch>;
  posts?: Maybe<Array<Maybe<Post>>>;
  post?: Maybe<Post>;
  users?: Maybe<Array<Maybe<User>>>;
  currentUser?: Maybe<User>;
  message?: Maybe<Message>;
  messages?: Maybe<Array<Message>>;
};


export type QueryLaunchArgs = {
  flight_number: Scalars['Int'];
};


export type QueryPostArgs = {
  _id: Scalars['ID'];
};


export type QueryMessageArgs = {
  _id: Scalars['ID'];
};

export type AddRocket = {
  rocket_id: Scalars['String'];
  rocket_name: Scalars['String'];
  rocket_type: Scalars['String'];
};

export type Mutation = {
  __typename?: 'Mutation';
  addLaunch?: Maybe<Launch>;
  deleteLaunch?: Maybe<Launch>;
  updateLaunch?: Maybe<Launch>;
  addPost?: Maybe<Post>;
  deletePost?: Maybe<Post>;
  updatePost?: Maybe<Post>;
  logout?: Maybe<Scalars['Boolean']>;
  uploadMessage?: Maybe<Message>;
  deleteMessage?: Maybe<Message>;
  updateMessage?: Maybe<Message>;
};


export type MutationAddLaunchArgs = {
  flight_number: Scalars['Int'];
  mission_name: Scalars['String'];
  launch_year: Scalars['String'];
  launch_success: Scalars['Boolean'];
  rocket: AddRocket;
};


export type MutationDeleteLaunchArgs = {
  flight_number: Scalars['Int'];
};


export type MutationUpdateLaunchArgs = {
  flight_number: Scalars['Int'];
  mission_name?: Maybe<Scalars['String']>;
  launch_year?: Maybe<Scalars['String']>;
  launch_success?: Maybe<Scalars['Boolean']>;
  rocket?: Maybe<AddRocket>;
};


export type MutationAddPostArgs = {
  subject: Scalars['String'];
  content: Scalars['String'];
};


export type MutationDeletePostArgs = {
  _id: Scalars['ID'];
};


export type MutationUpdatePostArgs = {
  _id: Scalars['ID'];
  subject?: Maybe<Scalars['String']>;
  content?: Maybe<Scalars['String']>;
};


export type MutationUploadMessageArgs = {
  file?: Maybe<Scalars['Upload']>;
  content: Scalars['String'];
  email: Scalars['String'];
  fileImage: Scalars['Boolean'];
  path?: Maybe<Scalars['String']>;
};


export type MutationDeleteMessageArgs = {
  _id: Scalars['ID'];
  fileImage: Scalars['Boolean'];
};


export type MutationUpdateMessageArgs = {
  _id: Scalars['ID'];
  fileImage?: Maybe<Scalars['Boolean']>;
  file?: Maybe<Scalars['Upload']>;
  content?: Maybe<Scalars['String']>;
  path?: Maybe<Scalars['String']>;
};

export type Post = {
  __typename?: 'Post';
  _id?: Maybe<Scalars['ID']>;
  subject?: Maybe<Scalars['String']>;
  content?: Maybe<Scalars['String']>;
};

export type User = {
  __typename?: 'User';
  _id?: Maybe<Scalars['ID']>;
  email?: Maybe<Scalars['String']>;
  displayName?: Maybe<Scalars['String']>;
  firstName?: Maybe<Scalars['String']>;
  lastName?: Maybe<Scalars['String']>;
  image?: Maybe<Scalars['String']>;
  isAdmin?: Maybe<Scalars['Boolean']>;
};

export type Error = {
  __typename?: 'Error';
  path: Scalars['String'];
  message: Scalars['String'];
};

export type Message = {
  __typename?: 'Message';
  _id: Scalars['ID'];
  content: Scalars['String'];
  path: Scalars['String'];
  email: Scalars['String'];
  fileImage: Scalars['Boolean'];
  files_id?: Maybe<Scalars['ID']>;
  created_at: Scalars['String'];
  modified_at: Scalars['String'];
};

export enum CacheControlScope {
  Public = 'PUBLIC',
  Private = 'PRIVATE'
}


export type MessagesQueryVariables = Exact<{ [key: string]: never; }>;


export type MessagesQuery = (
  { __typename?: 'Query' }
  & { messages?: Maybe<Array<(
    { __typename?: 'Message' }
    & Pick<Message, '_id' | 'content' | 'path' | 'fileImage' | 'created_at' | 'modified_at' | 'email'>
  )>> }
);

export type UploadMessageMutationVariables = Exact<{
  file?: Maybe<Scalars['Upload']>;
  content: Scalars['String'];
  email: Scalars['String'];
  fileImage: Scalars['Boolean'];
  path?: Maybe<Scalars['String']>;
}>;


export type UploadMessageMutation = (
  { __typename?: 'Mutation' }
  & { uploadMessage?: Maybe<(
    { __typename?: 'Message' }
    & Pick<Message, 'content'>
  )> }
);

export type DeleteMessageMutationVariables = Exact<{
  _id: Scalars['ID'];
  fileImage: Scalars['Boolean'];
}>;


export type DeleteMessageMutation = (
  { __typename?: 'Mutation' }
  & { deleteMessage?: Maybe<(
    { __typename?: 'Message' }
    & Pick<Message, 'content'>
  )> }
);

export type UpdateMessageMutationVariables = Exact<{
  _id: Scalars['ID'];
  fileImage: Scalars['Boolean'];
  file?: Maybe<Scalars['Upload']>;
  content?: Maybe<Scalars['String']>;
  path?: Maybe<Scalars['String']>;
}>;


export type UpdateMessageMutation = (
  { __typename?: 'Mutation' }
  & { updateMessage?: Maybe<(
    { __typename?: 'Message' }
    & Pick<Message, 'content'>
  )> }
);

export type PostsQueryVariables = Exact<{ [key: string]: never; }>;


export type PostsQuery = (
  { __typename?: 'Query' }
  & { posts?: Maybe<Array<Maybe<(
    { __typename?: 'Post' }
    & Pick<Post, '_id' | 'subject' | 'content'>
  )>>> }
);

export type AddPostMutationVariables = Exact<{
  subject: Scalars['String'];
  content: Scalars['String'];
}>;


export type AddPostMutation = (
  { __typename?: 'Mutation' }
  & { addPost?: Maybe<(
    { __typename?: 'Post' }
    & Pick<Post, 'subject' | 'content'>
  )> }
);

export type DeletePostMutationVariables = Exact<{
  _id: Scalars['ID'];
}>;


export type DeletePostMutation = (
  { __typename?: 'Mutation' }
  & { deletePost?: Maybe<(
    { __typename?: 'Post' }
    & Pick<Post, 'subject' | 'content'>
  )> }
);

export type UpdatePostMutationVariables = Exact<{
  _id: Scalars['ID'];
  subject?: Maybe<Scalars['String']>;
  content?: Maybe<Scalars['String']>;
}>;


export type UpdatePostMutation = (
  { __typename?: 'Mutation' }
  & { updatePost?: Maybe<(
    { __typename?: 'Post' }
    & Pick<Post, 'subject' | 'content'>
  )> }
);

export type UsersQueryVariables = Exact<{ [key: string]: never; }>;


export type UsersQuery = (
  { __typename?: 'Query' }
  & { currentUser?: Maybe<(
    { __typename?: 'User' }
    & Pick<User, 'displayName' | 'isAdmin' | 'email' | 'image'>
  )> }
);

export type LogoutMutationVariables = Exact<{ [key: string]: never; }>;


export type LogoutMutation = (
  { __typename?: 'Mutation' }
  & Pick<Mutation, 'logout'>
);


export const MessagesDocument = gql`
    query Messages {
  messages {
    _id
    content
    path
    fileImage
    created_at
    modified_at
    email
  }
}
    `;

/**
 * __useMessagesQuery__
 *
 * To run a query within a React component, call `useMessagesQuery` and pass it any options that fit your needs.
 * When your component renders, `useMessagesQuery` returns an object from Apollo Client that contains loading, error, and data properties
 * you can use to render your UI.
 *
 * @param baseOptions options that will be passed into the query, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options;
 *
 * @example
 * const { data, loading, error } = useMessagesQuery({
 *   variables: {
 *   },
 * });
 */
export function useMessagesQuery(baseOptions?: ApolloReactHooks.QueryHookOptions<MessagesQuery, MessagesQueryVariables>) {
        return ApolloReactHooks.useQuery<MessagesQuery, MessagesQueryVariables>(MessagesDocument, baseOptions);
      }
export function useMessagesLazyQuery(baseOptions?: ApolloReactHooks.LazyQueryHookOptions<MessagesQuery, MessagesQueryVariables>) {
          return ApolloReactHooks.useLazyQuery<MessagesQuery, MessagesQueryVariables>(MessagesDocument, baseOptions);
        }
export type MessagesQueryHookResult = ReturnType<typeof useMessagesQuery>;
export type MessagesLazyQueryHookResult = ReturnType<typeof useMessagesLazyQuery>;
export type MessagesQueryResult = ApolloReactCommon.QueryResult<MessagesQuery, MessagesQueryVariables>;
export const UploadMessageDocument = gql`
    mutation UploadMessage($file: Upload, $content: String!, $email: String!, $fileImage: Boolean!, $path: String) {
  uploadMessage(file: $file, content: $content, email: $email, fileImage: $fileImage, path: $path) {
    content
  }
}
    `;
export type UploadMessageMutationFn = ApolloReactCommon.MutationFunction<UploadMessageMutation, UploadMessageMutationVariables>;

/**
 * __useUploadMessageMutation__
 *
 * To run a mutation, you first call `useUploadMessageMutation` within a React component and pass it any options that fit your needs.
 * When your component renders, `useUploadMessageMutation` returns a tuple that includes:
 * - A mutate function that you can call at any time to execute the mutation
 * - An object with fields that represent the current status of the mutation's execution
 *
 * @param baseOptions options that will be passed into the mutation, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options-2;
 *
 * @example
 * const [uploadMessageMutation, { data, loading, error }] = useUploadMessageMutation({
 *   variables: {
 *      file: // value for 'file'
 *      content: // value for 'content'
 *      email: // value for 'email'
 *      fileImage: // value for 'fileImage'
 *      path: // value for 'path'
 *   },
 * });
 */
export function useUploadMessageMutation(baseOptions?: ApolloReactHooks.MutationHookOptions<UploadMessageMutation, UploadMessageMutationVariables>) {
        return ApolloReactHooks.useMutation<UploadMessageMutation, UploadMessageMutationVariables>(UploadMessageDocument, baseOptions);
      }
export type UploadMessageMutationHookResult = ReturnType<typeof useUploadMessageMutation>;
export type UploadMessageMutationResult = ApolloReactCommon.MutationResult<UploadMessageMutation>;
export type UploadMessageMutationOptions = ApolloReactCommon.BaseMutationOptions<UploadMessageMutation, UploadMessageMutationVariables>;
export const DeleteMessageDocument = gql`
    mutation DeleteMessage($_id: ID!, $fileImage: Boolean!) {
  deleteMessage(_id: $_id, fileImage: $fileImage) {
    content
  }
}
    `;
export type DeleteMessageMutationFn = ApolloReactCommon.MutationFunction<DeleteMessageMutation, DeleteMessageMutationVariables>;

/**
 * __useDeleteMessageMutation__
 *
 * To run a mutation, you first call `useDeleteMessageMutation` within a React component and pass it any options that fit your needs.
 * When your component renders, `useDeleteMessageMutation` returns a tuple that includes:
 * - A mutate function that you can call at any time to execute the mutation
 * - An object with fields that represent the current status of the mutation's execution
 *
 * @param baseOptions options that will be passed into the mutation, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options-2;
 *
 * @example
 * const [deleteMessageMutation, { data, loading, error }] = useDeleteMessageMutation({
 *   variables: {
 *      _id: // value for '_id'
 *      fileImage: // value for 'fileImage'
 *   },
 * });
 */
export function useDeleteMessageMutation(baseOptions?: ApolloReactHooks.MutationHookOptions<DeleteMessageMutation, DeleteMessageMutationVariables>) {
        return ApolloReactHooks.useMutation<DeleteMessageMutation, DeleteMessageMutationVariables>(DeleteMessageDocument, baseOptions);
      }
export type DeleteMessageMutationHookResult = ReturnType<typeof useDeleteMessageMutation>;
export type DeleteMessageMutationResult = ApolloReactCommon.MutationResult<DeleteMessageMutation>;
export type DeleteMessageMutationOptions = ApolloReactCommon.BaseMutationOptions<DeleteMessageMutation, DeleteMessageMutationVariables>;
export const UpdateMessageDocument = gql`
    mutation UpdateMessage($_id: ID!, $fileImage: Boolean!, $file: Upload, $content: String, $path: String) {
  updateMessage(_id: $_id, fileImage: $fileImage, file: $file, content: $content, path: $path) {
    content
  }
}
    `;
export type UpdateMessageMutationFn = ApolloReactCommon.MutationFunction<UpdateMessageMutation, UpdateMessageMutationVariables>;

/**
 * __useUpdateMessageMutation__
 *
 * To run a mutation, you first call `useUpdateMessageMutation` within a React component and pass it any options that fit your needs.
 * When your component renders, `useUpdateMessageMutation` returns a tuple that includes:
 * - A mutate function that you can call at any time to execute the mutation
 * - An object with fields that represent the current status of the mutation's execution
 *
 * @param baseOptions options that will be passed into the mutation, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options-2;
 *
 * @example
 * const [updateMessageMutation, { data, loading, error }] = useUpdateMessageMutation({
 *   variables: {
 *      _id: // value for '_id'
 *      fileImage: // value for 'fileImage'
 *      file: // value for 'file'
 *      content: // value for 'content'
 *      path: // value for 'path'
 *   },
 * });
 */
export function useUpdateMessageMutation(baseOptions?: ApolloReactHooks.MutationHookOptions<UpdateMessageMutation, UpdateMessageMutationVariables>) {
        return ApolloReactHooks.useMutation<UpdateMessageMutation, UpdateMessageMutationVariables>(UpdateMessageDocument, baseOptions);
      }
export type UpdateMessageMutationHookResult = ReturnType<typeof useUpdateMessageMutation>;
export type UpdateMessageMutationResult = ApolloReactCommon.MutationResult<UpdateMessageMutation>;
export type UpdateMessageMutationOptions = ApolloReactCommon.BaseMutationOptions<UpdateMessageMutation, UpdateMessageMutationVariables>;
export const PostsDocument = gql`
    query Posts {
  posts {
    _id
    subject
    content
  }
}
    `;

/**
 * __usePostsQuery__
 *
 * To run a query within a React component, call `usePostsQuery` and pass it any options that fit your needs.
 * When your component renders, `usePostsQuery` returns an object from Apollo Client that contains loading, error, and data properties
 * you can use to render your UI.
 *
 * @param baseOptions options that will be passed into the query, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options;
 *
 * @example
 * const { data, loading, error } = usePostsQuery({
 *   variables: {
 *   },
 * });
 */
export function usePostsQuery(baseOptions?: ApolloReactHooks.QueryHookOptions<PostsQuery, PostsQueryVariables>) {
        return ApolloReactHooks.useQuery<PostsQuery, PostsQueryVariables>(PostsDocument, baseOptions);
      }
export function usePostsLazyQuery(baseOptions?: ApolloReactHooks.LazyQueryHookOptions<PostsQuery, PostsQueryVariables>) {
          return ApolloReactHooks.useLazyQuery<PostsQuery, PostsQueryVariables>(PostsDocument, baseOptions);
        }
export type PostsQueryHookResult = ReturnType<typeof usePostsQuery>;
export type PostsLazyQueryHookResult = ReturnType<typeof usePostsLazyQuery>;
export type PostsQueryResult = ApolloReactCommon.QueryResult<PostsQuery, PostsQueryVariables>;
export const AddPostDocument = gql`
    mutation AddPost($subject: String!, $content: String!) {
  addPost(subject: $subject, content: $content) {
    subject
    content
  }
}
    `;
export type AddPostMutationFn = ApolloReactCommon.MutationFunction<AddPostMutation, AddPostMutationVariables>;

/**
 * __useAddPostMutation__
 *
 * To run a mutation, you first call `useAddPostMutation` within a React component and pass it any options that fit your needs.
 * When your component renders, `useAddPostMutation` returns a tuple that includes:
 * - A mutate function that you can call at any time to execute the mutation
 * - An object with fields that represent the current status of the mutation's execution
 *
 * @param baseOptions options that will be passed into the mutation, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options-2;
 *
 * @example
 * const [addPostMutation, { data, loading, error }] = useAddPostMutation({
 *   variables: {
 *      subject: // value for 'subject'
 *      content: // value for 'content'
 *   },
 * });
 */
export function useAddPostMutation(baseOptions?: ApolloReactHooks.MutationHookOptions<AddPostMutation, AddPostMutationVariables>) {
        return ApolloReactHooks.useMutation<AddPostMutation, AddPostMutationVariables>(AddPostDocument, baseOptions);
      }
export type AddPostMutationHookResult = ReturnType<typeof useAddPostMutation>;
export type AddPostMutationResult = ApolloReactCommon.MutationResult<AddPostMutation>;
export type AddPostMutationOptions = ApolloReactCommon.BaseMutationOptions<AddPostMutation, AddPostMutationVariables>;
export const DeletePostDocument = gql`
    mutation DeletePost($_id: ID!) {
  deletePost(_id: $_id) {
    subject
    content
  }
}
    `;
export type DeletePostMutationFn = ApolloReactCommon.MutationFunction<DeletePostMutation, DeletePostMutationVariables>;

/**
 * __useDeletePostMutation__
 *
 * To run a mutation, you first call `useDeletePostMutation` within a React component and pass it any options that fit your needs.
 * When your component renders, `useDeletePostMutation` returns a tuple that includes:
 * - A mutate function that you can call at any time to execute the mutation
 * - An object with fields that represent the current status of the mutation's execution
 *
 * @param baseOptions options that will be passed into the mutation, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options-2;
 *
 * @example
 * const [deletePostMutation, { data, loading, error }] = useDeletePostMutation({
 *   variables: {
 *      _id: // value for '_id'
 *   },
 * });
 */
export function useDeletePostMutation(baseOptions?: ApolloReactHooks.MutationHookOptions<DeletePostMutation, DeletePostMutationVariables>) {
        return ApolloReactHooks.useMutation<DeletePostMutation, DeletePostMutationVariables>(DeletePostDocument, baseOptions);
      }
export type DeletePostMutationHookResult = ReturnType<typeof useDeletePostMutation>;
export type DeletePostMutationResult = ApolloReactCommon.MutationResult<DeletePostMutation>;
export type DeletePostMutationOptions = ApolloReactCommon.BaseMutationOptions<DeletePostMutation, DeletePostMutationVariables>;
export const UpdatePostDocument = gql`
    mutation UpdatePost($_id: ID!, $subject: String, $content: String) {
  updatePost(_id: $_id, subject: $subject, content: $content) {
    subject
    content
  }
}
    `;
export type UpdatePostMutationFn = ApolloReactCommon.MutationFunction<UpdatePostMutation, UpdatePostMutationVariables>;

/**
 * __useUpdatePostMutation__
 *
 * To run a mutation, you first call `useUpdatePostMutation` within a React component and pass it any options that fit your needs.
 * When your component renders, `useUpdatePostMutation` returns a tuple that includes:
 * - A mutate function that you can call at any time to execute the mutation
 * - An object with fields that represent the current status of the mutation's execution
 *
 * @param baseOptions options that will be passed into the mutation, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options-2;
 *
 * @example
 * const [updatePostMutation, { data, loading, error }] = useUpdatePostMutation({
 *   variables: {
 *      _id: // value for '_id'
 *      subject: // value for 'subject'
 *      content: // value for 'content'
 *   },
 * });
 */
export function useUpdatePostMutation(baseOptions?: ApolloReactHooks.MutationHookOptions<UpdatePostMutation, UpdatePostMutationVariables>) {
        return ApolloReactHooks.useMutation<UpdatePostMutation, UpdatePostMutationVariables>(UpdatePostDocument, baseOptions);
      }
export type UpdatePostMutationHookResult = ReturnType<typeof useUpdatePostMutation>;
export type UpdatePostMutationResult = ApolloReactCommon.MutationResult<UpdatePostMutation>;
export type UpdatePostMutationOptions = ApolloReactCommon.BaseMutationOptions<UpdatePostMutation, UpdatePostMutationVariables>;
export const UsersDocument = gql`
    query Users {
  currentUser {
    displayName
    isAdmin
    email
    image
  }
}
    `;

/**
 * __useUsersQuery__
 *
 * To run a query within a React component, call `useUsersQuery` and pass it any options that fit your needs.
 * When your component renders, `useUsersQuery` returns an object from Apollo Client that contains loading, error, and data properties
 * you can use to render your UI.
 *
 * @param baseOptions options that will be passed into the query, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options;
 *
 * @example
 * const { data, loading, error } = useUsersQuery({
 *   variables: {
 *   },
 * });
 */
export function useUsersQuery(baseOptions?: ApolloReactHooks.QueryHookOptions<UsersQuery, UsersQueryVariables>) {
        return ApolloReactHooks.useQuery<UsersQuery, UsersQueryVariables>(UsersDocument, baseOptions);
      }
export function useUsersLazyQuery(baseOptions?: ApolloReactHooks.LazyQueryHookOptions<UsersQuery, UsersQueryVariables>) {
          return ApolloReactHooks.useLazyQuery<UsersQuery, UsersQueryVariables>(UsersDocument, baseOptions);
        }
export type UsersQueryHookResult = ReturnType<typeof useUsersQuery>;
export type UsersLazyQueryHookResult = ReturnType<typeof useUsersLazyQuery>;
export type UsersQueryResult = ApolloReactCommon.QueryResult<UsersQuery, UsersQueryVariables>;
export const LogoutDocument = gql`
    mutation Logout {
  logout
}
    `;
export type LogoutMutationFn = ApolloReactCommon.MutationFunction<LogoutMutation, LogoutMutationVariables>;

/**
 * __useLogoutMutation__
 *
 * To run a mutation, you first call `useLogoutMutation` within a React component and pass it any options that fit your needs.
 * When your component renders, `useLogoutMutation` returns a tuple that includes:
 * - A mutate function that you can call at any time to execute the mutation
 * - An object with fields that represent the current status of the mutation's execution
 *
 * @param baseOptions options that will be passed into the mutation, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options-2;
 *
 * @example
 * const [logoutMutation, { data, loading, error }] = useLogoutMutation({
 *   variables: {
 *   },
 * });
 */
export function useLogoutMutation(baseOptions?: ApolloReactHooks.MutationHookOptions<LogoutMutation, LogoutMutationVariables>) {
        return ApolloReactHooks.useMutation<LogoutMutation, LogoutMutationVariables>(LogoutDocument, baseOptions);
      }
export type LogoutMutationHookResult = ReturnType<typeof useLogoutMutation>;
export type LogoutMutationResult = ApolloReactCommon.MutationResult<LogoutMutation>;
export type LogoutMutationOptions = ApolloReactCommon.BaseMutationOptions<LogoutMutation, LogoutMutationVariables>;