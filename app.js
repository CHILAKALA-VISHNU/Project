document.getElementById("getWeatherBtn").addEventListener("click",()=>{
    if(!navigator.geolocation){
        alert("Geolocation not supported");
        return;
    }
    navigator.geolocation.getCurrentPosition(success,error);
});
function success(position){
    const lat=position.coords.latitude;
    const lon=position.coords.longitude;
    const apikey="YOUR_API_KEY_HERE";
    const url=`https://api.openweathermap.org/data/2.5/weather?lat=${lat}&lon=${lon}&units=metric&appid=${apikey}`;

    fetch(url)
        .then(res=>res.json())
        .then(data=>{
            console.log("Weather data : ", data);

            document.getElementById("weather").innerHTML =`
            <p><strong>Location : </strong> ${data.name}</p>
            <p><strong>Temperature : </strong>${data.main.temp}°C</p>
            <p><strong>Humidity : </strong>${data.main.humidity}%<p>
            <p><strong>Condition : </strong>${data.weather[0].description}</p>`;
        })
        .catch((err)=>{
            console.log("Fetch error : ",err);
            alert("Failed to get weather");
        });
    }
    function error(){
        alert("Unable to get your location");
    }