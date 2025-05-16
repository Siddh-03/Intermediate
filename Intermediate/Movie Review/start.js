document.querySelector("#searchbtn").addEventListener("click", async function () {
    let search = document.querySelector("#search").value.trim();
    let movie = document.querySelector("#movie");
    let loader = document.querySelector("#loader");
    
    
   
    movie.style.display = "none";
    loader.style.display = "block";
    
    if (search === "") {
        alert("Please specify a movie name!");
        loader.style.display = "none"; 
        return;
    }

    let home = document.querySelector(".home-cards");
    let heading = document.querySelector("#heading");
    heading.style.display = "none";
    home.style.display = "none";

    try {
        let response = await fetch(`http://www.omdbapi.com/?t=${search}&apikey=b34d90b5`);
        let data = await response.json();

        loader.style.display = "none"; 

        if (data.Response === "False") {
            alert("Movie not found. Please try again!");
            return;
        }

        movie.style.display = "block";
        movie.innerHTML = ` <div id = "movie-title">
            <h2>${data.Title} (${data.Year})</h2> <span id="fav-btn" class="material-symbols-outlined fav">favorite_border</span></div>
            <img src="${data.Poster}" alt="Movie Poster" style="width:200px">
            <p><strong>IMDB Rating:</strong> ${data.imdbRating}</p>
            <p><strong>Plot:</strong> ${data.Plot}</p>
            <p><strong>Director:</strong> ${data.Director}</p>
            <p><strong>Actors:</strong> ${data.Actors}</p>
            <a href="https://www.imdb.com/title/${data.imdbID}" target="_blank">More Info...</a><br>

              
            
            <textarea id="review-text" placeholder="Write Your Review here..." rows="3" cols="40"></textarea><br>
            <button id="review">Submit</button>
            <button id="back">Back</button>
        `;
        document.querySelector("#back").addEventListener("click", function () {
            location.reload();
        })
    } catch (error) {
        loader.style.display = "none"; 
        console.error("Error fetching movie data:", error);
        alert("Something went wrong! Please try again.");
    }
});

document.querySelector("#review").addEventListener("click", function () {
    let text = document.querySelector("#review-text").value.trim();
    if (text === "") {
        alert("Enter your review :( !!");
        return;
    }
    alert("Thank You for your review :)");
    document.querySelector("#review-text").value = "";
});

document.addEventListener("click", function (event) {
    if (event.target.classList.contains("fav")) {
        // Toggle the "filled" class
        event.target.classList.toggle("filled");

        // Change the icon text between "favorite_border" and "favorite"
        if (event.target.textContent === "favorite_border") {
            event.target.textContent = "favorite"; // Filled icon
        } else {
            event.target.textContent = "favorite_border"; // Outline icon
        }
    }
});

let mode = document.querySelector("#mode").addEventListener("click", function () {
    let body = document.body;
    body.classList.toggle("dark-mode");
    if (body.classList.contains("dark-mode")) {
        document.querySelector(".theme").textContent = "toggle_off";
        // body.style.backgroundColor = "rgb(46, 18, 18)";
    } else {
        document.querySelector(".theme").textContent = "toggle_on";
        // body.style.backgroundColor = "white";
    }
})
