import React from "react";
import ListRowParties, { ListHeaderParties } from "./ListRowParties.jsx"

const ListParties = ({ parties }) => {
    return (
        <div>
            <ListHeaderParties />
            {parties.map((partie) => (
                <ListRowParties
                    key={partie.id}
                    partie={partie}
                />
            ))}
        </div>
    );
};

export default ListParties;