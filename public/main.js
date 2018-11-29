window.addEventListener( 'load' , function() {
  var app = new Vue( {
    el: '#app',
    data: {
      currency: [
      ]
    },
    created: function() {
      axios.get( '/api/currency' )
        .then((_response) => {
          this.currency = _response.data.data;
        } );
    },

    filters: {
      number: function( _in ) {
        return _in.toFixed(2)
      }
    }
  } );
} );
