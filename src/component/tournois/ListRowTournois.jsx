import React from "react";

const ListRowTournois = ({ equipe, tournoi, retirerTournois, inscription }) => {
    // Calculate available spots
    const placesDisponibles = tournoi.equipeMaximum - (tournoi.equipes?.length || 0);

    // Check if the current team is already participating
    const estInscrit = tournoi.equipes?.some(e => e.id === equipe) || false;

    // Check if we are within one week before dateDebut
    const isWithinOneWeek = () => {
        const today = new Date();
        const dateDebut = new Date(tournoi.dateDebut);
        const oneWeekBeforeDebut = new Date(dateDebut);
        oneWeekBeforeDebut.setDate(dateDebut.getDate() - 7);

        // Hide buttons if today is on or after one week before the tournament
        return today >= oneWeekBeforeDebut;
    };

    const shouldHideButtons = isWithinOneWeek();

    return (
        <div style={styles.row}>
            <span><strong>id: </strong> {tournoi.id}</span>
            <span><strong>categorie: </strong> {tournoi.categorie}</span>
            <span><strong>debut: </strong> {tournoi.dateDebut}</span>
            <span><strong>fin: </strong> {tournoi.dateFin}</span>
            <span><strong>place total: </strong> {tournoi.equipeMaximum}</span>
            <span><strong>place disponible: </strong> {placesDisponibles}</span>

            {!shouldHideButtons && (
                estInscrit ? (
                    <button onClick={retirerTournois} style={styles.button}>
                        se retirer
                    </button>
                ) : (
                    <button onClick={inscription} style={styles.button}>
                        inscription
                    </button>
                )
            )}
        </div>
    )
}

const styles = {
    row: {
        display: "flex",
        alignItems: "center",
        gap: "12px",
        padding: "8px",
        borderBottom: "1px solid #ccc",
    },
    button: {
        marginLeft: "auto",
        cursor: "pointer",
    },
};

export default ListRowTournois;