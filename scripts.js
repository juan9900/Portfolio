// When the user scrolls the page, execute myFunction
window.onscroll = function () { myFunction() };

// Get the navbar
var navbar = document.getElementById("navbar");

// Get the offset position of the navbar
var sticky = navbar.offsetTop;

// Add the sticky class to the navbar when you reach its scroll position. Remove "sticky" when you leave the scroll position
function myFunction() {
    if (window.pageYOffset >= sticky) {
        navbar.classList.add("sticky")
    } else {
        navbar.classList.remove("sticky");
    }
}

// smooth scrolling
const linksContainers = [
    document.querySelector('#btn-logo'),
    document.querySelector('#btn-skills'),
    document.querySelector('#btn-about'),
    document.querySelector('#btn-works'),
    document.querySelector('#btn-contact'),
];

linksContainers.forEach(container => {
    container.addEventListener('click', function (e) {
        console.log('boton');
        const link = e.target.closest('.nav-link');
        if (!link) return;
        e.preventDefault();

        const sectionId = link.getAttribute('href');
        if (sectionId === '#') {
            window.scrollTo({ top: 0, behavior: 'smooth' });
        } else {
            const section = document.querySelector(sectionId).offsetTop - 100;
            // section.scrollIntoView({ behavior: 'smooth' });
            window.scroll({ top: section, behavior: "smooth" });

            if (link.classList.contains('main-nav-link')) {
                headerEl.classList.remove('nav-open');
            }
        }
    });
});