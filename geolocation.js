const apiKey = "85399ddb44532cb5731eae56b0a3e893";
const baseUrl = "https://api.openweathermap.org/data/2.5";

const country = document.querySelector("#row2");
const detailContainer = document.querySelector("#foot");
const map = document.getElementById("maps");

function iframeUpdate(latitude, longitude) {
  const ele = document.createElement("iframe");
  ele.id = "iframe";

  ele.src = `https://maps.google.com/maps?q=${latitude}, ${longitude}&z=15&output=embed`;
  ele.width = "100%";
  ele.height = "100%";
  ele.frameBorder = 0;
  ele.style.border = 0;

  map.appendChild(ele);
}

function getLocation() {
  navigator.geolocation.getCurrentPosition((success) => {
    let { latitude, longitude } = success.coords;

    fetchLocation(latitude, longitude);
    iframeUpdate(latitude, longitude);
  });
}

async function fetchUVIndex(latitude, longitude) {
  const endPoint = `https://api.openweathermap.org/data/2.5/uvi?appid=${apiKey}&lat=${latitude}&lon=${longitude}`;

  try {
    const response = await fetch(endPoint, { mode: "no-cors" });
    const result = await response.json();

    console.log(result);
  } catch (error) {
    console.log("error occured");
  }
}

function windDirection(degree) {
  if (degree == 0) {
    return "North";
  }
  if (degree == 90) {
    return "East";
  }
  if (degree == 180) {
    return "South";
  }
  if (degree == 270) {
    return "West";
  }
  if (degree > 0 && degree < 90) {
    return "North-East";
  }
  if (degree > 90 && degree < 180) {
    return "South-East";
  }
  if (degree > 180 && degree < 270) {
    return "South-West";
  }
  if (degree > 180 && degree < 360) {
    return "North-West";
  }
}

function toCelcius(temp) {
  return temp - 273.15;
}

function renderIntopUI(data) {
  country.innerHTML = `
        <button type="button" class="lbox" id="latitudebox">Lat : ${data.coord.lat}</button>
        <button type="button" class="lbox" id="longbox">Long : ${data.coord.lon}</button>`;
}

function renderInBottomUI(data) {
  const ele2 = document.createElement("div");
  ele2.className = "row2";
  ele2.innerHTML = `
        <button class="footbtn">Location: ${data.name}</button>
        <button class="footbtn">Wind Speed: ${data.wind.speed} kmph</button>
        <button class="footbtn">Humidity : ${data.main.humidity} %</button>
        <button class="footbtn">Time Zone : GMT + 5:30</button>
        <button class="footbtn">Pressure: ${data.main.pressure} mbar</button>
        <button class="footbtn">Wind Direction : ${windDirection(
          data.wind.deg
        )}</button>
        <button class="footbtn">UV Index : 1</button>
        <button class="footbtn">Feels like: ${Math.floor(
          toCelcius(data.main.feels_like)
        )}°</button>`;

  detailContainer.appendChild(ele2);
  return;
}

async function fetchLocation(latitude, longitude) {
  const endPoint = `${baseUrl}/weather?lat=${latitude}&lon=${longitude}&appid=${apiKey}`;

  try {
    const response = await fetch(endPoint);
    const result = await response.json();

    console.log(result);
    renderIntopUI(result);
    renderInBottomUI(result);
  } catch (error) {
    console.log("Something went wrong");
  }
}