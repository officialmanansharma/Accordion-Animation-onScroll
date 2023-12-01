const accordionData = [
    { title: 'Section 1', content: 'Content for Section 1'},
    { title: 'Section 2', content: 'Content for Section 2'},
    { title: 'Section 3', content: 'Content for Section 3'},
    { title: 'Section 4', content: 'Content for Section 4'},
    { title: 'Section 5', content: 'Content for Section 5'},
    { title: 'Section 6', content: 'Content for Section 6'},
];

function createAccordion(){
    const accordionContainer = document.querySelector('.accordion-container');
    const sectionContainer = document.querySelector('.section-container');
    accordionData.forEach((data, index) => {
        //Create section container 
        const sectionDiv = document.createElement('div');
        sectionDiv.className = 'accordion-section';
    
        //Create section header
        const headerDiv = document.createElement('div');
        headerDiv.className = 'accordion-header';
        headerDiv.textContent = data.title;
        headerDiv.addEventListener('click', () => toggleSection(index));
    
        //Create section content
        const contentDiv = document.createElement('div');
        contentDiv.className = 'accordion-content';
        contentDiv.textContent = data.content;

        //Create Section 
        const section = document.createElement('section');
        section.id = index;
        section.className = 'section-style';
    
        // Append header and content to section container
        sectionDiv.appendChild(headerDiv);
        sectionDiv.appendChild(contentDiv);
    
        // Append section container to accordion container
        accordionContainer.appendChild(sectionDiv);

        // Append Section to Section container
        sectionContainer.appendChild(section);

        if(index === 0){
            toggleSection(0);
        }
    })

    // Add Intersection Observer
    const observer = new IntersectionObserver((entries) => {
        entries.forEach((entry) => {
            const sectionIndex = entry.target.id;
            const contentDiv = document.querySelectorAll('.accordion-content')[sectionIndex];
            const imageContainer = document.querySelector('.image-container');

            if (entry.isIntersecting) {
                // If section is in view, show content
                contentDiv.classList.add('open');
                imageContainer.innerHTML = '';

                // Create Image Section 
                const imageDiv = document.createElement('img');
                imageDiv.className = 'image-div';
                imageDiv.src = `https://picsum.photos/id/${sectionIndex}/600/400`;

                //Append Image div to Image container
                imageContainer.appendChild(imageDiv);
            } else {
                // If section is not in view, hide content
                contentDiv.classList.remove('open');
            }
        });
    }, { threshold: 0.5 }); // Adjust threshold as needed

    document.querySelectorAll('.section-style').forEach((section) => {
        observer.observe(section);
    });
}

function toggleSection(index) {
    const imageContainer = document.querySelector('.image-container');
    const contentDiv = document.querySelectorAll('.accordion-content')[index];
    contentDiv.classList.toggle('open');

    // Hide other sections
    document.querySelectorAll('.accordion-content').forEach((div, i) => {
        if (i !== index && div.classList.contains('open')) {
            div.classList.remove('open');
        }
    });

    // Scroll to the section
    const section = document.getElementById(index);
    section.scrollIntoView({ behavior: 'smooth' });

    imageContainer.innerHTML = '';

    // Create Image Section 
    const imageDiv = document.createElement('img');
    imageDiv.className = 'image-div';
    imageDiv.src = `https://picsum.photos/id/${index}/600/400`;

    //Append Image div to Image container
    imageContainer.appendChild(imageDiv);
}

// Function to scroll to the top
function scrollToTop() {
    window.scrollTo({
        top: 0,
        behavior: 'auto' // or 'smooth' for a smooth scroll
    });
}

// Attach an event listener to the window's beforeunload event
window.addEventListener('beforeunload', () => {
    // Scroll to the top when the page is refreshed
    scrollToTop();
});

createAccordion();
