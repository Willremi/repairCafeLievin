const burger = document.getElementById("burger");
const menu = document.getElementById("menu");
const backToTop = document.getElementById("backToTop");

// Fonction pour fermer tous les sous-menus
function closeAllSubmenus() {
    document.querySelectorAll(".submenu").forEach(sub => {
        sub.classList.remove("show-submenu");
    });
}

// Ouvrir / fermer menu mobile
if (burger && menu) {
    burger.addEventListener("click", () => {
        menu.classList.toggle("show");

        // Si on ferme le menu → fermer les sous-menus
        if (!menu.classList.contains("show")) {
            closeAllSubmenus();
        }
    });
}

// Fermer le menu mobile quand on clique sur un lien (SAUF les parents de sous-menu)
if (menu) {
    document.querySelectorAll("#menu a").forEach(link => {
        link.addEventListener("click", (e) => {

            // Si c'est un lien parent de sous-menu → NE PAS fermer le menu
            if (link.parentElement.classList.contains("has-submenu")) {
                return;
            }

            // Sinon → fermer le menu mobile
            if (window.innerWidth <= 768) {
                menu.classList.remove("show");
                closeAllSubmenus();
            }
        });
    });
}

// --- SOUS-MENU MOBILE ---
document.querySelectorAll(".has-submenu > a").forEach(parentLink => {
    parentLink.addEventListener("click", (e) => {
        if (window.innerWidth <= 768) {
            e.preventDefault();

            const submenu = parentLink.nextElementSibling;

            // Fermer les autres sous-menus
            document.querySelectorAll(".submenu").forEach(sub => {
                if (sub !== submenu) sub.classList.remove("show-submenu");
            });

            submenu.classList.toggle("show-submenu");
        }
    });
});

// Bouton retour haut
if (backToTop) {
    window.addEventListener("scroll", () => {
        backToTop.style.display = window.scrollY > 300 ? "block" : "none";
    });

    backToTop.addEventListener("click", () => {
        window.scrollTo({ top: 0, behavior: "smooth" });
    });
}

// Header qui change de couleur
window.addEventListener("scroll", () => {
    const header = document.querySelector("header");
    if (header) {
        header.classList.toggle("scrolled", window.scrollY > 50);
    }
});
