import React, { useState } from "react";
import ApiService from "../../service/HttpService.jsx";

const PublicListRowTournois = ({ tournoi }) => {
    const [showClassement, setShowClassement] = useState(false);
    const [classement, setClassement] = useState({});
    const [loading, setLoading] = useState(false);

    const handleClassementClick = async () => {
        if (!showClassement) {
            // Fetch classement data when expanding
            setLoading(true);
            try {
                const data = await ApiService.getClassement(tournoi.id);
                setClassement(data);
            } catch (e) {
                console.error(e);
            } finally {
                setLoading(false);
            }
        }
        setShowClassement(!showClassement);
    };

    const placesDisponibles = tournoi.equipeMaximum - (tournoi.equipes?.length || 0);

    return (
        <div style={styles.container}>
            <div style={styles.row}>
                <span style={styles.column}><strong>ID: </strong> {tournoi.id}</span>
                <span style={styles.column}><strong>Catégorie: </strong> {tournoi.categorie}</span>
                <span style={styles.column}><strong>Fédération: </strong> {tournoi.federation}</span>
                <span style={styles.column}><strong>Début: </strong> {tournoi.dateDebut}</span>
                <span style={styles.column}><strong>Fin: </strong> {tournoi.dateFin}</span>
                <span style={styles.column}><strong>Places totales: </strong> {tournoi.equipeMaximum}</span>
                <span style={styles.column}><strong>Places disponibles: </strong> {placesDisponibles}</span>
                <span style={styles.column}>
                    <button onClick={handleClassementClick} style={styles.buttonInfo}>
                        {showClassement ? "Masquer Classement" : "Classement"}
                    </button>
                </span>
            </div>

            {showClassement && (
                <div style={styles.classementContainer}>
                    {loading ? (
                        <div>Chargement...</div>
                    ) : (
                        <>
                            <div style={styles.classementHeader}>
                                <span style={styles.classementColumn}><strong>Équipe</strong></span>
                                <span style={styles.classementColumn}><strong>Points</strong></span>
                            </div>
                            {Object.entries(classement).map(([equipeNom, points]) => (
                                <div key={equipeNom} style={styles.classementRow}>
                                    <span style={styles.classementColumn}>{equipeNom}</span>
                                    <span style={styles.classementColumn}>{points}</span>
                                </div>
                            ))}
                        </>
                    )}
                </div>
            )}
        </div>
    );
};

const styles = {
    container: {
        marginBottom: "10px",
    },
    row: {
        display: "flex",
        alignItems: "center",
        gap: "12px",
        padding: "8px",
        borderBottom: "1px solid #ccc",
        flexWrap: "wrap",
    },
    column: {
        flex: "1 1 0",
        minWidth: "120px",
    },
    buttonInfo: {
        padding: "6px 12px",
        backgroundColor: "#17a2b8",
        color: "white",
        border: "none",
        borderRadius: "4px",
        cursor: "pointer",
    },
    classementContainer: {
        backgroundColor: "#000000",
        padding: "15px",
        marginTop: "5px",
        borderRadius: "4px",
        border: "1px solid #dee2e6",
    },
    classementHeader: {
        display: "flex",
        gap: "0",
        padding: "8px 0",
        borderBottom: "2px solid #333",
        backgroundColor: "#000000",
        marginBottom: "5px",
    },
    classementRow: {
        display: "flex",
        gap: "0",
        padding: "8px 0",
        borderBottom: "1px solid #ccc",
    },
    classementColumn: {
        flex: "1 1 0",
        minWidth: "150px",
        padding: "0 12px",
        borderRight: "1px solid #ccc",
    },
};

export default PublicListRowTournois;