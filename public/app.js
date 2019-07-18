$.getJSON("/articles", function(data) {
  for (var i = 0; i < data.length; i++) {
    $("#articles").append(
      "<p data-id='" +
        data[i]._id +
        "'>" +
        data[i].title +
        "<br />" +
        data[i].link +
        "</p>"
    );
  }
});

$(document).on("click", "p", function() {
  $("#notes").empty();
  $("#title").empty();
  var thisId = $(this).attr("data-id");

  $.ajax({
    method: "GET",
    url: "/articles/" + thisId
  }).then(function(data) {
    console.log("getnotedata", data);

    $("#title").append(
      "<h2>You selected the following article for a comment--</h2><h3>" +
        data.title +
        "</h3>"
    );

    $("#notes").append("<input id='titleinput' name='title' >");

    $("#notes").append("<textarea id='bodyinput' name='body'></textarea>");

    $("#notes").append(
      "<button data-id='" + data._id + "' id='savenote'>Save Note</button>"
    );

    if (data.note) {
      $("#titleinput").val(data.note.title);

      $("#bodyinput").val(data.note.body);
      $("#notes").append(
        "<button data-id='" +
          data.note._id +
          "' note-id='" +
          data._id +
          "' id='delnote'>Delete Note</button>"
      );
    }
  });
});

$(document).on("click", "#savenote", function() {
  var thisId = $(this).attr("data-id");

  $.ajax({
    method: "POST",
    url: "/articles/" + thisId,
    data: {
      title: $("#titleinput").val(),

      body: $("#bodyinput").val(),
      artid: thisId
    }
  }).then(function(data) {
    console.log(data);

    $("#notes").empty();
    $("#title").empty();
  });

  $("#titleinput").val("");
  $("#bodyinput").val("");
});

$(document).on("click", "#delnote", function() {
  $.ajax({
    method: "POST",
    url: "/delnote",
    data: {
      id: $(this).attr("data-id"),
      artid: $(this).attr("note-id")
    }
  }).then(function(data) {
    console.log(data);

    $("#notes").empty();
    $("#title").empty();
  });

  $("#titleinput").val("");
  $("#bodyinput").val("");
});
