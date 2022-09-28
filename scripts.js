const links = {
    HypedStreet: {
        github: "https://github.com/juan9900/PaginaModa",
        website: 'https://juan9900.github.io/PaginaModa/'
    },
    F1: {
        github: "https://github.com/juan9900/f1",
        website: 'https://juan9900.github.io/f1/'
    },
    Bienes: {
        github: "https://github.com/juan9900/BienesRaices",
        website: 'https://juan9900.github.io/BienesRaices/'
    },
    QuizUp: {
        github: 'https://github.com/juan9900/QuizUp',
        website: 'https://juan9900.github.io/QuizUp/'
    }
}



const contactForm = document.getElementById('contact-form');


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

/*

$('contact-form').addEventListener('submit', (e) => {
    // e.preventDefault();
    // let xhr = new XMLHttpRequest();
    // xhr.open("POST", "https://formsubmit.co/829b4e1afbc9484f01f5d68ec30f3c57");

    // xhr.setRequestHeader("Accept", "application/json");
    // xhr.setRequestHeader("Content-Type", "application/json");

    // const name = contactForm.elements.formName.value;
    // const email = contactForm.elements.formEmail.value
    // const message = contactForm.elements.formMessage.value
    // xhr.onload = () => console.log();

    // let data = `{
    // "Name": ${name},
    // "Email": ${email},
    // "Message": ${message};
    // }`;

    // xhr.send(data)
    console.log('enviado')
    e.preventDefault();
    // fetch("https://formsubmit.co/ajax/829b4e1afbc9484f01f5d68ec30f3c57", {
    //     method: "POST",
    //     headers: {
    //         'Content-Type': 'application/json',
    //         'Accept': 'application/json'
    //     },
    //     body: JSON.stringify({
    //         name: 'nombre'
    //         // $('#contact-form').elements.formName.value
    //         ,
    //         email: 'email'
    //         // $('#contact-form').elements.formEmail.value
    //         ,
    //         message: 'mensaje'
    //         // $('#contact-form').elements.formMessage.value
    //     })
    // })
    //     .then(response => response.json())
    //     .then(data => console.log(data))
    //     .catch(error => console.log(error));

})
*/

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

    const websiteDesc = $(this).parent().siblings('h4').html();
    const websiteName = websiteDesc.split(" ")[0].replace(/\s/g, '');
    console.log(websiteName);
    $('#modal-work-title').html(websiteDesc)



    for (var link in links) {
        if (websiteName === link) {
            $('#modal-github-link').attr('href', links[link].github);
            $('#modal-website-link').attr('href', links[link].website);
        }
    }


    $('.modal-content').addClass('modal-open').removeClass('modal-close')
    $('.modal').css('display', 'flex')


    /*TODO: falta poner dinamicamente el titulo del modal al igual
    que el link, hay que obtener el texto del h3 mas cercano */
})
