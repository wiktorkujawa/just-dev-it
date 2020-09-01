const express = require('express');
const cors = require('cors');
const path = require('path');
const mongoose = require('mongoose');
require('dotenv').config();
const passport = require('passport');
require('./modules/auth');
const Grid = require('gridfs-stream');
const fs = require('fs');

const cookieSession = require('cookie-session');

// #6 Initialize an Express application
const app = express();

app.use(cors());

app.use(cookieSession({
  name: 'session',
  keys: ['key1', 'key2']
}))

app.use(passport.initialize());
app.use(passport.session());

app.get('/auth/google', passport.authenticate('google', { scope: ['profile','email'] }));
app.get('/auth/google/callback', passport.authenticate('google', {
  successRedirect: '/dashboard',
  failureRedirect: '/auth/google',
}));




// Connect to Mongo
mongoose
  .connect(process.env.mongoURI, {
    useNewUrlParser: true,
    useCreateIndex: true,
    useUnifiedTopology: true,
    useFindAndModify: false
  }) // Adding new mongo url parser
  .then(() => console.log('MongoDB Connected...'))
  .catch(err => console.log(err));


  const conn = mongoose.connection;
  Grid.mongo = mongoose.mongo;
  // Init gfs
  let gfs;
  
  conn.once('open', () => {
    // Init stream
    gfs = Grid(conn.db);
  });

  const storeFile = async (upload, bucketName) => {
    const { filename, createReadStream, mimetype } = upload;

    const bucket = new mongoose.mongo.GridFSBucket(conn.db, { bucketName: bucketName });
    
    const uploadStream = bucket.openUploadStream(filename, {
      contentType: mimetype
    });
    return new Promise((resolve, reject) => {
      createReadStream()
        .pipe(uploadStream)
        .on('error', reject)
        .on('finish', () => {
            resolve(uploadStream.id)
        })
    })
  }





  // @route GET /image/:filename
// @desc Display Image
app.get('/:collection/:filename', (req, res) => {
  gfs.collection(req.params.collection);
  gfs.files.findOne({ filename: req.params.filename }, (err, file) => {
    // Check if file
    if (!file || file.length === 0) {
      return res.status(404).json({
        err: 'No file exists'
      });
    }
    // Check if image
    if (file.contentType === 'image/jpeg' || file.contentType === 'image/png') {
      // Read output to browser
      const readstream = gfs.createReadStream(file.filename);
      readstream.pipe(res);
    } else {
      res.status(404).json({
        err: 'Not an image'
      });
    }
  });
});

  module.exports = { storeFile }

const { ApolloServer } = require('apollo-server-express');

const typeDefs = require('./modules/graphqlschemas/index');
const resolvers = require('./modules/resolvers/index');



// #5 Initialize an Apollo server
const server = new ApolloServer({ 
  typeDefs: typeDefs,
  resolvers: resolvers,
  context: ({ req }) => ({
    getUser: () =>  req.user,
    logout: () => {
      req.session = null;
      req.logout();
      return true
    }
  })
});


// #7 Use the Express application as middleware in Apollo server
server.applyMiddleware({ app });

app.use(express.static('public'));

app.get('*', (req, res) => {
  res.sendFile(path.resolve(__dirname, 'public', 'index.html'))
});

const PORT = process.env.PORT || 4000;
app.listen(PORT, () => console.log(`Server started on port ${PORT}`));
