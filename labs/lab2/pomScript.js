$( document ).ready(function() {
    
    // set action global
    var pomAction = ''; 
    
    $( '.btn-primary').click(function() {
      
      // if no action, alert user, else execute pomAction
      !pomAction ? alert('Please select an action for Pom Pom') : pomAction();
  
    });
    
    // define shake function
    $('#shake').click(function(){
       pomAction = function(){
          $('.pom-pom').effect( 'shake' );
        }
    });

    // define bounce function
    $('#bounce').click(function(){
        pomAction = function(){
          $('.pom-pom').effect( 'bounce' );
        }
    });

    // define explode function
    $('#explode').click(function(){
        pomAction = function(){
          $('.pom-pom').hide( "explode", {pieces: 9 });
        }
    });

    // define revive function
    $('#revive').click(function(){
       pomAction = function(){
          $('.pom-pom').show( "explode", {pieces: 9});
        }
    });

    initHighlightingOnLoad();

});