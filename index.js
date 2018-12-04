const express = require('express');
const bodyParser = require('body-parser');
const uuidv4 = require( 'uuid/v4' );
const dbsync = require( './dbsync.js' );

const app = express();
const port = 3000;

let database = dbsync.load();

app.use( bodyParser.json() );

app.get( '/api/:type' , (_req , _res) => {
  const type = _req.params.type.toLowerCase();
  if ( type in database ) {
    _res.json( {
      ret: 'OK',
      data: database[type]
    } );
  } else {
    _res.json( {
      ret: 'ERROR',
      error: 'Entry not found'
    } );
  }
} );

app.get( '/api/:type/:id' , (_req , _res) => {
  const id = _req.params.id.toLowerCase();
  const type = _req.params.type.toLowerCase();
  if ( (type in database) && (id in database[type]) ) {
    _res.json( {
      ret: 'OK',
      data: database[type][id]
    } );
  } else {
    _res.json( {
      ret: 'ERROR',
      error: 'Entry not found'
    } );
  }
} );

app.post( '/api/:type' , (_req , _res ) => {
  // check id format:
  const check = /^[0-9a-z_-]*$/i;
  const type = _req.params.type.toLowerCase();
  if ( check.test(type) ) {
    if ( !(type in database) ) {
      database[type] = {};
    }
    const id = uuidv4();
    database[type][id] = _req.body;
    _res.json( {
      ret: 'OK',
      id
    } );
    dbsync.save( database );
  } else {
    _res.json( {
      ret: 'ERROR',
      error: 'Invalid type format'
    } );
  }
} );

app.delete( '/api/:type/:id' , (_req , _res) => {
  const id = _req.params.id.toLowerCase();
  const type = _req.params.type.toLowerCase();
  if ( (type in database) && (id in database[type]) ) {
    delete database[type][id];
    _res.json( {
      ret: 'OK',
      data: `${type}/${id}`
    } );
    dbsync.save( database );
  } else {
    _res.json( {
      ret: 'ERROR',
      error: 'Entry not found'
    } );
  }
} );

app.put( '/api/:type/:id' , (_req , _res) => {
  const id = _req.params.id.toLowerCase();
  const type = _req.params.type.toLowerCase();
  if ( (type in database) && (id in database[type]) ) {
    database[type][id] = _req.body;
    _res.json( {
      ret: 'OK',
      data: '${type}/${id}'
    } );
    dbsync.save( database );
  } else {
    _res.json( {
      ret: 'ERROR',
      error: 'Entry not found'
    } );
  }
} );

app.use( express.static( 'public' ) );

app.listen( port , () => console.log(`Simple server listening on port ${port}!`))
