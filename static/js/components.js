(() => {
    const miscellaneousPages = new Set(['notes', 'music']);

    const activeClass = condition => condition ? ' active' : '';
    const currentPageAttribute = condition => condition ? ' aria-current="page"' : '';

    const navigationTemplate = activePage => {
        const miscellaneousIsActive = miscellaneousPages.has(activePage);

        return `
            <nav class="header navbar navbar-expand-lg navbar-light fixed-top shadow-sm" id="mainNav">
                <div class="container px-5">
                    <a id="page-top-title" class="navbar-brand fw-bold" href="index.html?lang=fr#page-top"
                        data-index-section="page-top"></a>
                    <button class="navbar-toggler" type="button" data-bs-toggle="collapse"
                        data-bs-target="#navbarResponsive" aria-controls="navbarResponsive" aria-expanded="false"
                        aria-label="Toggle navigation">
                        MENU
                        <i class="bi-list"></i>
                    </button>
                    <div class="collapse navbar-collapse" id="navbarResponsive">
                        <ul class="navbar-nav ms-auto me-4 my-3 my-lg-0">
                            <li class="nav-item">
                                <a class="nav-link me-lg-3" href="index.html?lang=fr#page-top"
                                    data-index-section="page-top">HOME</a>
                            </li>
                            <li class="nav-item">
                                <a class="nav-link me-lg-3" href="index.html?lang=fr#publications"
                                    data-index-section="publications">PUBLICATIONS</a>
                            </li>
                            <li class="nav-item">
                                <a class="nav-link me-lg-3" href="index.html?lang=fr#awards"
                                    data-index-section="awards">AWARDS</a>
                            </li>
                            <li class="nav-item dropdown">
                                <a class="nav-link dropdown-toggle${activeClass(miscellaneousIsActive)}" href="#"
                                    id="miscellaneousDropdown" role="button" data-bs-toggle="dropdown"
                                    aria-expanded="false">
                                    <span id="miscellaneous-label">DIVERS</span>
                                </a>
                                <ul class="dropdown-menu" aria-labelledby="miscellaneousDropdown">
                                    <li>
                                        <a class="dropdown-item${activeClass(activePage === 'notes')}"
                                            href="notes.html?lang=fr" data-misc-page="notes"${currentPageAttribute(activePage === 'notes')}>
                                            Notes &amp; PDFs
                                        </a>
                                    </li>
                                    <li>
                                        <a class="dropdown-item${activeClass(activePage === 'music')}"
                                            href="music.html?lang=fr" data-misc-page="music"${currentPageAttribute(activePage === 'music')}>
                                            Music &amp; Dance
                                        </a>
                                    </li>
                                </ul>
                            </li>
                            <li class="nav-item dropdown">
                                <a class="nav-link dropdown-toggle" href="#" id="languageDropdown" role="button"
                                    data-bs-toggle="dropdown" aria-expanded="false">
                                    <span id="languages-label">LANGUES</span>
                                </a>
                                <ul class="dropdown-menu" aria-labelledby="languageDropdown">
                                    <li><a class="dropdown-item" href="?lang=en" data-language="en">English</a></li>
                                    <li><a class="dropdown-item" href="?lang=fr" data-language="fr">Français</a></li>
                                </ul>
                            </li>
                        </ul>
                    </div>
                </div>
            </nav>`;
    };

    const footerTemplate = () => `
        <footer class="bg-bottom text-center py-5">
            <div class="container px-5">
                <div class="text-white-50 small">
                    <div class="footer-links mb-2">
                        <a href="https://www.linkedin.com/in/dylan-samuelian/" target="_blank"
                            rel="noopener noreferrer">LinkedIn</a>
                        <span aria-hidden="true">·</span>
                        <a href="https://math.stackexchange.com/users/272494/desura" target="_blank"
                            rel="noopener noreferrer">Math StackExchange</a>
                    </div>
                    <a id="license-link"
                        href="https://github.com/dylan-sam/dylan-sam.github.io/blob/main/LICENSE">License</a>
                </div>
            </div>
        </footer>`;

    const render = ({ activePage = null } = {}) => {
        const navigationHost = document.querySelector('[data-site-navigation]');
        const footerHost = document.querySelector('[data-site-footer]');

        if (navigationHost) {
            navigationHost.replaceWith(document.createRange().createContextualFragment(navigationTemplate(activePage)));
        }

        if (footerHost) {
            footerHost.replaceWith(document.createRange().createContextualFragment(footerTemplate()));
        }
    };

    window.SiteComponents = Object.freeze({ render });
})();
