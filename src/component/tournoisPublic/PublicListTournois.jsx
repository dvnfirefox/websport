import React from "react";
import PublicListRowTournois from "./PublicListRowTournois.jsx"

const PublicListTournois = ({ tournois }) => {
    return (
        <div>
            {tournois.map((tournoi) => (
                <PublicListRowTournois
                    key={tournoi.id}
                    tournoi={tournoi}
                />
            ))}
        </div>
    );
};

export default PublicListTournois;