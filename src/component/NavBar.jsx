import React from "react";

const Navbar = ({ user, onNavigate, onLogout }) => {
    const buttonPublic = [
        { label: "Connexion", key: "connection", onClick: onNavigate },
        { label: "Tournois", key: "tournois", onClick: onNavigate },
        { label: "Résultats", key: "resultats", onClick: onNavigate },
        { label: "Inscriptions", key: "inscriptions", onClick: onNavigate },
    ];

    const buttonNoEquipe = [
        { label: "Tournois", key: "tournois", onClick: onNavigate },
        { label: "Résultats", key: "resultats", onClick: onNavigate },
        { label: "Créer équipe", key: "creezEquipe", onClick: onNavigate },
        { label: "Déconnexion", key: "logout", onClick: onLogout },
    ];

    const buttonUtilisateur = [
        { label: "Tournois", key: "tournois", onClick: onNavigate },
        { label: "Résultats", key: "resultats", onClick: onNavigate },
        { label: "Joueur", key: "joueur", onClick: onNavigate },
        { label: "Historique", key: "historique", onClick: onNavigate },
        { label: "Classement", key: "classement", onClick: onNavigate },
        { label: "Déconnexion", key: "logout", onClick: onLogout },
    ];

    let nav = [];

    if (!user) {
        nav = buttonPublic;
    } else if (user && !user.equipe) {
        nav = buttonNoEquipe;
    } else if (user && user.equipe) {
        nav = buttonUtilisateur;
    }

    return (
        <div style={{ display: "flex", justifyContent: "center", gap: "12px", width: "100%" }}>
            {nav.map((btn) => (
                <button key={btn.key} onClick={() => btn.onClick(btn.key)}>
                    {btn.label}
                </button>
            ))}

            {user && (
                <span style={{ marginLeft: "20px" }}>
                    Bienvenue {user.nom}
                    {user.equipe && ` (Équipe: ${user.equipeNom})`}
                </span>
            )}
        </div>
    );
};

export default Navbar;
