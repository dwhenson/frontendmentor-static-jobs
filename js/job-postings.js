import { postingsData } from "./postings-data.js";

const main = document.querySelector("main");

function renderPostings(postings) {
	main.innerHTML = postings
		.map(function (post) {
			return `<ul class="posting">
				<li class="container">
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

// FIX render logic as currently returning || results and I need &&
// CHECK or is the problem that results are returning twice?

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
}

document.addEventListener("change", updateFilters);
renderPostings(postingsData);
