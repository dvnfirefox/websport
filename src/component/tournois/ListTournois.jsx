import React from "react";
import ListRowTournois from "./ListRowTournois.jsx";

const ListTournois = ({ equipe, tournois, retirerTournois, inscription }) => {
    return (
        <div>
            {tournois.map((tournoi) => (
                <ListRowTournois
                    key={tournoi.id}
                    equipe={equipe}
                    tournoi={tournoi}
                    retirerTournois={() => retirerTournois(tournoi.id)}
                    inscription={() => inscription(tournoi.id)}
                />
            ))}
        </div>
    );
};

export default ListTournois;