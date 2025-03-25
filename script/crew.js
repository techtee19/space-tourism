const crewContainer = document.querySelector(".crew-content");
const navLinks = document.querySelectorAll(".nav-links");

const renderCrew = function (data, className = "") {
  const html = ` <div class="crew-cont ${className}">
  <div class="dots">
              <a class="dots-dot ${
                data.role.toLowerCase() === "commander"
                  ? "dots__dot--active"
                  : ""
              }" data-crew="Commander"></a>
              <a class="dots-dot ${
                data.role.toLowerCase() === "mission specialist"
                  ? "dots__dot--active"
                  : ""
              }" data-crew="Mission Specialist"></a>
              <a class="dots-dot ${
                data.role.toLowerCase() === "pilot" ? "dots__dot--active" : ""
              }" data-crew="Pilot"></a>
              <a class="dots-dot ${
                data.role.toLowerCase() === "flight engineer"
                  ? "dots__dot--active"
                  : ""
              }" data-crew="Flight Engineer"></a>
            </div>
          <div class="crew-text-cont">
            <h2 class="crew-role"> ${data.role}</h2>
            <h1 class="crew-name">${data.name}</h1>
            <p class="crew-text">${data.bio}</p>
          </div>
          <div class="crew-img">
            <img src="${data.images.png}" alt="">
          </div>
        </div>`;

  crewContainer.innerHTML = "";
  crewContainer.insertAdjacentHTML("beforeend", html);
  crewContainer.style.opacity = 1;

  const dots = document.querySelectorAll(".dots-dot");
  dots.forEach((dot) => {
    dot.addEventListener("click", function () {
      const crewRole = this.getAttribute("data-crew").toLowerCase();
      getCrewData(crewRole);
    });
  });
};

const getCrewData = function (crewRole) {
  fetch("data.json")
    .then((response) => {
      if (!response.ok) throw new Error("Network response was not ok");
      return response.json();
    })
    .then((data) => {
      const crewMember = data.crew.find(
        (crew) => crew.role.toLowerCase() === crewRole
      );
      if (crewMember) {
        renderCrew(crewMember);
      } else {
        console.error(`Crew role "${crewRole}" not found`);
      }
      console.log(data);
    })
    .catch((error) => console.error("Error fetching data:", error));
};

navLinks.forEach((link) =>
  link.addEventListener("click", function (e) {
    const navText = this.textContent.split(" ")[1]?.toLowerCase() || "";
    if (navText === "crew") {
      e.preventDefault();
      getCrewData("commander");
    }
  })
);

document.addEventListener("DOMContentLoaded", () => {
  if (crewContainer) {
    getCrewData("commander");
  } else {
    console.error("Crew container not found");
  }
});
