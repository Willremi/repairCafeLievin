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

(function () {
    emailjs.init("CkWCL3uOwKfTyRGkP");
})();

document.getElementById("contactForm").addEventListener("submit", function (e) {
    e.preventDefault();

    // HONEYPOT : si rempli → SPAM détecté → on bloque
    if (document.getElementById("website").value !== "") {
        console.warn("Spam détecté (honeypot rempli)");
        return; // On arrête tout
    }

    // Affiche le loader
    document.getElementById("loader").style.display = "block";
    document.getElementById("formStatus").style.opacity = "0";

    const params = {
        nom: document.getElementById("nom").value,
        prenom: document.getElementById("prenom").value,
        email: document.getElementById("email").value,
        phone: document.getElementById("phone").value,
        sujet: document.getElementById("sujet").value,
        message: document.getElementById("message").value
    };

    emailjs.send("service_tonowqq", "template_1zi649q", params)
        .then(function () {

            // Cache le loader
            document.getElementById("loader").style.display = "none";

            // Message succès
            const status = document.getElementById("formStatus");
            status.innerText = "✔ Message envoyé avec succès !";
            status.className = "form-status success";
            status.style.opacity = "1";

            // Reset du formulaire
            document.getElementById("contactForm").reset();

        }, function (error) {

            // Cache le loader
            document.getElementById("loader").style.display = "none";

            // Message erreur
            const status = document.getElementById("formStatus");
            status.innerText = "✖ Erreur lors de l’envoi.";
            status.className = "form-status error";
            status.style.opacity = "1";

            console.error("EmailJS error:", error);
        });
});
