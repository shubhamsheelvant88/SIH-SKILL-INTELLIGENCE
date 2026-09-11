const placementForm = document.getElementById("placementForm");

const message = document.getElementById("message");

const placementList = document.getElementById("placementList");

const courseFilter = document.getElementById("courseFilter");

const locationFilter = document.getElementById("locationFilter");

const yearFilter = document.getElementById("yearFilter");

const clearFilters = document.getElementById("clearFilters");

const totalRecords = document.getElementById("totalRecords");

const totalTrained = document.getElementById("totalTrained");

const totalPlaced = document.getElementById("totalPlaced");

const overallRate = document.getElementById("overallRate");


let allPlacements = [];


placementForm.addEventListener("submit", async (event) => {
  event.preventDefault();

  const courseName =
    document.getElementById("courseName").value.trim();

  const studentsTrained = Number(
    document.getElementById("studentsTrained").value
  );

  const studentsPlaced = Number(
    document.getElementById("studentsPlaced").value
  );

  const placementYear = Number(
    document.getElementById("placementYear").value
  );

  const location =
    document.getElementById("location").value.trim();

  const topSkills =
    document.getElementById("topSkills").value.trim();


  // Frontend validation

  if (studentsPlaced > studentsTrained) {
    message.textContent =
      "Students placed cannot exceed students trained.";

    message.style.color = "red";

    return;
  }


  const placementData = {
    courseName,
    studentsTrained,
    studentsPlaced,
    placementYear,
    location,
    topSkills
  };


  try {

    const response = await fetch("/api/placements", {
      method: "POST",

      headers: {
        "Content-Type": "application/json"
      },

      body: JSON.stringify(placementData)
    });


    const data = await response.json();


    if (!response.ok) {
      throw new Error(data.message);
    }


    message.textContent =
      "Placement record added successfully!";

    message.style.color = "green";


    // Clear form
    placementForm.reset();


    // Refresh dashboard
    fetchPlacements();

  } catch (error) {

    message.textContent = error.message;

    message.style.color = "red";

  }

});



async function fetchPlacements() {

  try {

    const response = await fetch("/api/placements");

    const data = await response.json();


    if (!response.ok) {
      throw new Error(data.message);
    }


    allPlacements = data;

    renderPlacements(allPlacements);

  } catch (error) {

    placementList.innerHTML = `
      <p class="no-records">
        Unable to load placement records.
      </p>
    `;

    console.error(error);

  }

}



function calculatePlacementRate(
  studentsTrained,
  studentsPlaced
) {

  if (studentsTrained === 0) {
    return 0;
  }

  return (
    (studentsPlaced / studentsTrained) * 100
  ).toFixed(2);

}


function renderPlacements(placements) {

  placementList.innerHTML = "";


  if (placements.length === 0) {

    placementList.innerHTML = `
      <p class="no-records">
        No placement records found.
      </p>
    `;

    updateStatistics([]);

    return;

  }


  placements.forEach((placement) => {

    const placementRate = calculatePlacementRate(
      placement.studentsTrained,
      placement.studentsPlaced
    );


    const skillsHTML = placement.topSkills
      .map((skill) => `
        <span class="skill">${skill}</span>
      `)
      .join("");


    const card = document.createElement("div");

    card.className = "placement-card";


    card.innerHTML = `
      <h2>${placement.courseName}</h2>

      <p>
        <strong>Students Trained:</strong>
        ${placement.studentsTrained}
      </p>

      <p>
        <strong>Students Placed:</strong>
        ${placement.studentsPlaced}
      </p>

      <p>
        <strong>Placement Rate:</strong>
        ${placementRate}%
      </p>

      <p>
        <strong>Year:</strong>
        ${placement.placementYear}
      </p>

      <p>
        <strong>Location:</strong>
        ${placement.location}
      </p>

      <div class="skills">
        <strong>Top Placement Skills:</strong>
        <br>
        ${skillsHTML || "No skills provided"}
      </div>

      <button
        class="delete-btn"
        onclick="deletePlacement('${placement._id}')"
      >
        Delete Record
      </button>
    `;


    placementList.appendChild(card);

  });


  updateStatistics(placements);

}



function updateStatistics(placements) {

  const trained = placements.reduce(
    (total, placement) =>
      total + placement.studentsTrained,
    0
  );


  const placed = placements.reduce(
    (total, placement) =>
      total + placement.studentsPlaced,
    0
  );


  const rate = calculatePlacementRate(
    trained,
    placed
  );


  totalRecords.textContent = placements.length;

  totalTrained.textContent = trained;

  totalPlaced.textContent = placed;

  overallRate.textContent = `${rate}%`;

}



async function deletePlacement(id) {

  const confirmed = confirm(
    "Are you sure you want to delete this record?"
  );


  if (!confirmed) {
    return;
  }


  try {

    const response = await fetch(
      `/api/placements/${id}`,
      {
        method: "DELETE"
      }
    );


    const data = await response.json();


    if (!response.ok) {
      throw new Error(data.message);
    }


    fetchPlacements();

  } catch (error) {

    alert(error.message);

  }

}


function applyFilters() {

  const courseValue =
    courseFilter.value.toLowerCase().trim();

  const locationValue =
    locationFilter.value.toLowerCase().trim();

  const yearValue =
    yearFilter.value.trim();


  const filtered = allPlacements.filter((placement) => {

    const matchesCourse =
      placement.courseName
        .toLowerCase()
        .includes(courseValue);


    const matchesLocation =
      placement.location
        .toLowerCase()
        .includes(locationValue);


    const matchesYear =
      yearValue === "" ||
      placement.placementYear === Number(yearValue);


    return (
      matchesCourse &&
      matchesLocation &&
      matchesYear
    );

  });


  renderPlacements(filtered);

}


courseFilter.addEventListener("input", applyFilters);

locationFilter.addEventListener("input", applyFilters);

yearFilter.addEventListener("input", applyFilters);


clearFilters.addEventListener("click", () => {

  courseFilter.value = "";

  locationFilter.value = "";

  yearFilter.value = "";

  renderPlacements(allPlacements);

});


fetchPlacements();