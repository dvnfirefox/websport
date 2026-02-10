import React, { useState } from "react";
import ApiService from "../../service/HttpService.jsx";

const ListRowTournois = ({ tournoi, equipe, retirerTournois, inscription }) => {
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

    // Safety check AFTER hooks - return null if tournoi is undefined
    if (!tournoi) {
        return null;
    }

    const isInscrit = tournoi.equipes?.some((e) => e.id === equipe);
    const isFull = tournoi.equipes?.length >= tournoi.equipeMaximum;

    // Check if inscriptions are closed (1 week before tournament start)
    const today = new Date();
    const dateDebut = new Date(tournoi.dateDebut);
    const oneWeekBefore = new Date(dateDebut);
    oneWeekBefore.setDate(oneWeekBefore.getDate() - 7);
    const inscriptionsClosed = today >= oneWeekBefore;

    return (
        <div style={styles.container}>
            <div style={styles.row}>
                <span style={styles.column}>
                    <strong>ID: </strong>
                    {tournoi.id}
                </span>
                <span style={styles.column}>
                    <strong>Catégorie: </strong>
                    {tournoi.categorie}
                </span>
                <span style={styles.column}>
                    <strong>Date Début: </strong>
                    {tournoi.dateDebut}
                </span>
                <span style={styles.column}>
                    <strong>Date Fin: </strong>
                    {tournoi.dateFin}
                </span>
                <span style={styles.column}>
                    <strong>Équipes: </strong>
                    {tournoi.equipes?.length || 0}/{tournoi.equipeMaximum}
                </span>
                <span style={styles.column}>
                    {isInscrit ? (
                        <button
                            onClick={() => retirerTournois(tournoi.id)}
                            disabled={inscriptionsClosed}
                            style={inscriptionsClosed ? styles.buttonDisabled : styles.buttonDanger}
                        >
                            {inscriptionsClosed ? "Inscriptions fermées" : "Se désinscrire"}
                        </button>
                    ) : (
                        <button
                            onClick={() => inscription(tournoi.id)}
                            disabled={isFull || inscriptionsClosed}
                            style={(isFull || inscriptionsClosed) ? styles.buttonDisabled : styles.buttonSuccess}
                        >
                            {inscriptionsClosed ? "Inscriptions fermées" : (isFull ? "Complet" : "S'inscrire")}
                        </button>
                    )}
                </span>
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
    },
    column: {
        flex: "1 1 0",
        minWidth: "120px",
    },
    buttonSuccess: {
        padding: "6px 12px",
        backgroundColor: "#28a745",
        color: "white",
        border: "none",
        borderRadius: "4px",
        cursor: "pointer",
    },
    buttonDanger: {
        padding: "6px 12px",
        backgroundColor: "#dc3545",
        color: "white",
        border: "none",
        borderRadius: "4px",
        cursor: "pointer",
    },
    buttonDisabled: {
        padding: "6px 12px",
        backgroundColor: "#6c757d",
        color: "white",
        border: "none",
        borderRadius: "4px",
        cursor: "not-allowed",
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

export default ListRowTournois;