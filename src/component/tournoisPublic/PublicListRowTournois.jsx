import React from "react";

const PublicListRowTournois = ({ tournoi }) => {
    const placesDisponibles = tournoi.equipeMaximum - (tournoi.equipes?.length || 0);

    return (
        <div style={styles.row}>
            <span><strong>ID: </strong> {tournoi.id}</span>
            <span><strong>Catégorie: </strong> {tournoi.categorie}</span>
            <span><strong>Fédération: </strong> {tournoi.federation}</span>
            <span><strong>Début: </strong> {tournoi.dateDebut}</span>
            <span><strong>Fin: </strong> {tournoi.dateFin}</span>
            <span><strong>Places totales: </strong> {tournoi.equipeMaximum}</span>
            <span><strong>Places disponibles: </strong> {placesDisponibles}</span>
        </div>
    );
};

const styles = {
    row: {
        display: "flex",
        alignItems: "center",
        gap: "12px",
        padding: "8px",
        borderBottom: "1px solid #ccc",
        flexWrap: "wrap",
    },
};

export default PublicListRowTournois;