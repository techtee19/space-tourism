const techContainer = document.querySelector(".tech-content");
const navLinks = document.querySelectorAll(".nav-links");

const renderTech = function (data, className = "") {
  const html = ` <div class="tech-tabs ${className}">
    <a class="tech-tab ${
      data.name.toLowerCase() === "launch vehicle" ? "tech-tab--active" : ""
    }" data-tech="launch vehicle">1</a>
        <a class="tech-tab ${
          data.name.toLowerCase() === "spaceport" ? "tech-tab--active" : ""
        }" data-tech="spaceport">2</a>
            <a class="tech-tab ${
              data.name.toLowerCase() === "space capsule"
                ? "tech-tab--active"
                : ""
            }" data-tech="space capsule">3</a>
                </div>
                <div class="tech-text-cont">
                <h3 class="tech-subheading">The Terminology...</h3>
                <h1 class="tech-title">${data.name}</h1>
                <p class="tech-description">
                ${data.description}
                </p>
                </div>
                <div class="tech-img">
                <img src="${data.images.portrait}" alt="${data.name}">
                </div>`;

  techContainer.innerHTML = "";
  techContainer.insertAdjacentHTML("beforeend", html);
  techContainer.style.opacity = 1;

  const tabs = document.querySelectorAll(".tech-tab");
  tabs.forEach((tab) =>
    tab.addEventListener("click", function (e) {
      e.preventDefault();
      tabs.forEach((t) => t.classList.remove("tech-tab--active"));
      this.classList.add("tech-tab--active");
      const techName = this.getAttribute("data-tech").toLowerCase();
      getTechData(techName);
    })
  );
  updateNavActiveState("technology");
};

const getTechData = function (techName) {
  fetch("data.json")
    .then((response) => {
      if (!response.ok) throw new Error("Network response was not okay");
      return response.json();
    })
    .then((data) => {
      const techData = data.technology.find(
        (tech) => tech.name.toLowerCase() === techName
      );
      if (techData) {
        renderTech(techData);
      } else {
        console.error(`Tech name "${techName}" not found`);
      }
    })
    .catch((error) => console.error("Error fetching data:", error));
};

const updateNavActiveState = function (activePage) {
  navLinks.forEach((link) => {
    link.classList.remove("nav-links--active");
    const navText = link.textContent.split(" ")[1]?.toLowerCase() || "";
    if (navText === activePage) {
      link.classList.add("nav-links--active");
    }
  });
};

navLinks.forEach((link) =>
  link.addEventListener("click", function (e) {
    const navText = this.textContent.split(" ")[1]?.toLowerCase() || "";
    if (navText === "technology") {
      e.preventDefault();
      getTechData("launch vehicle");
    } else {
      updateNavActiveState(navText);
    }
  })
);

document.addEventListener("DOMContentLoaded", () => {
  if (techContainer) {
    getTechData("launch vehicle");
  } else {
    console.error("Technology container not found");
  }
});

// console.log(getTechData("Launch vehicle"));
window.addEventListener("resize", () => {
  if (techContainer) {
    const currentTech = document
      .querySelector(".tech-title")
      .textContent.toLowerCase();
    getTechData(currentTech);
  }
});
