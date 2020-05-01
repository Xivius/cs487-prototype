document.getElementById('drop-off-back-btn').addEventListener(
  'click', function(event) {
    console.log("Going back.");
    event.preventDefault();
    window.history.go(-1);
});

/*var backButton = document.getElementById("");
table.eventListener(); */
