const fetchBtn = document.getElementById("fetch-btn");
const form = document.getElementById("landingForm");
const app = document.querySelector(".app");
const latitudeButton = document.getElementById("latitudebox");
const longitudeButton = document.getElementById("longbox");
const iframe = document.getElementById("iframe");
// Footer Buttons that show the txt
// const locationButton = document.getElementById("location");
// const windSpeedButton = document.getElementById("windspeed");
// const humidityButton = document.getElementById("humidity");
// const timezoneButton = document.getElementById("timezone");
// const pressureButton = document.getElementById("pressure");
// const windDirectionButton = document.getElementById("winddirection");
// const uvindexButton = document.getElementById("uvindex");
// const feellikeButton = document.getElementById("feellike");

form.addEventListener("submit", (event) => {
  event.stopPropagation();
  event.preventDefault();
  form.style.display = "none";
  app.style.display = "flex";
  getLocation();
});