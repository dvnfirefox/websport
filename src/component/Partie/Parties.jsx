import React, { useEffect, useState } from "react";
import ApiService from "../../service/HttpService.jsx";
import ListParties from "./ListParties.jsx"

const Parties = ({ user }) => {
    const [parties, setParties] = useState([]);
    const [dateSearchType, setDateSearchType] = useState("apres");
    const [searchDate, setSearchDate] = useState("");

    const sortPartiesByDate = (partiesArray) => {
        return partiesArray.sort((a, b) => new Date(a.date) - new Date(b.date));
    };

    const loadParties = async () => {
        try {
            const equipeId = user?.equipe || 0;
            const today = new Date().toISOString().split('T')[0];
            const data = await ApiService.getParties(today, "apres", equipeId);
            setParties(sortPartiesByDate(data));
        } catch (e) {
            console.error(e);
        }
    };

    useEffect(() => {
        loadParties();
    }, []);

    const handleSearch = async () => {
        try {
            const equipeId = user?.equipe || 0;
            if (searchDate) {
                const data = await ApiService.getParties(searchDate, dateSearchType, equipeId);
                setParties(sortPartiesByDate(data));
            } else {
                await loadParties();
            }
        } catch (e) {
            console.error(e);
        }
    };

    const resetSearch = () => {
        setSearchDate("");
        loadParties();
    };

    const loadPartiesPassees = async () => {
        try {
            const equipeId = user?.equipe || 0;
            const today = new Date().toISOString().split('T')[0];
            const data = await ApiService.getParties(today, "avant", equipeId);
            setParties(sortPartiesByDate(data));
        } catch (e) {
            console.error(e);
        }
    };

    const loadPartiesAVenir = async () => {
        try {
            const equipeId = user?.equipe || 0;
            const today = new Date().toISOString().split('T')[0];
            const data = await ApiService.getParties(today, "apres", equipeId);
            setParties(sortPartiesByDate(data));
        } catch (e) {
            console.error(e);
        }
    };

    return (
        <div style={{ maxWidth: "800px", margin: "20px auto" }}>
            <h2>Liste des parties</h2>

            {/* Search Bar */}
            <div style={styles.searchContainer}>
                <div style={styles.searchRow}>
                    <select
                        value={dateSearchType}
                        onChange={(e) => setDateSearchType(e.target.value)}
                        style={styles.select}
                    >
                        <option value="date">Date exacte</option>
                        <option value="apres">Après</option>
                        <option value="avant">Avant</option>
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
                    <button onClick={loadPartiesPassees} style={styles.buttonSuccess}>
                        Parties passées
                    </button>
                    <button onClick={loadPartiesAVenir} style={styles.buttonInfo}>
                        Parties à venir
                    </button>
                </div>
            </div>

            <ListParties parties={parties} />
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

export default Parties;