import React from "react";

const Navbar = ({ user, onNavigate, onLogout }) => {
    const buttonPublic = [
        { label: "Connexion", key: "connection", onClick: onNavigate },
        { label: "Tournois", key: "tournoispublic", onClick: onNavigate },
        { label: "Résultats", key: "resultats", onClick: onNavigate },
        { label: "Inscriptions", key: "inscriptions", onClick: onNavigate },
    ];

    const buttonNoEquipe = [
        { label: "Tournois", key: "tournoispublic", onClick: onNavigate },
        { label: "Résultats", key: "resultats", onClick: onNavigate },
        { label: "Créer équipe", key: "creezEquipe", onClick: onNavigate },
        { label: "Déconnexion", key: "logout", onClick: onLogout },
    ];

    const buttonUtilisateur = [
        { label: "Tournois", key: "tournois", onClick: onNavigate },
        { label: "Résultats", key: "resultats", onClick: onNavigate },
        { label: "Joueur", key: "joueur", onClick: onNavigate },
        { label: "Historique", key: "historique", onClick: onNavigate },
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
        <div style={{ display: "flex", justifyContent: "space-between", alignItems: "flex-start", width: "100%", padding: "12px" }}>
            <div style={{ display: "flex", justifyContent: "center", gap: "12px", flex: 1 }}>
                {nav.map((btn) => (
                    <button key={btn.key} onClick={() => btn.onClick(btn.key)}>
                        {btn.label}
                    </button>
                ))}
            </div>

            {user && (
                <div style={{ textAlign: "right", lineHeight: "1.5", marginRight: "20px", whiteSpace: "nowrap" }}>
                    <div>Bienvenue {user.nom}</div>
                    {user.equipe && <div>Équipe: {user.equipeNom}</div>}
                    {user.equipe && user.equipeFederation && <div>Fédération: {user.equipeFederation}</div>}
                </div>
            )}
        </div>
    );
};

export default Navbar;