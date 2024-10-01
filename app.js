// Elements 
const search = document.getElementById("search-id");
const locationText = document.getElementById("locationText");
const dayText = document.getElementById("dayText");
const temp = document.getElementById("temp");
const weatherText = document.getElementById("weatherText");

// Function to fetch weather data
function weatherPrediction(loc) {
    const apiKey = "3ae263d67d734e7aac594022243009"; // API key
    const url = `https://api.weatherapi.com/v1/current.json?key=${apiKey}&q=${loc}`;

    fetch(url)
        .then(response => {
            // Check if the response status is OK (200)
            if (!response.ok) {
                throw new Error('Network response was not ok: ' + response.status);
            }
            return response.json(); 
        })
        .then(data => {
            const locationName = data.location.name;
            locationText.innerText = locationName;
            const formattedTime = formatLocalTime(data.location.localtime);
            dayText.innerText = `Date: ${formattedTime}`; 
            temp.innerText = `Temperature: ${data.current.temp_c} °C`;
            weatherText.innerText = `Condition: ${data.current.condition.text}`;
        })
        .catch(error => {
            console.error('Error fetching the weather data:', error);
            locationText.innerText = 'Location not found'; 
        });
}

// Event listener for search input
search.addEventListener('keypress', function(event) {
    if (event.key === 'Enter') { 
        const loc = search.value; 
        weatherPrediction(loc); 
    }
});


// function for Formating date

function formatLocalTime(localtime) {
    const dateObj = new Date(localtime); 

    const months = ["Jan", "Feb", "Mar", "Apr", "May", "Jun", "Jul", "Aug", "Sep", "Oct", "Nov", "Dec"];
    const day = dateObj.getDate();
    const month = months[dateObj.getMonth()];
    const year = dateObj.getFullYear();
    const hours = dateObj.getHours();
    const minutes = dateObj.getMinutes().toString().padStart(2, '0'); 
    const getOrdinalSuffix = (n) => {
        if (n > 3 && n < 21) return "th";
        switch (n % 10) {
            case 1: return "st";
            case 2: return "nd";
            case 3: return "rd";
            default: return "th";
        }
    };

    const formattedDay = `${day}${getOrdinalSuffix(day)}`;
    const formattedTime = `${hours}:${minutes}`;

    return `${formattedDay} ${month} ${year} ${formattedTime}`;
}

