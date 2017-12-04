$( function() {
    $( "#srchFld" ).autocomplete({
      source: function( request, response ) {
        $.ajax( {
          url: "/products/search/"+request.term,
          dataType: "json",
          success: function( data ) {
          data.forEach(function(element) {
    		element.label = element.product_name;
			});
            response( data );
          }
        } );
      },
      minLength: 1,
      select: function( event, ui ) {
      	goToURL("/products/show/"+ui.item._id);
      }
    });
 });
function goToURL(url) {
    location.href = url;
  }