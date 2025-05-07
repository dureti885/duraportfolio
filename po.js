document.addEventListener('DOMContentLoaded', () => {
    const sections = document.querySelectorAll('.section');
    const navLinks = document.querySelectorAll('.nav-menu li a');
    const navbar = document.querySelector('.navbar');
    const navHeight = navbar.offsetHeight;

    
    window.addEventListener('scroll', () => {
        if (window.scrollY > navHeight / 2) { 
            navbar.classList.add('scrolled');
        } else {
            navbar.classList.remove('scrolled');
        }
    });


    
    const revealObserverOptions = {
        root: null,
        rootMargin: '0px',
        threshold: 0.1
    };

    const revealCallback = (entries, observer) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add('visible');
               
            }
        });
    };

    const revealObserver = new IntersectionObserver(revealCallback, revealObserverOptions);
    sections.forEach(section => {
        revealObserver.observe(section);
    });


    
    const navObserverOptions = {
        root: null,
        
        rootMargin: `-${navHeight + 50}px 0px -40% 0px`, 
        threshold: 0 
    };

    const navCallback = (entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                
                navLinks.forEach(link => link.classList.remove('active'));

                
                const targetId = entry.target.getAttribute('id');
                const activeLink = document.querySelector(`.nav-menu li a[href="#${targetId}"]`);
                if (activeLink) {
                    activeLink.classList.add('active');
                }
            }
        });
    };

    const navObserver = new IntersectionObserver(navCallback, navObserverOptions);
    sections.forEach(section => {
        
        if (section.id) {
            navObserver.observe(section);
        }
    });


   
    const smoothScrollLinks = document.querySelectorAll('a[href^="#"]:not([href="#"])');

    smoothScrollLinks.forEach(link => {
        link.addEventListener('click', function (e) {
            const href = this.getAttribute('href');
            
            if (href.length > 1 && document.querySelector(href)) {
                e.preventDefault();
                const targetElement = document.querySelector(href);
                if (targetElement) {
                    
                    const elementPosition = targetElement.getBoundingClientRect().top;
                    const offsetPosition = elementPosition + window.pageYOffset - navHeight;

                    window.scrollTo({
                        top: offsetPosition,
                        behavior: 'smooth'
                    });

                  
                }
            }
        });
    });


    

});
