$(document).ready(() => {

        $("#btnId").hover(function() {
            $(this).toggleClass("hoverButton");
        })

        $("#btnName").hover(function() {
            $(this).toggleClass("hoverButton");
        })

        $("#btnId").click(function() {

            $Mid = $("#inputId").val();
            console.log($Mid);
            if ($Mid!="") {
                $(".back").css("display","block");
            }
            else{alert("Enter IMDB ID")}
            $url= 'https://www.omdbapi.com/?i=' +$Mid+ '&apikey=499e294';  
            getAllData($url);            

        });

        $("#btnName").click(function() {

            $Name = $("#inputName").val();
            if ($Name!="") {
                $(".back").css("display","block");
            }
            else{alert("Enter Movie Name")}
            $Year = $("#inputYear").val();
            console.log($Name);
            console.log($Year);
            $url= 'https://www.omdbapi.com/?t=' +$Name+ '&y=' +$Year+ '&apikey=99fd5e8e';
            getAllData($url);
        })

    
}); 

let getAllData=($url)=> {

    console.log("making request")

    $.ajax({
        type: 'GET', 
        dataType: 'json',
        async: true,
        url: $url,
        success: (data) => { 
            console.log(data);
            if (data.Title!= undefined) {
                $("#title").empty().append("<b>Title:</b> "+ data.Title);
            }
            else{
                alert("Movie is not available");
                $(".back").css("display","none");
            }
            $("#runtime").empty().append("<b>Runtime:</b> "+data.Runtime);
            $("#director").empty().append("<b>Director:</b> "+data.Director);
            $("#rated").empty().append("<b>Rated:</b> "+data.Rated);
            $("#year").empty().append("<b>Year:</b> "+data.Year);
            $("#genre").empty().append("<b>Genre:</b> "+data.Genre);
            $("#writer").empty().append("<b>Writer:</b> "+data.Writer);
            $("#actors").empty().append("<b>Actors:</b> "+data.Actors);
            $("#plot").empty().append("<b>Plot:</b> "+data.Plot);
            $("#language").empty().append("<b>Language:</b> "+data.Language);
            $("#country").empty().append("<b>Country:</b> "+data.Country);
            $("#awards").empty().append("<b>Awards:</b> "+data.Awards);

            $("#ratings").empty();
            for (response of data.Ratings) {
                let temp= `<div class="col-7 col-sm-6 col-xl-4"><i>${response.Source}</i></div>
                           <div class="col-5 col-sm-6 col-xl-8">${response.Value}</div>`;
                $("#ratings").append(temp);
            }

            if(data.Poster!='N/A')
            {
                $("#poster").empty().html('<img class="center posteri"  src="' + data.Poster  +`"/>`);
            }
            else{
                $("#poster").empty().html(`<img src="No-image-available.jpg" class="center posteri"/>`);
            }
            $("#metascore").empty().append("<b>Metascore:</b> "+data.Metascore);
            $("#imdbRating").empty().append("<b>ImdbRating:</b> "+data.imdbRating);
            $("#imdbVotes").empty().append("<b>ImdbVotes:</b> "+data.imdbVotes);
            $("#imdbID").empty().append("<b>ImdbID:</b> "+data.imdbID);
            $("#Type").empty().append("<b>Type:</b> "+data.Type);
            $("#DVD").empty().append("<b>Dvd:</b> "+data.DVD);
            $("#BoxOffice").empty().append("<b>BoxOffice:</b> "+data.BoxOffice);
            $("#Production").empty().append("<b>Production:</b> "+data.Production);
            $("#website").empty().append("<b>Website:</b> "+data.Website);
            $("#response").empty().append("<b>Response:</b> "+data.Response);
        },

         error :(err) =>{

            console.log(err.responseJSON.error.message);
            alert(err.responseJSON.error.message);

    },

        timeout: 3000

    })
}