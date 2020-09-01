import React from 'react';
import { Message } from './Message';
import { useMessagesQuery, useLogoutMutation } from '../../../../generated/graphql'
import { AddMessage } from './AddMessage';

export const Dashboard = ({user, refetchLogout }) => {

  const { data, refetch: refetchMessages } = useMessagesQuery();
  const [logout] = useLogoutMutation({ refetchQueries: refetchLogout});
  if(!data){
		return <div>loading...</div>
  }
  
  const Logout = async () =>{
      await logout();
    }

  const messageList = <>
    {
      data.messages.map( messages => (
        <article key={ messages._id }>
          <Message messages={messages} user={user} refetchMessages={refetchMessages}/>
        </article>
      ))  
    }
  </>;

  return (
    <div id="main">
      <header className="major">
        {
          user ? 
            <>
              <h2>Welcome {user.displayName}</h2>
              <a className="button large" onClick={Logout}>Logout</a>
            </> :
          <a href="auth/google" className="button large">Log In and leave a message!</a>
        }
        
      </header>
    <section className="posts">
      {
        user ?
        <article>
          <AddMessage user={user} refetchMessages={refetchMessages}/>
        </article> :
        null
      }
      {messageList}
    </section>
    </div>
  );
}