function load_courses(index, key=""){
    fetch(`http://localhost:3000/courses${index}`)
    .then(data => data.json())
    .then(data => {
        const coursesInfo = document.querySelector(`.courses-info`);
        coursesInfo.innerHTML = ``;
        const coursesHeader = document.createElement(`h4`);
        coursesHeader.textContent = data[0].header;
        const coursesDescription = document.createElement(`p`);
        coursesDescription.textContent = data[0].description;
        coursesInfo.appendChild(coursesHeader);
        coursesInfo.appendChild(coursesDescription);
        coursesExploreButton = document.querySelector(`.explore-btn`);
        coursesExploreButton.textContent = `Explore ${data[0].name}`;
        coursesContainer = document.querySelector('.courses-carousel');
        coursesContainer.innerHTML = ``;
        for(let i = 1; i < data.length; ++i) { 
            if (key !== "" && data[i].title.toLowerCase().indexOf(key.toLowerCase()) == -1) {
                continue;
            }
            const courseContent = document.createElement(`div`);
            courseContent.classList.add(`course-card`);
            coursesContainer.appendChild(courseContent);
            const courseImage = document.createElement(`img`);
            courseImage.classList.add(`course-img`);
            courseImage.setAttribute(`src`, `${data[i].image}`, `alt`, `${data[i].title}`);
            courseContent.appendChild(courseImage);
            const courseTitle = document.createElement(`p`);
            courseTitle.classList.add(`course-title`);
            courseTitle.textContent = `${data[i].title}`;
            courseContent.appendChild(courseTitle);
            const courseAuthor = document.createElement(`p`);
            courseAuthor.classList.add(`course-author`);
            let authorsList = ``;
            for (let j = 0; j < data[i].instructors.length; ++j) {
                if (j) {
                    authorsList += `, `;
                }
                authorsList += `${data[i].instructors[j].name}`;
            }
            courseAuthor.textContent = authorsList;
            courseContent.appendChild(courseAuthor);
            const courseRating = document.createElement(`div`);
            courseRating.classList.add(`course-rating`);
            courseContent.appendChild(courseRating);
            const courseAverageStars = document.createElement(`span`);
            courseAverageStars.classList.add(`course-rate`);
            const courseRate = data[i].rating;
            courseAverageStars.textContent = courseRate.toPrecision(2);
            courseRating.appendChild(courseAverageStars);
            for (let j = 1; j <= 5; ++j) {
                const star = document.createElement(`span`);
                star.classList.add(`fa`);
                if (j <= courseRate) {
                    star.classList.add(`fa-star`, `checked`);
                } else if (j - 1 <= courseRate) {
                    star.classList.add(`fa-star-half-full`, `checked`);
                } else {
                    star.classList.add(`fa-star`);
                }
                courseRating.appendChild(star);
            }
            const coursePrice = document.createElement(`span`);
            coursePrice.classList.add(`course-price`);
            coursePrice.textContent = `E£${data[i].price}`;
            courseContent.appendChild(coursePrice);
        }
    });
}

load_courses(1);

let searchButton = document.querySelector(`.search-button`);

searchButton.addEventListener(`click`, (event) => {
    event.preventDefault();
    let key = document.querySelector(`.search-bar`).value;
    load_courses(1, key);
});