import React, { useEffect, useState } from "react";
import ApiService from "../../service/HttpService.jsx";
import PublicListTournois from "./PublicListTournois.jsx"

const PublicTournois = () => {
    const [tournois, setTournois] = useState([]);
    const [dateSearchType, setDateSearchType] = useState("fin.after");
    const [searchDate, setSearchDate] = useState("");

    const loadTournois = async () => {
        try {
            const today = new Date().toISOString().split('T')[0];
            const data = await ApiService.getTournois(today);
            setTournois(data);
        } catch (e) {
            console.error(e);
        }
    };

    useEffect(() => {
        loadTournoisEnCours()
    }, []);

    const handleSearch = async () => {
        try {
            if (searchDate) {
                const data = await ApiService.rechercheTournois(searchDate, dateSearchType);
                setTournois(data);
            } else {
                await loadTournois();
            }
        } catch (e) {
            console.error(e);
        }
    };

    const resetSearch = () => {
        setSearchDate("");
        loadTournois();
    };

    const loadTournoisEnCours = async () => {
        try {
            const data = await ApiService.getTournoisLive();
            setTournois(data);
        } catch (e) {
            console.error(e);
        }
    };

    const loadTournoisAVenir = async () => {
        try {
            const data = await ApiService.getTournoisFuture();
            setTournois(data);
        } catch (e) {
            console.error(e);
        }
    };

    return (
        <div style={{ maxWidth: "800px", margin: "20px auto" }}>
            <h2>Liste des tournois</h2>

            {/* Search Bar */}
            <div style={styles.searchContainer}>
                <div style={styles.searchRow}>
                    <select
                        value={dateSearchType}
                        onChange={(e) => setDateSearchType(e.target.value)}
                        style={styles.select}
                    >
                        <option value="fin.after">Fin après</option>
                        <option value="fin.before">Fin avant</option>
                        <option value="debut.after">Début après</option>
                        <option value="debut.before">Début avant</option>
                    </select>
                    <input
                        type="date"
                        value={searchDate}
                        onChange={(e) => setSearchDate(e.target.value)}
                        style={styles.input}
                    />
                    <button onClick={handleSearch} style={styles.button}>
                        Rechercher
                    </button>
                    <button onClick={resetSearch} style={styles.buttonSecondary}>
                        Réinitialiser
                    </button>
                    <button onClick={loadTournoisEnCours} style={styles.buttonSuccess}>
                        Tournois en cours
                    </button>
                    <button onClick={loadTournoisAVenir} style={styles.buttonInfo}>
                        Tournois à venir
                    </button>
                </div>
            </div>

            <PublicListTournois tournois={tournois} />
        </div>
    );
};

const styles = {
    searchContainer: {
        backgroundColor: "#000000",
        padding: "15px",
        borderRadius: "8px",
        marginBottom: "20px",
    },
    searchRow: {
        display: "flex",
        gap: "10px",
        alignItems: "center",
        flexWrap: "wrap",
    },
    select: {
        padding: "8px",
        borderRadius: "4px",
        border: "1px solid #ccc",
        minWidth: "150px",
    },
    input: {
        padding: "8px",
        borderRadius: "4px",
        border: "1px solid #ccc",
        flex: 1,
        minWidth: "150px",
    },
    button: {
        padding: "8px 16px",
        backgroundColor: "#007bff",
        color: "white",
        border: "none",
        borderRadius: "4px",
        cursor: "pointer",
    },
    buttonSecondary: {
        padding: "8px 16px",
        backgroundColor: "#6c757d",
        color: "white",
        border: "none",
        borderRadius: "4px",
        cursor: "pointer",
    },
    buttonSuccess: {
        padding: "8px 16px",
        backgroundColor: "#28a745",
        color: "white",
        border: "none",
        borderRadius: "4px",
        cursor: "pointer",
    },
    buttonInfo: {
        padding: "8px 16px",
        backgroundColor: "#17a2b8",
        color: "white",
        border: "none",
        borderRadius: "4px",
        cursor: "pointer",
    },
};

export default PublicTournois;