console.log('yo');

$.post("/auth", function(data) {
    console.log(data);
    $('#response').text(data);
});