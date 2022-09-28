const links = {
    HypedStreet: {
        github: "https://github.com/juan9900/PaginaModa",
        website: 'https://juan9900.github.io/PaginaModa/',
        description: 'Static website about trending clothes made with HTML + CSS + JS with the fullpage.js library.'
    },
    F1: {
        github: "https://github.com/juan9900/f1",
        website: 'https://juan9900.github.io/f1/',
        description: 'Static website about F1 data like, last results, next race, current positions and some historic data made with HTML + CSS '
    },
    Bienes: {
        github: "https://github.com/juan9900/BienesRaices",
        website: 'https://juan9900.github.io/BienesRaices/',
        description: 'Static website for finding/buying a house and read some blog articles made with HTML + CSS'
    },
    QuizUp: {
        github: 'https://github.com/juan9900/QuizUp',
        website: 'https://juan9900.github.io/QuizUp/',
        description: 'Small game inspired in Trivia Crack made with HTML + CSS + JS with api calls and AJAX'
    }
}



const contactForm = document.getElementById('contact-form');


// When the user scrolls the page, execute myFunction
window.onscroll = function () { myFunction() };

// Get the navbar
var navbar = document.querySelector("header");

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

//Scroll to section when click in navbar link
linksContainers.forEach(container => {
    container.addEventListener('click', function (e) {
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


//Toggle mobile navbar
$('#button-open-navbar').click(function () {
    toggleNavbar();
})

$('#button-close-navbar').click(function () {

    toggleNavbar();
})


function toggleNavbar() {
    $('#navbar').toggleClass('mobile-active');
    $('#button-open-navbar').toggleClass('invisible');
    $('#button-close-navbar').toggleClass('invisible');
}


//Close mobile navbar when touching a link
$('.nav-link').click(function (e) {
    toggleNavbar();
})

$('#contact-form').submit(function (e) {
    e.preventDefault();
    const formName = $('#formName').val();
    const formEmail = $('#formEmail').val();
    const formMessage = $('#formMessage').val();

    $.ajax({
        method: 'POST',
        url: 'https://formsubmit.co/ajax/829b4e1afbc9484f01f5d68ec30f3c57',
        dataType: 'json',
        accepts: 'application/json',
        data: {
            name: formName,
            email: formEmail,
            message: formMessage
        }
    })
        .always(function () {
            console.log('sending');
        })
        .done((data) => {
            console.log(data)
            hideContactForm();
        })
        .fail((err) => console.log(err))

});

function hideContactForm() {
    $('#form-title').addClass('centered-form-title');
    $('#form-title').removeClass('form-title')
    $('#form-title').text('Message sent successfully!');
    $('#contact-form').addClass('invisible');
    $('#form-message').addClass('invisible');
    $('#contact-form-container').addClass('form-centered')
    if ($(window).width() < 500) {
        $('.contact-container').css('height', '200px')
    } else if ($(window).width() < 1250) {
        $('.contact-container').css('height', '300px')
    } else {
        $('.contact-container').css('height', '660px')

    }
}

$(document).ready(function () {
    console.log('ready')
    $('#button-close-modal').click(function () {
        console.log('closed')
        $('.modal').css('display', 'none')
        $('.modal-content').removeClass('modal-open').addClass('modal-close')
    })
})

$('.button-know-more').click(function (e) {

    const websiteDesc = $(this).parent().siblings('h4').text();
    const websiteName = websiteDesc.split(" ")[0].replace(/\s/g, '');
    console.log(websiteName);
    $('#modal-work-title').text(websiteDesc)



    for (var link in links) {
        if (websiteName === link) {
            $('#modal-web-description').text(links[link].description);
            $('#modal-github-link').attr('href', links[link].github);
            $('#modal-website-link').attr('href', links[link].website);
        }
    }


    $('.modal-content').addClass('modal-open').removeClass('modal-close')
    $('.modal').css('display', 'flex')


    /*TODO: falta poner dinamicamente el titulo del modal al igual
    que el link, hay que obtener el texto del h3 mas cercano */
})
