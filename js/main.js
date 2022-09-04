// vars related to toggling light/dark themes:
const theme = 'theme';
const dataTheme = 'data-theme';
const themeTab = '.theme-tab';
const switcherBtn = '.switcher-btn';
const dark = 'dark';
const light = 'light';
const open = 'open';
const active = 'active';

const modalOpen = '[data-open]';
const modalClose = '[data-close]';
const isVisible = 'is-visible';

const dataFilter = '[data-filter]';
const portfolioData = '[data-item]';

// var to store value of page root:
const root = document.documentElement;


// THEME
const toggleTheme = document.querySelector(themeTab);
const switcher = document.querySelectorAll(switcherBtn); // querySelectorAll returns all elements w/ given class & puts them into an array (like getElementsByClassName)
const currentTheme = localStorage.getItem(theme); // theme that the user sets is saved


// PORTFOLIO
const filterLink = document.querySelectorAll(dataFilter);
const portfolioItems = document.querySelectorAll(portfolioData);
const searchBox = document.getElementById('search'); // formerly document.querySelector('#search')
const portfolioCards = document.getElementsByClassName('portfolio-card');

let allCardsInfo = [
    { dataItem: 'web', dataOpen: 'project-one', dataID: 'project-one', imgSrc: './assets/images/portfolio-1.jpg', projectCategory: 'Web Development', projectTitle: 'Food Website' },
    { dataItem: 'web', dataOpen: 'project-two', dataID: 'project-two', imgSrc: './assets/images/portfolio-2.jpg', projectCategory: 'Web Development', projectTitle: 'Skate Website' },
    { dataItem: 'web', dataOpen: 'project-three', dataID: 'project-three', imgSrc: './assets/images/portfolio-3.jpg', projectCategory: 'Web Development', projectTitle: 'A Shopping Website' },
    { dataItem: 'ui', dataOpen: 'project-four', dataID: 'project-four', imgSrc: './assets/images/portfolio-4.jpg', projectCategory: 'UI Design', projectTitle: 'Dope Design' },
    { dataItem: 'app', dataOpen: 'project-five', dataID: 'project-five', imgSrc: './assets/images/portfolio-5.jpg', projectCategory: 'App Development', projectTitle: 'Game App' },
    { dataItem: 'app', dataOpen: 'project-six', dataID: 'project-six', imgSrc: './assets/images/portfolio-7.jpg', projectCategory: 'App Development', projectTitle: 'Gambling App' },
    { dataItem: 'app', dataOpen: 'project-seven', dataID: 'project-seven', imgSrc: './assets/images/portfolio-6.jpg', projectCategory: 'App Development', projectTitle: 'Money App' },
    { dataItem: 'ui', dataOpen: 'project-eight', dataID: 'project-eight', imgSrc: './assets/images/portfolio-8.jpg', projectCategory: 'UI Design', projectTitle: 'Fantastical Design' }
]
// Function to populate HTML, based on array of info above:
const popCards = () => {
    for (let i = 0; i < allCardsInfo.length; i++) {
        document.getElementById('portfolio-grid').innerHTML +=
            "<div' class='portfolio-card' data-item="
            + allCardsInfo[i].dataItem 
            + ' '
            + "id="
            + allCardsInfo[i].dataID
            + ">"
            + "<div class='card-body'>"
            + "<img src='"
            + allCardsInfo[i].imgSrc + "' alt='portfolio-image'>"
            + "<div data-open='" + allCardsInfo[i].dataOpen + "'" + "class='card-popup-box'>"
            + "<div>"
            + allCardsInfo[i].projectCategory
            + "</div>"
            + "<h3>"
            + allCardsInfo[i].projectTitle
            + "</h3>"
            + "</div>"
            + "</div>"
            + "</div>"
    }
}


// MODAL
const openModal = document.querySelectorAll(modalOpen);
const closeModal = document.querySelectorAll(modalClose);

const setActive = (elem, selector) => {
    if (document.querySelector(`${selector}.${active}`) !== null) {
        document.querySelector(`${selector}.${active}`).classList.remove(active);
    }
    elem.classList.add(active);
}

const setTheme = (val) => {
    if (val === dark) {
        root.setAttribute(dataTheme, dark);
        localStorage.setItem(theme, dark);
    } else {
        root.setAttribute(dataTheme, light);
        localStorage.setItem(theme, light);
    }
}

if (currentTheme) {
    root.setAttribute(dataTheme, currentTheme);
    switcher.forEach((btn) => {
        btn.classList.remove(active);
    })

    if (currentTheme === dark) {
        switcher[1].classList.add(active); // dark btn to active
    } else {
        switcher[0].classList.add(active); // light btn to active
    }
}

toggleTheme.addEventListener('click', function() {
    const tab = this.parentElement.parentElement;
    if (!tab.className.includes(open)) {
        tab.classList.add(open);
    } else {
        tab.classList.remove(open);
    }
})

for (const elem of switcher) {
    elem.addEventListener('click', function() {
        const toggle = this.dataset.toggle; // dataset corresponds to data in data-toggle
        // set active state:
        setActive(elem, switcherBtn);
        setTheme(toggle);
    })
}

// Display portfolio items based on search:
// KEEP COMMENTED-OUT CODE FROM JASON, JUST IN CASE
/* searchBox.addEventListener('keyup', (eventObject) => {
    const searchInput = eventObject.target.value.toLowerCase().trim();
    portfolioItems.forEach((card) => {
        if (card.dataset.item.includes(searchInput)) {
            console.log('hi')
            card.style.display = 'block';
        } else {
            card.style.display = 'none';
        }
    })
}) */

searchBox.addEventListener('keyup', (eventObject) => {
    const searchInput = eventObject.target.value.toLowerCase().trim();
    console.log(searchInput);
    for (const card of portfolioCards) {
        if (card.dataset.item.includes(searchInput)) {
            card.style.display = 'block';
        } else {
            card.style.display = 'none';
        }
    }
})

// Filter portfolio items based on user selection of links:
// KEEP COMMENTED-OUT CODE FROM JASON, JUST IN CASE
/* for (const link of filterLink) {
    link.addEventListener('click', function() {
        setActive(link, '.filter-link');
        const filter = this.dataset.filter;
        portfolioItems.forEach((card) => {
            if (filter === 'all') {
                //document.getElementById('all-work-link').style.color = '#495fef';
                card.style.display = 'block';
            } else if (card.dataset.item === filter) {
                card.style.display = 'block';
            } else {
                card.style.display = 'none';
            }
        })
    })
} */

for (const link of filterLink) {
    link.addEventListener('click', function() {
        setActive(link, '.filter-link');
        for (const card of portfolioCards) {
            if (link.dataset.filter === card.dataset.item) {
                card.style.display = 'block';
            } else if (link.dataset.filter === 'all') {
                card.style.display = 'block';
            } else {
                card.style.display = 'none';
            }
        }
    })
}

// Modal/Full site modal 'open buttons'
for (const elem of openModal) {
    elem.addEventListener('click', function() {
        const modalId = this.dataset.open; // this refers to parent element, which is elem here. It then accesses datasets that are followed by 'open'. Don't use arrow func here, so that this keyword works;
        document.getElementById(modalId).classList.add(isVisible); // this adds .is-visible as a class to everything in document with data-open="about" or "contact"
    })
}

// Remove isVisible class from elements in HTML with data-close attribute upon click:
for (const elem of closeModal) {
    elem.addEventListener('click', function() {
        this.parentElement.parentElement.parentElement.classList.remove(isVisible);
    })
}