import React, { useState } from "react";
import ApiService from "../service/HttpService.jsx";

const Inscription = () => {
    const [nom, setNom] = useState("");
    const [password, setPassword] = useState("");
    const [password2, setPassword2] = useState("");
    const [error, setError] = useState("");
    const [loading, setLoading] = useState(false);

    const handleSubmit = async (event) => {
        event.preventDefault();
        setError("");
        setLoading(true);

        if (!nom || !password || !password2) {
            setError("Remplir tous les champs");
            setLoading(false);
            return;
        }

        if (password !== password2) {
            setError("Les mots de passe ne sont pas identiques");
            setLoading(false);
            return;
        }

        try {
            const response = await ApiService.postInscription(nom, password);

            if (response.status) {
                setError("Inscription réussie");
            } else {
                setError("Échec de la création");
            }
        } catch (err) {
            setError("Erreur serveur. Réessayez plus tard.");
            console.error(err);
        } finally {
            setLoading(false);
        }
    };

    return (
        <form
            onSubmit={handleSubmit}
            style={{
                display: "flex",
                flexDirection: "column",
                gap: "10px",
                width: "300px"
            }}
        >
            <input
                type="text"
                placeholder="Nom"
                value={nom}
                onChange={(e) => setNom(e.target.value)}
            />

            <input
                type="password"
                placeholder="Mot de passe"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
            />

            <input
                type="password"
                placeholder="Confirmer le mot de passe"
                value={password2}
                onChange={(e) => setPassword2(e.target.value)}
            />

            <button type="submit" disabled={loading}>
                {loading ? "Création..." : "S'inscrire"}
            </button>

            {error && <p style={{ color: "red" }}>{error}</p>}
        </form>
    );
};

export default Inscription;
