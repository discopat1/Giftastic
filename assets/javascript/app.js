$(document).ready(function () {

    //initial array for gif searches
    var gifOptions = ["cat", "dog", "bird", "monkey", "kitten", "turtle", "hamster", "snake", "puppy", "duckling", "fluffy", "table flip"]
    //code to write buttons to the screen
    function makeButtons() {
        $("#button-box ").empty();
        for (var i = 0; i < gifOptions.length; i++) {
            var a = $("<button>");
            a.addClass("animals").attr("data-name", gifOptions[i]);
            a.addClass("btn btn-secondary");
            a.text(gifOptions[i]);
            $("#button-box").append(a);
        }

    }
    //create a new button with input field
    $(".add-animal").on("click", function (event) {
        event.preventDefault();
        var animal = $("#animal-input").val().trim();
        gifOptions.push(animal);
        makeButtons();
    })

    makeButtons();

    //varibles
    var imgSrcAni;
    var imgSrcStill;
    var url;
    var variable;
    var currentFav;
    var currentFavAni;

    var imgArrayAni = JSON.parse(localStorage.getItem("favAni"))
    var imgArrayStill = JSON.parse(localStorage.getItem("favStill"))

    if (!Array.isArray(imgArrayStill && imgArrayAni)) {
        imgArrayStill = [];
        imgArrayAni = [];
    }

    //load gifs with the click of a search button
    $(document).on("click", ".animals", function () {
        $("#play-area").empty();
        variable = $(this).attr("data-name");

        url = "https://api.giphy.com/v1/gifs/search?q=" + variable + "&api_key=0iEVKxkLR16EjmugC8AgbL4n4A4I97YC&rating=pg-13&limit=10";
        generateGifs()
    });



    //fucntion that uses ajax to find random gifs pertaining to search and gives them values and attributes
    function generateGifs() {
        $.ajax(url)

            .then(function (response) {
             

                var results = response.data;

                for (var j = 0; j < results.length; j++) {
                    var imgDiv = $("<div class='card'>");
                    imgDiv.addClass("imgBox");
                    var newImg = $("<img class='thumbnail'>");

                    imgSrcAni = results[j].images.original.url;
                    imgSrcStill = results[j].images.original_still.url;

                    imgRating = results[j].rating;
                  

                    newImg.attr("src", imgSrcStill);
                    newImg.attr("data-still", imgSrcStill);
                    newImg.attr("data-ani", imgSrcAni)
                    newImg.attr("data-state", "still");
                    newImg.attr("alt", $(this).attr("data-name"));
                    newImg.addClass("post");

                    var rating = $("<div>");
                    rating.attr("id", "rating");
                    rating.text(imgRating);

                    imgDiv.append("Rating: " + imgRating);
                    imgDiv.append(newImg)

                    $("#play-area").append(imgDiv)
                };

            });
    };

    //on click listener to play or pause gif

    $(document).on("click", "img", function () {
            if ($(this).attr("data-state") === "still") {
                $(this).attr("src", ($(this).attr("data-ani")));
                $(this).attr("data-state", "animate");
            } else if ($(this).attr("data-state") === "animate") {
                $(this).attr("src", ($(this).attr("data-still")));
                $(this).attr("data-state", "still");
            }
        }

    );

    // if ($("#play-area").attr("data-double") === variable) {}

    //on double click listener to move imgae to fav section
    $(document).on("dblclick", ".post", function (event) {
        console.log("double")
        event.preventDefault();
        $(this).removeClass("post");
        $(this).addClass("chosen")
        imgSrcStill = $(this).attr("data-still");
        imgArrayStill.push(imgSrcStill);
        localStorage.setItem("favStill", JSON.stringify(imgArrayStill));



        imgSrcAni = $(this).attr("data-ani")
        imgArrayAni.push(imgSrcAni);
        localStorage.setItem("favAni", JSON.stringify(imgArrayAni))
        loadStorage();


    });

//loads the saved favs preferences from the localstorage
    function loadStorage() {
        $("#add-fav").empty();

        currentFavStill = JSON.parse(localStorage.getItem("favStill"));
        currentFavAni = JSON.parse(localStorage.getItem("favAni"));


        if (!Array.isArray(currentFavStill && currentFavAni)) {
            currentFavStill = [];
            currentFavAni = [];
        }


        for (var i = 0; i < currentFavStill.length; i++) {
            var p = $("<img>");
            p.attr("src", currentFavStill[i]);
            p.addClass("fav")
            p.attr("data-still", currentFavStill[i])
            p.attr("data-ani", currentFavAni[i]);
            p.attr("data-state", "still");
            p.attr("data-index", i)
            $("#add-fav").append(p);
        }
    }
    loadStorage();


//attempted delete function to remove fav from local storage--doen't work
    $(document).on("dblclick", ".fav", function () {
        $(this).remove();
        var stills = JSON.parse(localStorage.getItem("favStill"));
        var anis = JSON.prase(localStorage.getItem("favAni"));
        var currentIndex = $(this).attr("data-index");

        stills.splice(currentIndex, 1);
        anis.splce(currentIndex, 1);
        imgArrayAni = anis;
        imgArrayStill = stills;

        localStorage.setItem("anis", JSON.stringify(anis));
        localStorage.setItem("stills", JSON.stringify(stills));

        loadStorage();
    })

});