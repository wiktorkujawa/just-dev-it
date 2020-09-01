const Message = require('../../models/message');
const { storeFile } = require('../../server');
const mongoose = require('mongoose');
const Grid = require('gridfs-stream');
const conn = mongoose.connection;
Grid.mongo = mongoose.mongo;
// Init gfs
let gfs;

const bucketName = 'messages';

conn.once('open', () => {
  // Init stream
  gfs = Grid(conn.db);
  gfs.collection(bucketName)
});



module.exports = {
  Query: {
    messages: () => Message.find({}),
    message: (parent, message) => Message.findOne({_id: message._id})
  },
  Mutation: {
    uploadMessage: async (_, args) => {
      const { fileImage, content, email } = args;
      if(fileImage){
        const { file } = args;
        const newFile = await file.then(result => result);
        const fileId = await storeFile(newFile, bucketName).then(result => result);
        
        const { filename } = newFile;
        
        const newMessage = new Message({ 
          content: content,
          files_id: fileId,
          email: email,
          fileImage: fileImage,
          path: `/${bucketName}/${filename}`
        });
        return newMessage.save();
      }
      else {
        const { path } = args;
        const newMessage = new Message({ 
          content: content,
          email: email,
          fileImage: fileImage,
          files_id: mongoose.Types.ObjectId(),
          path: path
        });
        return newMessage.save();
      }

      // Save the record and return it
      
    },
    deleteMessage: async (_, args) => {
      // Create a new record in the database
      if(!args)
        throw new Error('Error');

      const { files_id } = await Message.findById(args._id);

      if(args.fileImage){
      return Message.findOneAndDelete({ _id: args._id }, (err, user) => {
        gfs.remove({ _id: files_id, root: bucketName }, (err, gridFSBucket) => {
          if (err) {
            throw new Error(err);
          }
        })
      })
    }
    else return Message.findOneAndDelete({ _id: args._id })
    },
    updateMessage: async (_, args) => {
      // Create a new record in the database
      if(!args)
        throw new Error('Error');

      
      const { content, fileImage, _id } = args;
      const { files_id } = await Message.findById(_id);
      if(fileImage){
        if( args.file ){
          const { file } = args;
          
          const newFile = await file.then(result => result);
          const fileId = await storeFile(newFile, bucketName).then(result => result);
        
          const { filename } = newFile;
          
          return Message.findByIdAndUpdate(_id,
            {
              content: content,
              files_id: fileId,
              fileImage: fileImage,
              path: `/${bucketName}/${filename}`,
              modified_at: new Date()
            },
             (err, user) => {
              gfs.remove(
                { _id: files_id, root: bucketName }, (err, gridFSBucket) => {
                  if (err) {
                    throw new Error(err);
                  }
                }
              )
            }  
          )
        }
        else{
          return Message.findByIdAndUpdate(_id,
            {
              content: content,
              fileImage: fileImage,
              modified_at: new Date()
            }
          )
        }
      }
      else {
        return Message.findByIdAndUpdate(_id,
          {
            content: content,
            path: args.path,
            fileImage: fileImage,
            modified_at: new Date()
          },
          (err, user) => {
            gfs.remove(
              { _id: files_id, root: bucketName }, (err, gridFSBucket) => {
                if (err) {
                  throw new Error(err);
                }
              }
            )
          }    
        )
      }
    }}}