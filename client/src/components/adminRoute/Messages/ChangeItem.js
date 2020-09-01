import React, { useState } from 'react';
import {
  Button,
  Modal,
  ModalBody,
  ModalHeader
} from 'reactstrap';
import Dropzone from 'react-dropzone';
import { formatDate, getImageLightness } from '../../utilities';
import { useDeleteMessageMutation, useUpdateMessageMutation } from '../../../generated/graphql'
export const ChangeItem = ({ refetchMessages,
  messages: {
    _id, content, path, fileImage, created_at, modified_at
  },
  image
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

  const onDeleteClick = async () => {
    const button = document.getElementsByClassName('disable-button');
    Array.from(button).forEach( item => item.setAttribute("disabled",true));
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
    <div className="col-xl-6 col-md-12 card" style={{backgroundColor:"grey"}}>
            <Button
              style={{
                position: "absolute", left: "100%", marginLeft: "-1.8rem", zIndex: "1000"
              }}
              className="disable-button"
              color="danger"
              size="sm"
              onClick={onDeleteClick}
            >&times;
              </Button>

            <Modal
              isOpen={modal}
              toggle={ disabled ? null : toggle}
              size="lg"
            >
              <ModalHeader toggle={disabled ? null : toggle}>Dane aktualności</ModalHeader>
              <ModalBody>
              <div className="card-body">
          <form id="changeNews" onSubmit={onSubmit(_id)} >
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
                <label className="medium mb-1" htmlFor="fileImage"> <b> File Image?</b></label>
                <input className="ml-2 mb-3" type="checkbox" name="fileImage" defaultChecked={message.fileImage} id="fileImage"
                onChange={onChange}/>
                <br/>

                <label  htmlFor="inputContent"><b>Message:</b></label>
                <textarea className="form-control py-4 mb-3" id="inputContent" form="addMessage" type="text" name="content" placeholder="Insert message" defaultValue={message.content} onChange={onChange} ></textarea>
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
                        <textarea style={{minHeight:"300px"}} className="form-control py-4 mb-3" id="inputContent" form="addMessage" type="text" name="content" defaultValue={message.content} placeholder="Insert message" onChange={onChange} ></textarea>
                      </div>
                    </div>
                    <label className="medium mb-1" htmlFor="fileImage"> <b> File Image?</b></label>
                <input className="ml-2" type="checkbox" name="fileImage" defaultChecked={message.fileImage} id="fileImage"
                onChange={onChange}/>
                    <br/>
                    <label className="medium mb-1" htmlFor="inputPath"> <b> Url Path:</b></label>
                    <input type="text" className="form-control py-4" id="inputPath" form="addMessage" name="path" placeholder="Insert path" value={message.path} onChange={onChange} />
                    <label className="medium mb-1" htmlFor="inputPath"> <b> Thumbnail:</b></label>
                    <input type="checkbox" name="path" value={image} className="ml-2" disabled={message.path===image} checked={message.path===image}
                  onChange={onChange}/>
                  </>
                }                                                             
            </div>
            
              <input type="submit" className="btn btn-primary btn-block" value="Zmień opisy" disabled={disabled}/>
        </form>
        </div> 
              </ModalBody>
            </Modal>

            <div className="col-xl-12 card-body">
            <div style={{display:"inline-block"}}>
                <img src={path} className="border-image" style={{float:'left', maxWidth:"300px", padding:"1rem"}} alt="" height="300"/>
                <div style={{padding:"2.5rem"}}>{content}</div>

                <div className="date-border" style={{top:`0`, left:"100%", transform: "translate(-100%, 0%)", marginLeft:"-2rem", marginTop:"1rem", padding:"0.5rem", backgroundColor:"#01FF70", borderRadius:"25px"}}>
                  <b>{`created ${formatDate(created_at)}`}</b>
                </div>

                <div className="date-border" style={{top:`100%`, left:"100%", transform: "translate(-100%, 0%)", marginBottom:"1rem", marginLeft:"-2rem",  backgroundColor:"pink",padding:"0.5rem"}}><b>{`modified ${formatDate(modified_at)}`}</b></div>
            </div>
            </div>
            <Button
              color="info" size="md"
              className="mb-3 ml-5"
              onClick={toggle}
              style={{width:"200px"}}
            >
              Change Message
              </Button>
            </div>
  )
}
