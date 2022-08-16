function load_courses(index, key=""){
    fetch(`http://localhost:3000/courses${index}`)
    .then(data => data.json())
    .then(data => {
        coursesDescription = document.querySelector('.courses-description');
        coursesDescription.innerHTML = `
            <h4>${data[0].header}</h4>
            <p>${data[0].description}</p>
        `;
        coursesExploreButton = document.querySelector('.explore-btn');
        coursesExploreButton.innerHTML = `Explore ${data[0].name}`;
        coursesContainer = document.querySelector('.courses-carousel');
        coursesContainer.innerHTML = ``;
        for(let i = 1; i < data.length; ++i) {
            let courseTitle = data[i].title;
            if (key !== "" && courseTitle.toLowerCase().indexOf(key.toLowerCase()) == -1) {
                continue;
            }
            const course = document.createElement('div');
            course.setAttribute('class', 'course-card');
            course.innerHTML = `
                <img class="course-img" src="${data[i].image}" alt="${data[i].title}">
                <p class="course-title">${data[i].title}</p>
                <p class="course-author">${data[i].instructors[0].name}</p>
                <div calss="course-rating">
                    <span class="course-rate">4.4</span>
                    <span class="fa fa-star checked"></span>
                    <span class="fa fa-star checked"></span>
                    <span class="fa fa-star checked"></span>
                    <span class="fa fa-star checked"></span>
                    <span class="fa fa-star-half-full checked"></span>
                    <span class="course-audience">(2,916)</span>
                </div>
                <span class="course-price">E£${data[i].price}</span>
            `;
            coursesContainer.append(course);
        }
    });
}

load_courses(1);

let searchButton = document.querySelector('.search-button');

searchButton.addEventListener("click", (event) => {
    event.preventDefault();
    let key = document.querySelector('.search-bar').value;
    console.log(key);
    load_courses(1, key);
});