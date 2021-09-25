import { postingsData } from "./postings-data.js";

/* =================== Variables ====================== */
/* ==================================================== */

const postingContainer = document.querySelector(".postings");
const activeFilters = document.querySelector(".active-filters");
const filterContainer = document.querySelector(".filters");
const clear = document.querySelector(".clear");
const filters = [];

/* =================== Functions ====================== */
/* ==================================================== */

/* Helper Functions
/* ==================================================== */

/**
 * Check if any value on one array matches any value in another
 * @param      {Array}    array   The array of values
 * @param      {Array}    target  The array being checked
 * @return     {Boolean}
 */
const checker = (array, target) => target.every((value) => array.includes(value));

/* App Functions
/* ==================================================== */

/**
 * Render the list of filtered jobs to the HTML
 * @param      {Array}  postings  The array of selected filters
 */
function renderPostings(postings) {
  postingContainer.innerHTML = postings
    .map(function (post, index) {
      return `
        <li class="card" style="--delay: ${index * 50}ms">
          <div class="card-inner container">
          <img class="logo" src="${post.logo}" alt="${post.company} Logo" />
          <div class="split">
            <h2>${post.company}</h2>
            <p class="highlight">New!</p>
            <p class="promoted">Featured</p>
          </div>
          <h3><a href="/">${post.position}</a></h3>
          <div class="split">
            <p class="age">${post.postedAt}</p>
            <p class="time">${post.contract}</p>
            <p class="location">${post.location}</p>
          </div>
          <div class="form split">
            <fieldset class="split">
              <legend class="visually-hidden">Filter by: Level</legend>
              <label for="${post.level}-${index}"
                >${post.level}
                <input data-level="${
                  post.level
                }" id="${post.level}-${index}" type="checkbox" />
              </label>
            </fieldset>
            <fieldset class="split">
              <legend class="visually-hidden">Filter by: Role</legend>
              <label for="${post.role}-${index}"
                >${post.role}
                <input data-role="${
                  post.role
                }" id="${post.role}-${index}" type="checkbox" />
              </label>
            </fieldset>
            <fieldset class="split">
              <legend class="visually-hidden">Filter by: Languages</legend>
              ${post.languages
                .map(function (language) {
                  return `<label for="${language}-${index}"
                  >${language}
                  <input data-languages="${language}" id="${language}-${index}" type="checkbox" />
                </label>`;
                })
                .join("")}
            </fieldset>
          </div>
          <div>
        </li>
      </ul> `;
    })
    .join("");
}

/**
 * Iterate through the job postings array to find filter matches
 */
function filterPostings(arrayToCheck) {
  const filterdPostingsData = [];
  arrayToCheck.forEach(function (post) {
    // Flatten object into array of values
    const values = Object.values(post).flat();
    // Check if any values match, if so push to new array
    if (checker(values, filters)) {
      filterdPostingsData.push(post);
    }
  });
  renderPostings(filterdPostingsData);
}

/**
 * Check or uncheck the checkboxes of the values being filtered
 * @param      {String}  values  The array of values being filtered
 */
function checkCheckboxes(values) {
  values.forEach(function (value) {
    const inputs = document.querySelectorAll(`input[id^="${value}"]`);
    inputs.forEach(function (input) {
      input.checked ? (input.checked = false) : (input.checked = true);
    });
  });
}

/**
 * Render the filter values to the HTML
 * @param      {Array}  filtersToRender  The array of filter values
 */
function renderFilters(filtersToRender) {
  // Check if there are filter values
  if (filtersToRender.length >= 1) {
    filterContainer.style.display = "flex";
  } else {
    filterContainer.style.display = "none";
  }
  // Render the HTML
  activeFilters.innerHTML = filtersToRender
    .map(function (filter, index) {
      return `<label for="active-${filter}-${index}"
        >${filter}
        <input data-filter="${filter}" id="active-${filter}-${index}" type="checkbox" checked/>
        <img src="./images/icon-remove.svg" alt="remove">
      </label>`;
    })
    .join("");
  // Listen on clear button and reset filters
  clear.addEventListener("click", function () {
    filters.length = 0;
    filterPostings(postingsData);
    renderFilters(filters);
    checkCheckboxes(filters);
  });
}

/**
 * Create an array of values to filter jobs against
 * @param      {Object}  event   The event object
 */
function updateFilters(event) {
  const filter = Object.entries(event.target.dataset)[0][1];
  if (filters.includes(filter)) {
    const index = filters.indexOf(filter);
    filters.splice(index, 1);
  } else {
    filters.push(filter);
  }
  filterPostings(postingsData);
  renderFilters(filters);
  checkCheckboxes(filters);
}

/* ============  Inits and Event Listeners  =========== */
/* ==================================================== */

document.addEventListener("change", updateFilters);
renderPostings(postingsData);
