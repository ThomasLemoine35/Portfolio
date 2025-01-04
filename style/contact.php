<?php
if ($_SERVER["REQUEST_METHOD"] == "POST" ){
    $nom = $_POST['nom'];
    $email = $_POST['email'];
    $objet = $_POST['objet'];
    $message = $_POST['message'];

    $destinataire = "thomaslemoine215@gmail.com";
    $sujet = "Nouveau message de $nom";
    $contenu = "Nom: $nom\n";
    $contenu .= "Email: $email\n\n";
    $contenu .= "Objet: $objet\n\n\n";
    $contenu .= "Message: \n$message";

    mail($destinataire, $sujet, $contenu);
    echo "Votre message a été envoyé avec succès.";
}
?>