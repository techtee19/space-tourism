"use strict";
const destinationContainer = document.querySelector(".dest-content");
const navLinks = document.querySelectorAll(".nav-links");

const updateNavActiveState = function (activePage) {
  navLinks.forEach((link) => {
    link.classList.remove("nav-links--active");
    const navText = link.textContent.split(" ")[1]?.toLowerCase() || "";
    if (navText === activePage) {
      link.classList.add("nav-links--active");
    }
  });
};

// Function to render the destination content
const renderDestination = function (data, className = "") {
  const html = `
    <div class="dest-cont ${className}">
      <div class="dest-img">
        <img src="${data.images.png}" alt="${data.name}">
      </div>
      <div class="dest-txt-cont">
        <ul class="dest-list">
          <li><a class="dest-link ${
            data.name.toLowerCase() === "moon" ? "dest-link--active" : ""
          }" href="#" data-dest="moon">MOON</a></li>
          <li><a class="dest-link ${
            data.name.toLowerCase() === "mars" ? "dest-link--active" : ""
          }" href="#" data-dest="mars">MARS</a></li>
          <li><a class="dest-link ${
            data.name.toLowerCase() === "europa" ? "dest-link--active" : ""
          }" href="#" data-dest="europa">EUROPA</a></li>
          <li><a class="dest-link ${
            data.name.toLowerCase() === "titan" ? "dest-link--active" : ""
          }" href="#" data-dest="titan">TITAN</a></li>
        </ul>
        <h1 class="dest-head">${data.name}</h1>
        <p class="dest-txt">${data.description}</p>
        <div class="dest-line"></div>
        <div class="distance-cont">
          <p class="distance-txt">AVG. DISTANCE <span>${
            data.distance
          }</span></p>
          <p class="distance-txt">EST. TRAVEL TIME <span>${
            data.travel
          }</span></p>
        </div>
      </div>
    </div>
  `;

  destinationContainer.innerHTML = "";
  destinationContainer.insertAdjacentHTML("beforeend", html);
  destinationContainer.style.opacity = 1;

  const destLinks = document.querySelectorAll(".dest-link");
  destLinks.forEach((link) =>
    link.addEventListener("click", function (e) {
      e.preventDefault();
      destLinks.forEach((l) => l.classList.remove("dest-link--active"));
      this.classList.add("dest-link--active");

      const destinationName = this.getAttribute("data-dest").toLowerCase();
      getDestinationData(destinationName);
    })
  );

  updateNavActiveState("destination");
};

const getDestinationData = function (destinationName) {
  fetch("data.json")
    .then((response) => {
      if (!response.ok) throw new Error("Network response was not ok");
      return response.json();
    })
    .then((data) => {
      const destination = data.destinations.find(
        (dest) => dest.name.toLowerCase() === destinationName
      );
      if (destination) {
        renderDestination(destination);
      } else {
        console.error("Destination not found");
      }
    })
    .catch((error) => console.error("Error fetching data:", error));
};

navLinks.forEach((link) =>
  link.addEventListener("click", function (e) {
    const navText = this.textContent.split(" ")[1]?.toLowerCase() || "";
    if (navText === "destination") {
      e.preventDefault();
      getDestinationData("moon");
    } else {
      updateNavActiveState(navText);
    }
  })
);

document.addEventListener("DOMContentLoaded", () => {
  if (destinationContainer) {
    getDestinationData("moon");
  } else {
    console.error("Destination container not found");
  }
});
