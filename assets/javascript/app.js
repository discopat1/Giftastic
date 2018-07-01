$(document).ready(function () {

    // Initial array of exercises
    var exercises = ["Deadlift", "Squat", "Clean and press", "Bulgarian split squat"];
    
          
    function displayexerciseInfo() {

      var exercise = $(this).attr("data-name");
      var queryURL = "http://api.giphy.com/v1/gifs/search?q=" + exercise + "&api_key=QQLYwIRiL8DfkOF92OaclKYi9THes8Ig&limit=10";

      $.ajax({
        url: queryURL,
        method: "GET"
      }).then(function(response) {
          
      for (var i = 0; i<response.data.length; i++) {

      var ratings = $("<p>").text("Rating: " +response.data[i].rating);
      
      var gif = $("<img>");
      gif.attr("src", response.data[i].images.downsized_still.url);
      
      var exerciseDiv = $("<div>");
      exerciseDiv.append(ratings);
      exerciseDiv.append(gif);
      $("#gifs-here").prepend(exerciseDiv);


              $(gif).addClass("gif");
              $(gif).attr("data-still", response.data[i].images.downsized_still.url);
              $(gif).attr("data-animate", response.data[i].images.downsized.url);
              $(gif).attr("data-state", "still");

$(".gif").on("click", function() {
  console.log("clicked");
              
  
              var state = $(this).attr("data-state");
              
              if (state === "still") {
                  $(this).attr("src", $(this).attr("data-animate"));
                  $(this).attr("data-state", "animate");
              } else {
                  $(this).attr("src", $(this).attr("data-still"));
                  $(this).attr("data-state", "still");
              }
              console.log(state);
});
          };
      });
    };

    
    function renderButtons() {
      
      $("#buttons-div").empty();

      for (var i = 0; i < exercises.length; i++) {

        var a = $("<button>");
        a.addClass("exercise-btn");
        a.attr("data-name", exercises[i]);
        a.text(exercises[i]);
        $("#buttons-div").append(a);
      }
    }

    
    $("#add-exercise").on("click", function(event) {
      event.preventDefault();
      var exercise = $("#exercise-input").val().trim();

      exercises.push(exercise);

     
      renderButtons();
    });

    
    $(document).on("click", ".exercise-btn", displayexerciseInfo);

    
    renderButtons();

});