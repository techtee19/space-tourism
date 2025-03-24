"use strict";

const destinationContainer = document.querySelector(".dest-content");
const navLinks = document.querySelectorAll(".nav-links");

// Function to render the destination content
const renderDestination = function (data, className = "") {
  const html = `
    <div class="dest-cont ${className}">
      <div class="dest-img">
        <img src="${data.images.png}" alt="${data.name}">
      </div>
      <div class="dest-txt-cont">
        <ul class="dest-list">
          <li><a class="dest-link" href="#" data-dest="moon">MOON</a></li>
          <li><a class="dest-link" href="#" data-dest="mars">MARS</a></li>
          <li><a class="dest-link" href="#" data-dest="europa">EUROPA</a></li>
          <li><a class="dest-link" href="#" data-dest="titan">TITAN</a></li>
        </ul>
        <h1 class="dest-head">${data.name}</h1>
        <p class="dest-txt">${data.description}</p> <!-- Fixed typo: 'discription' -> 'description' -->
        <div class="dest-line"></div>
        <div class="distance-cont">
          <p class="distance-txt">AVG. DISTANCE <span>${data.distance}</span></p>
          <p class="distance-txt">EST. TRAVEL TIME <span>${data.travel}</span></p>
        </div>
      </div>
    </div>
  `;

  destinationContainer.innerHTML = "";
  destinationContainer.insertAdjacentHTML("beforeend", html);
  destinationContainer.style.opacity = 1;

  const destLinks = document.querySelectorAll(".dest-link");
  destLinks.forEach((link) =>
    link.addEventListener("click", function () {
      const destinationName = this.getAttribute("data-dest").toLowerCase();
      getDestinationData(destinationName);
    })
  );
};

// Function to fetch and filter destination data
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

// Add event listeners to nav links (optional, based on your navigation intent)
navLinks.forEach(
  (link) =>
    function (e) {
      e.preventDefault();

      const navText = this.textContent.split(" ")[10]?.toLowerCase || "";
      if (navText === "destination") {
        link.addEventListener("click", function (e) {
          getDestinationData("moon");
        });
      }
    }
);

document.addEventListener("DOMContentLoaded", () => {
  if (destinationContainer) {
    getDestinationData("moon");
  } else {
    console.error("Destination container not found");
  }
});
