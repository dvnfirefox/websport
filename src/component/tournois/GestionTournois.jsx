import React, { useEffect, useState } from "react";
import ApiService from "../../service/HttpService.jsx";
import ListTournois from "./ListTournois.jsx";

const GestionTournois = ({ user }) => {
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
        loadTournois();
    }, [user.equipe]);

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

    const retirerTournois = async (tournoiId) => {
        try {
            const data = await ApiService.removeEquipeTournois(user.equipe, tournoiId);
            if (data) {
                await loadTournois();
            }
        } catch (e) {
            console.error(e);
        }
    };

    const inscription = async (tournoiId) => {
        try {
            const data = await ApiService.addEquipeTournois(user.equipe, tournoiId);
            if (data) {
                await loadTournois();
            }
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
                </div>
            </div>

            <ListTournois
                equipe={user.equipe}
                tournois={tournois}
                retirerTournois={retirerTournois}
                inscription={inscription}
            />
        </div>
    );
};

const styles = {
    searchContainer: {
        backgroundColor: "#f5f5f5",
        padding: "15px",
        borderRadius: "8px",
        marginBottom: "20px",
    },
    searchRow: {
        display: "flex",
        gap: "10px",
        alignItems: "center",
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
};

export default GestionTournois;