window.addEventListener( 'load' , function() {
  var app = new Vue( {
    el: '#app',
    data: {
      col: [
        { name: "Sandel" ,  prop1: "Violet" , prop2: 29 },
        { name: "Georgel" , prop1: "Magenta" , prop2: 24 },
        { name: "Ionel" ,   prop1: "Mov" , prop2: 25 }
      ]
    }
  } );
} );
