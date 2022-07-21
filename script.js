
let _e = (el) => document.querySelector(el);

let dataContainer = _e("#data");

let date = new Date();

_e("form").addEventListener("submit",(e) => {
    e.preventDefault();
    let search = _e("input").value;
    getLa(search)
    renderSearched(search);
    e.target.reset();
})

const renderSearched=(val) => {
    let searched = document.createElement("button");
    searched.innerHTML = val;
    searched.dataset.val = val;
    searched.classList.add("btn","btn-secondary","w-100");
    
    _e("#search").appendChild(searched);
     searched.addEventListener("click",(e)=>{
        e.preventDefault()
        getLa(e.target.innerHTML)
     })
}

const showDays = (days => {
    for (let i = 0; i < 5; i++){
        let box = document.createElement("div");
        let weatherImage = "";
        if(days[i].weather.main === "windy") weatherImage = "💨"
        else if(days[i].weather.main === "rainy") weatherImage = "☔"
        else if(days[i].weather.main === "sunny") weatherImage = "☀"

        box.innerHTML = `
        <h3>${date.getDate() + i}/${date.getMonth() + 1}/${date.getFullYear()}</h3>
        <div>${weatherImage}</div>
        <div class="d-flex" >
            <p>Wind: </p><span>${days[i].wind_deg}</span>
           </div>
           <div class="d-flex" >
            <p>Temperature: </p><span>${days[i].temp.day}</span>
           </div>
           <div class="d-flex" >
            <p>Humidity: </p><span>${days[i].humidity}</span>
           </div>
        `;
        box.classList.add("box");
        _e("#dt").appendChild(box)
    }
    
})
const updateChart = (info) =>{

    _e(".city").innerHTML = `${info.timezone} ${date.getDate()}/${date.getMonth() + 1}/${date.getFullYear()}`;
    _e(".wind").innerText = info.current.wind_deg
    _e(".temp").innerText = info.current.temp
    _e(".hum").innerText = info.current.humidity
    _e(".press").innerText = info.current.pressure
    _e(".uv").innerText = info.current.uvi
    let classToAdd = "green"
    if(info.current.uvi > 2) classToAdd = "mild"
    else if(info.current.uvi > 5) classToAdd = "severe"
    _e(".uv").classList.add(classToAdd) 
    let days = info.daily;
    _e("#dt").innerHTML = ""
    showDays(days);
}

const getInfo = (la,lo) => {
    console.log(la,lo)
    fetch(`https://api.openweathermap.org/data/2.5/onecall?lat=${la}&lon=${lo}&units=imperial&appid=a7f5d6a06c65976eea30661bb630099b`).then(response=>response.json()).then (data=>updateChart(data))
}



const getLa = (val) => {
    fetch(`http://api.openweathermap.org/geo/1.0/direct?q=${val}&appid=a7f5d6a06c65976eea30661bb630099b`).then(response =>  response.json()).then(a=>getInfo(a[0].lat, a[0].lon))
}