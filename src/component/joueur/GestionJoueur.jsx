import React, { useEffect, useState } from "react";
import ListJoueur from "./ListJoueur.jsx";
import ApiService from "../../service/HttpService.jsx";

const GestionJoueur = ({ user }) => {
    const [joueurs, setJoueurs] = useState([
        { id: 1, nom: "Jean Dupont", numero: 10 },
        { id: 2, nom: "Marc Tremblay", numero: 7 },
    ]);

    const [nom, setNom] = useState("");
    const [numero, setNumero] = useState("");
    const [error, setError] = useState(""); // error state

    const addJoueur = async () => {
        if (!nom || numero === "") return;

        try {
            const result = await ApiService.postCreezJoueur(nom, numero, user.equipe);

            if (result) {
                const data = await ApiService.postJoueurs(user.equipe);
                setJoueurs(data);

                // Clear input fields
                setNom("");
                setNumero("");
                setError(""); // Clear any previous error
            } else {
                setError("création impossible");
            }
        } catch (e) {
            console.error(e);
            setError("création impossible");
        }
    };

    const deleteJoueur = async (id) => {
        try {
            const result = await ApiService.postDeleteJoueur(id, user.equipe);

            if (result) {
                const data = await ApiService.postJoueurs(user.equipe);
                setJoueurs(data);
            } else {
                setError("suppression impossible");
            }
        } catch (e) {
            console.error(e);
            setError("suppression impossible");
        }
    };

    useEffect(() => {
        const loadJoueurs = async () => {
            try {
                const data = await ApiService.postJoueurs(user.equipe);
                setJoueurs(data);
            } catch (e) {
                console.error(e);
            }
        };
        loadJoueurs();
    }, [user.equipe]);

    return (
        <div style={{ maxWidth: "500px", margin: "20px auto" }}>
            <h2>Liste des joueurs</h2>

            {/* Inline form */}
            <div style={{ display: "flex", alignItems: "center", gap: "8px", marginBottom: "16px" }}>
                <label>
                    nom:
                    <input
                        type="text"
                        value={nom}
                        onChange={(e) => setNom(e.target.value)}
                        style={{ marginLeft: "4px" }}
                    />
                </label>

                <span>|</span>

                <label>
                    numero:
                    <input
                        type="number"
                        value={numero}
                        onChange={(e) => setNumero(e.target.value)}
                        style={{ marginLeft: "4px", width: "60px" }}
                    />
                </label>

                <button onClick={addJoueur} style={{ marginLeft: "8px" }}>
                    Ajouter
                </button>

                {/* Error message next to button */}
                {error && <span style={{ color: "red", marginLeft: "8px" }}>{error}</span>}
            </div>

            <ListJoueur
                joueurs={joueurs}
                deleteJoueur={deleteJoueur}
            />
        </div>
    );
};

export default GestionJoueur;
