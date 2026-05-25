<?php

if ($_SERVER["REQUEST_METHOD"] !== "POST") {
    header("Location: ../pages/contact.html");
    exit;
}

function clean($data) {
    return htmlspecialchars(trim($data));
}

$nom     = clean($_POST["nom"] ?? "");
$prenom  = clean($_POST["prenom"] ?? "");
$email   = clean($_POST["email"] ?? "");
$phone   = clean($_POST["phone"] ?? "");
$sujet   = clean($_POST["sujet"] ?? "");
$message = clean($_POST["message"] ?? "");

if (empty($nom) || empty($prenom) || empty($email) || empty($sujet) || empty($message)) {
    die("Erreur : tous les champs obligatoires doivent être remplis.");
}

if (!filter_var($email, FILTER_VALIDATE_EMAIL)) {
    die("Erreur : adresse email invalide.");
}

$destinataire = "willremi@live.fr";
$subject = "Nouveau message depuis le formulaire : $sujet";

$contenu = "
Nom : $nom
Prénom : $prenom
Email : $email
Téléphone : $phone

Message :
$message
";

$headers  = "From: $email\r\n";
$headers .= "Reply-To: $email\r\n";
$headers .= "Content-Type: text/plain; charset=UTF-8\r\n";

if (mail($destinataire, $subject, $contenu, $headers)) {
    echo "<h2>Merci !</h2><p>Votre message a bien été envoyé.</p>";
} else {
    echo "<h2>Erreur</h2><p>L’envoi du message a échoué (fonction mail non disponible ?).</p>";
}
?>
