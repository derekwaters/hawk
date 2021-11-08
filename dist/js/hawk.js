


// hawk.js


jQuery(function() {
    if (typeof initPage === 'function')
    {
        initPage();
    }
});


function initPage() {
	$.ajax({
		method: "GET",
		url: "/api"
	})
	.done(function( data ) {
		alert('Got results!');

		console.log(data);
  	});
}