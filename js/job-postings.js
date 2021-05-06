import { postingsData } from "./postings-data.js";

const postingContainer = document.querySelector(".postings");
const activeFilters = document.querySelector(".active-filters");
const filterContainer = document.querySelector(".filters");

function renderPostings(postings) {
	postingContainer.innerHTML = postings
		.map(function (post) {
			return `
				<li class="card container">
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
					<form class="form split">
						<fieldset class="split">
							<legend class="visually-hidden">Filter by: Level</legend>
							<label for="${post.level}"
								>${post.level}
								<input data-level="${post.level}" id="${post.level}" type="checkbox" />
							</label>
						</fieldset>
						<fieldset class="split">
							<legend class="visually-hidden">Filter by: Role</legend>
							<label for="${post.role}"
								>${post.role}
								<input data-role="${post.role}" id="${post.role}" type="checkbox" />
							</label>
						</fieldset>
						<fieldset class="split">
							<legend class="visually-hidden">Filter by: Languages</legend>
							${post.languages
								.map(function (language) {
									return `<label for="${language}"
									>${language}
									<input data-languages="${language}" id="${language}" type="checkbox" />
								</label>`;
								})
								.join("")}
						</fieldset>
					</form>
				</li>
			</ul> `;
		})
		.join("");
}

const filters = [];
const checker = (array, target) => target.every((value) => array.includes(value));

function renderFilters(filtersToRender) {
	if (filtersToRender.length >= 1) {
		filterContainer.style.display = "flex";
	} else {
		filterContainer.style.display = "none";
	}

	activeFilters.innerHTML = filtersToRender
		.map(function (filter) {
			// prettier-ignore
			return /* html */`<label for="active-${filter}"
				>${filter}
				<input data-filter="HTML" id="${filter}" type="checkbox" />
				<img src="./images/icon-remove.svg" alt="remove">
			</label>`;
		})
		.join("");
}

function filterPostings() {
	const filterdPostingsData = [];
	postingsData.forEach(function (post) {
		const values = Object.values(post).flat();
		if (checker(values, filters)) {
			filterdPostingsData.push(post);
		}
	});
	renderPostings(filterdPostingsData);
}

function updateFilters(event) {
	if (filters.includes(event.target.id)) {
		const index = filters.indexOf(event.target.id);
		filters.splice(index, 1);
	} else {
		filters.push(event.target.id);
	}
	filterPostings();
	renderFilters(filters);
}

document.addEventListener("change", updateFilters);
renderPostings(postingsData);
