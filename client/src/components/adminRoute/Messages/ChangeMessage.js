import React from 'react';
import { ChangeItem } from './ChangeItem';
import { useMessagesQuery } from '../../../generated/graphql'

export const ChangeMessage = ({user}) => {

  const { data, refetch: refetchMessages } = useMessagesQuery();
  if(!data){
		return <div>loading...</div>
	}

  const cardList = <>
    {!(Array.isArray(data.messages) && data.messages.length) ?
      <div className="card col-xl-12" style={{textAlign:"center"}}>
      <h1>Brak zamieszczonych aktualności</h1>
      </div>
      : data.messages.map( messages => (
          <ChangeItem key={ messages._id } messages={messages} image={user.image} refetchMessages={refetchMessages}/>
      ))}
  </>;

  return (
    <div className="container-fluid">
      <div className="card-header">
          <i className="fas fa-chart-bar mr-1"></i>
          Aktualności
      </div>
      <div className="row">{cardList}</div>
      </div>
  );
}