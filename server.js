const express = require( 'express' );
const sharp = require( 'sharp' );
const path = require( 'path' );

// create express application
const app = express();

// handle `/` request
app.get( '/', ( req, res ) => {
    res.sendFile( path.resolve( __dirname, 'www/index.html' ) );
} );

// handle `/resize` request
app.get( '/resize/:size', ( req, res ) => {

    // get size
    const [ _width, _height ] = req.params.size.split( "x" );

    // get Number width and height
    const width = Number( _width ) || null; // fallback to `null`
    const height = Number( _height ) || null; // fallback to `null`

    // send response content-type
    res.contentType( 'image/png' );

    // resize image and send
    const pngStream = sharp( path.resolve( __dirname, 'lenna.png' ) )
    .resize( width, height, {
        fit: width && height ? 'fill' : 'cover',
    } )
    .png()
    .toBuffer()
    .then( ( buffer ) => {
        res.send( buffer );
    } );
} );

// handle web assets
app.use( '/www', express.static( path.resolve( __dirname, 'www' ) ) );

// listen on a port
const port = process.env.PORT || 80;
app.listen( port, () => {
    console.log( `Server started on port ${ port }.` );
} );