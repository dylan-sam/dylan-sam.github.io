
const config_file = 'config.yml';
const homepage_sections = ['home', 'publications', 'awards'];
const supported_languages = ['en', 'fr'];


window.addEventListener('DOMContentLoaded', () => {
    const urlParams = new URLSearchParams(window.location.search);
    const requestedLanguage = urlParams.get('lang');
    const lang = supported_languages.includes(requestedLanguage) ? requestedLanguage : 'fr';
    const content_dir = 'contents/' + lang + '/';
    const contentPage = document.body.dataset.contentPage;
    const declaredSections = document.body.dataset.contentSections;
    const sectionNames = declaredSections
        ? declaredSections.split(',').map(section => section.trim()).filter(Boolean)
        : (contentPage ? [contentPage] : homepage_sections);
    const currentPage = window.location.pathname.split('/').pop() || 'index.html';

    document.documentElement.lang = lang;

    // Keep the selected language when navigating between pages and sections.
    document.querySelectorAll('[data-index-section]').forEach(link => {
        const section = link.dataset.indexSection;
        link.href = 'index.html?lang=' + lang + '#' + section;
    });

    document.querySelectorAll('[data-misc-page]').forEach(link => {
        link.href = link.dataset.miscPage + '.html?lang=' + lang;
    });

    document.querySelectorAll('[data-language]').forEach(link => {
        const targetLanguage = link.dataset.language;
        const hash = currentPage === 'index.html' ? window.location.hash : '';
        link.href = currentPage + '?lang=' + targetLanguage + hash;
    });

    // Activate Bootstrap scrollspy on the main nav element.
    const mainNav = document.body.querySelector('#mainNav');
    if (mainNav && !contentPage) {
        new bootstrap.ScrollSpy(document.body, {
            target: '#mainNav',
            offset: 74,
        });
    }

    // Collapse the responsive navbar after following a link, but not when opening a dropdown.
    const navbarToggler = document.body.querySelector('.navbar-toggler');
    const responsiveNavItems = document.querySelectorAll(
        '#navbarResponsive .nav-link:not(.dropdown-toggle), #navbarResponsive .dropdown-item'
    );
    responsiveNavItems.forEach(responsiveNavItem => {
        responsiveNavItem.addEventListener('click', () => {
            if (navbarToggler && window.getComputedStyle(navbarToggler).display !== 'none') {
                navbarToggler.click();
            }
        });
    });

    const fetchText = path => fetch(path, { cache: 'no-cache' }).then(response => {
        if (!response.ok) {
            throw new Error('Unable to load ' + path + ': ' + response.status);
        }
        return response.text();
    });

    // Load shared YAML configuration and the page-specific title.
    fetchText(content_dir + config_file)
        .then(text => {
            const yml = jsyaml.load(text);
            Object.keys(yml).forEach(key => {
                const element = document.getElementById(key);
                if (element) {
                    element.innerHTML = yml[key];
                }
            });

            if (contentPage) {
                const pageTitle = yml[contentPage + '-page-title'];
                if (pageTitle) {
                    document.title = pageTitle + ' — Dylan Samuelian';
                }
            }
        })
        .catch(error => console.error(error));

    // Render the Markdown content associated with the current page.
    marked.use({ mangle: false, headerIds: false });
    sectionNames.forEach(name => {
        const target = document.getElementById(name + '-md');
        if (!target) {
            return;
        }

        fetchText(content_dir + name + '.md')
            .then(markdown => {
                target.innerHTML = marked.parse(markdown);
            })
            .then(() => {
                if (window.MathJax && typeof MathJax.typeset === 'function') {
                    MathJax.typeset();
                }
            })
            .catch(error => console.error(error));
    });
});
