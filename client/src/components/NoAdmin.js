import React from 'react'

export const NoAdmin = () => {
  return (
    <div style={{
      position:"fixed", /* change this to fixed */
      top: '50%',
      left: '50%',
      transform: 'translate(-50%, -50%)',
      background:'#fff',
      textAlign:"center"}}>
      <h2>You have no admin privileges</h2>
      <a href="/">Back to the main page</a>
    </div>
  )
}
