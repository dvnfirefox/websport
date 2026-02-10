import React from "react";
import ListRowTournois from "./ListRowTournois.jsx";

//une classe intermediaire quie permet de simplifier la lecture de la liste de tournois et lafficchage de celui-ci
const ListTournois = ({ equipe, tournois, retirerTournois, inscription }) => {
    return (
        <div>
            {tournois.map((tournoi) => (
                <ListRowTournois
                    key={tournoi.id}
                    equipe={equipe}
                    tournoi={tournoi}
                    retirerTournois={retirerTournois}
                    inscription={inscription}
                />
            ))}
        </div>
    );
};

export default ListTournois;