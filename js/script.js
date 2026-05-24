const burger = document.getElementById("burger");
const menu = document.getElementById("menu");
const backToTop = document.getElementById("backToTop");

// Ouvrir / fermer menu mobile
if (burger && menu) {
    burger.addEventListener("click", () => {
        menu.classList.toggle("show");
    });
}

// Fermer le menu mobile quand on clique sur un lien
if (menu) {
    document.querySelectorAll("#menu a").forEach(link => {
        link.addEventListener("click", () => {
            if (window.innerWidth <= 768) {
                menu.classList.remove("show");
            }
        });
    });
}

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
