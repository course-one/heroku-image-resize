var form = document.getElementById( 'form' );
var preview = document.getElementById( 'preview' );
var size = document.getElementById( 'size' );

// listen to form submit event
form.addEventListener( 'submit', function( event ) {
    event.preventDefault();

    // replace preview image source
    preview.setAttribute( 'src', `/resize/${ size.value }` );
} );