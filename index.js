// implement your API here
const express = require( 'express' );

const hubs = require( './data/db.js' );

const server = express();

server.use( express.json() );


server.post( '/api/hubs', ( req, res ) =>
{
 const hubData = req.body;

 hubs.insert( hubData )
  .then( hub =>
  {

   res.status( 201 ).json( hub );
  } )
  .catch( err =>
  {
   res.status( 500 ).json( { error: 'error' } );
  } );
} );

server.get( '/api/hubs', ( req, res ) =>
{
 hubs.find()
  .then( hubs =>
  {


   res.status( 200 ).json( hubs );
  } );
} );

server.get( '/api/hubs/:id', ( req, res ) =>
{
 const id = req.params.id;
 hubs.findById( id )
  .then( hubs =>
  {

   res.status( 200 ).json( hubs );
  } ).catch( err =>
  {
   res.status( 500 ).json( err );
  } );

} );


server.delete( '/api/hubs/:id', ( req, res ) =>{

 const id = req.params.id;
 hubs.remove( id )
  .then( deleted =>{
   res.status(200).json(deleted)
  })
  .catch( err =>{
   res.status( 500 ).json( err );
  });

});

server.put('/api/hubs/:id', (req, res) => {
 const id = req.params.id
 const body = req.body
 hubs.update(id, body)
 .then( updated =>{
   res.status(200).json(updated)
  })
  .catch( err =>{
   res.status( 500 ).json( err );
  });

})



const port = 8000;

server.listen( port, () => console.log( `\n ** api on port: ${ port }**` ) );