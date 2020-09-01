import React, { useState } from 'react';
import {
  Modal,
  ModalBody,
  ModalHeader
} from 'reactstrap';
import Dropzone from 'react-dropzone';

import { useUploadMessageMutation } from '../../../../generated/graphql';

import { getImageLightness } from '../../../utilities';

export const AddMessage = ({ refetchMessages, user }) => {
  const [modal, setModal] = useState(false);
  const [file, setFile] = useState(null);
  const [message, setMessage] = useState({
    content:'',
    fileImage: false,
    path: user.image
  });
  const [disabled, setDisabled] = useState(false);

  const [uploadMessage] = useUploadMessageMutation({ refetchQueries: refetchMessages});

  const toggle = () => {
    setFile(null);
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


  const onSubmit = async e => {
    e.preventDefault();
    {
      message.fileImage ?
        await uploadMessage({ variables: { file: file, content: message.content, email: user.email, fileImage: message.fileImage } })
        : 
        await uploadMessage({ variables: { path: message.path, content: message.content, fileImage: message.fileImage, email: user.email } })
    }
  }
  
  return (
    <>
      
      <div className="bootstrap-iso" style={{ position: "relative" }}>
      <button onClick={toggle} className="button large" style={{width:"100%", height:"100%", minHeight:"300px", fontSize:"10rem", borderRadius:"25px 0 25px 25px"}}>+</button>
      <Modal
        isOpen={modal}
        toggle={ disabled ? null : toggle}
        size="lg"
      >
        <ModalHeader toggle={ disabled ? null : toggle}>Leave a message</ModalHeader>
        <ModalBody>
        <div className="card-body">
          <form id="addMessage" onSubmit={onSubmit}>
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
                        <p id="dropzone-caption" style={{ whiteSpace:"nowrap", textAlign:"center"}}><b>Drop image here <br/> or <br/> click to choose file</b></p>
                      </div>
                  )}
                </Dropzone>
                
                <br/>
                <input className="ml-2 mb-3" type="checkbox" name="fileImage" defaultChecked={message.fileImage} id="fileImage"
                onChange={onChange}/>
                <label className="medium mb-1 custom-control-label" htmlFor="fileImage"> <b> File Image?</b></label>
                <br/>

                <label  htmlFor="inputContent"><b>Message:</b></label>
                <textarea className="form-control py-4 mb-3" id="inputContent" form="addMessage" type="text" name="content" placeholder="Insert message" onChange={onChange} ></textarea>
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
                        <textarea style={{minHeight:"300px"}} className="form-control py-4 mb-3" id="inputContent" form="addMessage" type="text" name="content" placeholder="Insert message" onChange={onChange} ></textarea>
                      </div>
                    </div>
                    
                <input className="ml-2" type="checkbox" name="fileImage" defaultChecked={message.fileImage} id="fileImage"
                onChange={onChange}/>
                <label className="medium mb-1 custom-control-label" htmlFor="fileImage"> <b> File Image?</b></label>
                    <br/>
                    <label className="medium mb-1" htmlFor="inputPath"> <b> Url Path:</b></label>
                    <input type="text" className="form-control py-4" id="inputPath" form="addMessage" name="path" placeholder="Insert path" value={message.path} onChange={onChange} />
                    
                    <input type="checkbox" name="path" id="path" checked={message.path===user.image} value={user.image} className="ml-2" disabled={message.path===user.image}
                  onChange={onChange}/>
                  <label className="medium mb-3 mt-3 custom-control-label" htmlFor="path"> <b> Thumbnail:</b></label>
                  </>
                }
                <input type="submit" disabled={ message.content === '' || disabled } className="btn btn-primary btn-block" value="Add a message"/>                                                                 
            </div>
        </form>
        </div>
        </ModalBody>
      </Modal>
    </div>
    </>
  );
}