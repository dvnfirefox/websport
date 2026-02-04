import React from "react";
import ListRowJoueur from "./ListRowJoueur.jsx";

const ListJoueur = ({ joueurs, deleteJoueur }) => {
    return (
        <div>
            {joueurs.map((joueur) => (
                <ListRowJoueur
                    key={joueur.id}
                    joueur={joueur}
                    onDelete={() => deleteJoueur(joueur.id)}
                />
            ))}
        </div>
    );
};

export default ListJoueur;