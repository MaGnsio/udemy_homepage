function getCoursesHeader(header) {
    const coursesHeader = document.createElement(`h4`);
    coursesHeader.textContent = header;
    return coursesHeader;
}

function getCoursesDescription(description) {
    const coursesDescription = document.createElement(`p`);
    coursesDescription.textContent = description;
    return coursesDescription;
}

function loadCoursesInfo(header, description) {
    const coursesInfo = document.querySelector(`.courses-info`);
    coursesInfo.innerHTML = ``;
    coursesInfo.appendChild(getCoursesHeader(header));
    coursesInfo.appendChild(getCoursesDescription(description));
}

function loadCoursesExploreButton(name) {
    coursesExploreButton = document.querySelector(`.explore-btn`);
    coursesExploreButton.textContent = `Explore ${name}`;    
}

function getCourseImage(image, title) {
    const courseImage = document.createElement(`img`);
    courseImage.classList.add(`course-img`);
    courseImage.setAttribute(`src`, image, `alt`, title);
    return courseImage;
}

function getCourseTitle(title) {
    const courseTitle = document.createElement(`p`);
    courseTitle.classList.add(`course-title`);
    courseTitle.textContent = title;
    return courseTitle;
}

function getCourseAuthors(authors) {
    const courseAuthors = document.createElement(`p`);
    courseAuthors.classList.add(`course-author`);
    let authorsList = ``;
    for (let j = 0; j < authors.length; ++j) {
        if (j) {
            authorsList += `, `;
        }
        authorsList += authors[j];
    }
    courseAuthors.textContent = authorsList;
    return courseAuthors;
}

function getCourseRating(rating) {
    const courseRating = document.createElement(`div`);
    courseRating.classList.add(`course-rating`);
    const courseAverageStars = document.createElement(`span`);
    courseAverageStars.classList.add(`course-rate`);
    courseAverageStars.textContent = rating.toPrecision(2);
    courseRating.appendChild(courseAverageStars);
    for (let j = 1; j <= 5; ++j) {
        const star = document.createElement(`span`);
        star.classList.add(`fa`);
        if (j <= rating) {
            star.classList.add(`fa-star`, `checked`);
        } else if (j - 1 <= rating) {
            star.classList.add(`fa-star-half-full`, `checked`);
        } else {
            star.classList.add(`fa-star`);
        }
        courseRating.appendChild(star);
    }
    return courseRating;
}

function getCourse(courseData) {
    const courseContent = document.createElement(`div`);
    courseContent.classList.add(`course-card`);
    courseContent.appendChild(getCourseImage(courseData.image, courseData.title));
    courseContent.appendChild(getCourseTitle(courseData.title));
    courseContent.appendChild(getCourseAuthors(courseData.instructors));
    courseContent.appendChild(getCourseRating(courseData.rating));
    const coursePrice = document.createElement(`span`);
    coursePrice.classList.add(`course-price`);
    coursePrice.textContent = `E£${courseData.price}`;
    courseContent.appendChild(coursePrice);
    return courseContent;
}

function loadCourses(listName, key="") {
    fetch(`http://localhost:3000/${listName}`)
    .then(data => data.json())
    .then(data => {
        loadCoursesInfo(data[0].header, data[0].description);
        loadCoursesExploreButton(data[0].name);
        coursesContainer = document.querySelector('.courses-carousel');
        coursesContainer.innerHTML = ``;
        for(let i = 1; i < data.length; ++i) { 
            if (key !== "" && data[i].title.toLowerCase().indexOf(key.toLowerCase()) == -1) {
                continue;
            }
            coursesContainer.appendChild(getCourse(data[i]));
        }
    });
}

loadCourses("data_science");

const searchButton = document.querySelector(`.search-button`);

searchButton.addEventListener(`click`, (event) => {
    event.preventDefault();
    const key = document.querySelector(`.search-bar`).value;
    loadCourses("data_science", key);
});