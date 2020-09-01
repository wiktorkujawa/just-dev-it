import React, { useState } from 'react';
import {
  Button,
  Modal,
  ModalBody,
  ModalHeader
} from 'reactstrap';
import Dropzone from 'react-dropzone';
import { getImageLightness, formatDate } from '../../../utilities';
import { useDeleteMessageMutation, useUpdateMessageMutation } from '../../../../generated/graphql';
import dompurify from 'dompurify';
export const Message = ({ refetchMessages,
  messages: {
    _id, content, path, fileImage, email, created_at, modified_at
  },
  user
}) => {
  const [modal, setModal] = useState(false);
  const [message, setMessage] = useState({
    content: content,
    fileImage: fileImage,
    path: path
  });

  const [ disabled, setDisabled] = useState(false);

  const [file, setFile] = useState(null);

  const [deleteMessage] = useDeleteMessageMutation({ refetchQueries: refetchMessages, awaitRefetchQueries: true});

  const [updateMessage] = useUpdateMessageMutation({ refetchQueries: refetchMessages, awaitRefetchQueries: true }	);

  
  const copyToClipboard = e => {
    navigator.clipboard.writeText(e.target.innerText.toLowerCase());

  };



  const sanitizer = dompurify.sanitize;

  const onDeleteClick = async () => {
    // const button = document.getElementsByClassName('disable-button');
    // Array.from(button).forEach( item => item.setAttribute("disabled",true));
    await deleteMessage({ variables: { _id: _id, fileImage: fileImage   } });
  };

  const toggle = () => {
    setModal(!modal);
  };

 

  const onChange = e => {
    const { name, value, checked } = e.target;
    name==="fileImage" ?
      setMessage({
        ...message,
        [name]: checked
      })
      : 
      setMessage({
        ...message,
        [name]: value
      })
  };

  const onSubmit = (id) => {
    return async e =>{
      setDisabled(true);
      e.preventDefault();
      if(message.fileImage){
        if(file){
          await updateMessage({ variables: { _id: id, content: message.content, file: file, fileImage: message.fileImage  } }); 
          toggle();
        }
        else {
          await updateMessage({ variables: { _id: id, content: message.content, fileImage: message.fileImage } }); 
          toggle();
        }
      }
      else {
        await updateMessage({ variables: { _id: id, content: message.content, path: message.path, fileImage: message.fileImage } }); 
        toggle();
      }
      setDisabled(false);
    }
}


  return (
    <>
    { user ?
    <Modal
        isOpen={modal}
        toggle={ disabled ? null : toggle}
        size="lg"
      >
        <ModalHeader toggle={ disabled ? null : toggle}>Leave a message</ModalHeader>
        <ModalBody>
        <div className="card-body">
          <form id="changeMessage" onSubmit={onSubmit(_id)}>
               <div className="form-group">
                {
                  message.fileImage ? 
                  <>
                  <Dropzone onDrop={acceptedFiles => setFile(acceptedFiles[0])} multiple={false}>
                  {({getRootProps, getInputProps}) => (
                      <div className="dropzone mb-3" id="dropzone" style={ file ? null : {width:"100%"}} {...getRootProps()}>
                        <input {...getInputProps()} />
                        {
                          file ?
                            (
                              getImageLightness(URL.createObjectURL(file), (brightness) => {
                              if(modal){
                                const imageCaption = document.getElementById("dropzone-caption").children[0];
                                brightness<140 ? imageCaption.style.color = "white": imageCaption.style.color = "#111111"
                              }
                            }),
                              <img style={{position:"absolute", height:"100%", left:"50%", transform: "translate(-50%, 0%)" }} src={URL.createObjectURL(file)} alt=""/>
                            )
                          : null
                        }
                        <p id="dropzone-caption" style={{whiteSpace:"nowrap", textAlign:"center"}}><b>Drop image here <br/> or <br/> click to choose file</b></p>
                      </div>
                  )}
                </Dropzone>
                <br/>
                <input className="ml-2 mb-3" type="checkbox" name="fileImage" defaultChecked={message.fileImage} id="fileImage"
                onChange={onChange}/>
                <label className="medium mb-1 custom-control-label" htmlFor="fileImage"> <b> File Image?</b></label>
                <br/>

                <label  htmlFor="inputContent"><b>Message:</b></label>
                <textarea className="form-control py-4 mb-3" id="inputContent" form="changeMessage" type="text" name="content" placeholder="Insert message" defaultValue={content} onChange={onChange} ></textarea>
                </>
                  :
                  <>
                    <div className="row">
                      <div className="col-12 col-lg-6 mb-3" >
                        <label  htmlFor="inputContent"><b>Image:</b></label>
                        <br/>
                        <img src={message.path} height="300" alt=""/>
                      </div>
                      <div className="col-12 col-lg-6 mb-3" >
                        <label htmlFor="inputContent"><b>Message:</b></label>
                        <textarea style={{minHeight:"300px"}} className="form-control py-4 mb-3" id="inputContent" form="changeMessage" type="text" name="content" defaultValue={content} placeholder="Insert message" onChange={onChange} ></textarea>
                      </div>
                    </div>
                    
                <input className="ml-2" type="checkbox" name="fileImage" defaultChecked={message.fileImage} id="fileImage"
                onChange={onChange}/>
                <label className="medium mb-1 custom-control-label" htmlFor="fileImage"> <b> File Image?</b></label>
                    <br/>
                    <label className="medium mb-1" htmlFor="inputPath"> <b> Url Path:</b></label>
                    <input type="text" className="form-control py-4" id="inputPath" form="changeMessage" name="path" placeholder="Insert path" value={message.path} onChange={onChange} />
                    
                    <input type="checkbox" name="path" id="path" checked={message.path===user.image} value={user.image} className="ml-2" disabled={message.path===user.image}
                  onChange={onChange}/>
                  <label className="medium mb-3 mt-3 custom-control-label" htmlFor="path"> <b> Thumbnail:</b></label>
                  </>
                }
                <input type="submit" disabled={ message.content === '' || disabled } className="btn btn-primary btn-block" value="Modify a message"/>                                                                 
            </div>
        </form>
        </div>
        </ModalBody>
      </Modal> : null}
      
    <div className={ 
      email==="wiktorkujawa1993@gmail.com" ? 'gradient-blue' : 
        user ? user.email===email ? 'gradient-green': 'gradient-grey': 
            'gradient-grey'
      } 
      style={{border:"2px solid #111111", padding:"4rem 1rem 2rem 2rem", borderRadius:"25px 0 0 25px", minHeight:"300px", position:"relative" }}>
      { 
        user ?
          user.isAdmin || user.email===email ?
            <Button
              style={{position: "absolute", left: "100%", top:'0', transform: "translate(-100%, 0%)", zIndex: "1000", height:"2.8rem"}}
              color="danger"
              className="disable-button"
                  // size="md"
              onClick={onDeleteClick}
              >&times;
            </Button>
          : null
        : null
      }

        <img className="message-image gradient-red" style={{padding:"0.5rem"}} src={path} height="200" alt=""/>
        <p style={{marginTop:"-0.6rem", fontSize:"0.8rem"}} dangerouslySetInnerHTML={{ __html: sanitizer(content) }}></p>

      <div className="date-border" style={{top:`0`, left:"100%", transform: "translate(-100%, 0%)", backgroundColor:"#01FF70", padding:"0.2rem", borderRadius:"0 0 0 25px", paddingRight:"2.5rem", borderBottom:"2px solid #111111",borderLeft:"2px solid #111111"}}>
        <b>{`created ${formatDate(created_at)}`}</b>
      </div>

      <div className="date-border" style={{top:`100%`, left:"100%", transform: "translate(-100%, -100%)", backgroundColor:"pink", padding:"0.2rem", borderLeft:"2px solid #111111", borderTop:"2px solid #111111", borderRadius:"20px 0 0 0"}}>
        <b>{`modified ${formatDate(modified_at)}`}</b>
      </div>

      {
        user ? 
          user.email===email ?
            <div onClick={toggle} className="date-border button small" style={{top:`100%`, left:"0", transform: "translate(0, -100%)", padding:"0.2rem", borderRadius:"0 20px 0 20px", backgroundColor:"white"}}>
              <b>Modify message</b>
            </div> 
          : null 
        : null
      }
      {
        user ? 
          user.isAdmin ?
            <div onClick={copyToClipboard} className="date-border button small" style={{top:`0`, left:"0", padding:"0.2rem", borderRadius:"25px", backgroundColor:"white"}}> <b> {email}</b></div>
          : null
        : null
      }


    </div>
    </>
  )
}
