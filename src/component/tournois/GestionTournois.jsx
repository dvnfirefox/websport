import React, { useEffect, useState } from "react";
import ApiService from "../../service/HttpService.jsx";
import ListTournois from "./ListTournois.jsx";

const GestionTournois = ({ user }) => {
    const [tournois, setTournois] = useState([]);
    const [dateSearchType, setDateSearchType] = useState("fin.after");
    const [searchDate, setSearchDate] = useState("");

    // Méthode pour aller chercher les tournois dans la base de données à partir du backend
    const loadTournois = async () => {
        try {
            const today = new Date().toISOString().split('T')[0];
            const data = await ApiService.getTournois(today);

            // Filter tournaments by user's federation AND category
            const filteredData = data.filter(tournoi =>
                tournoi.federation === user.equipeFederation &&
                tournoi.categorie === user.equipeCategorie
            );

            setTournois(filteredData);
        } catch (e) {
            console.error(e);
        }
    };

    // Première méthode utilisée à l'ouverture de la page pour initialiser la liste de tournois
    useEffect(() => {
        loadTournoisEnCours();
    }, [user.equipe]);

    // Méthode pour faire les recherches de tournois selon les critères demandés
    const handleSearch = async () => {
        try {
            if (searchDate) {
                const data = await ApiService.rechercheTournois(searchDate, dateSearchType);

                // Filter search results by user's federation AND category
                const filteredData = data.filter(tournoi =>
                    tournoi.federation === user.equipeFederation &&
                    tournoi.categorie === user.equipeCategorie
                );

                setTournois(filteredData);
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

            // Filter by user's federation AND category
            const filteredData = data.filter(tournoi =>
                tournoi.federation === user.equipeFederation &&
                tournoi.categorie === user.equipeCategorie
            );

            setTournois(filteredData);
        } catch (e) {
            console.error(e);
        }
    };

    const loadTournoisAVenir = async () => {
        try {
            const data = await ApiService.getTournoisFuture();

            // Filter by user's federation AND category
            const filteredData = data.filter(tournoi =>
                tournoi.federation === user.equipeFederation &&
                tournoi.categorie === user.equipeCategorie
            );

            setTournois(filteredData);
        } catch (e) {
            console.error(e);
        }
    };

    // Permet au bouton se désinscrire de désinscrire l'équipe d'un tournois
    const retirerTournois = async (tournoiId) => {
        try {
            const data = await ApiService.removeEquipeTournois(user.equipe, tournoiId);
            if (data) {
                await loadTournoisEnCours();
            }
        } catch (e) {
            console.error(e);
        }
    };

    // Permet au bouton s'inscrire d'inscrire l'équipe à un tournois
    const inscription = async (tournoiId) => {
        try {
            const data = await ApiService.addEquipeTournois(user.equipe, tournoiId);
            if (data) {
                await loadTournoisEnCours();
            }
        } catch (e) {
            console.error(e);
        }
    };

    return (
        <div style={{ maxWidth: "800px", margin: "20px auto" }}>
            <h2>Liste des tournois</h2>
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

export default GestionTournois;