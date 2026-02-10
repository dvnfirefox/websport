import React, { useState } from "react";
import ApiService from "../service/HttpService.jsx";

const Logging = ({ UserUpdate }) => {
    const [user, setUser] = useState({ nom: "", equipe: 0 });
    const [password, setPassword] = useState("");
    const [error, setError] = useState("");
    const [loading, setLoading] = useState(false);

    // Méthode pour gérer la soumission du formulaire de connexion
    const handleSubmit = async (event) => {
        event.preventDefault();
        setError("");
        setLoading(true);

        // Validation des champs obligatoires
        if (!user.nom || !password) {
            setError("Veuillez remplir tous les champs");
            setLoading(false);
            return;
        }

        try {
            // Appel au backend pour authentifier l'utilisateur
            const response = await ApiService.login(user.nom, password);

            if (response.connection) {
                // Construction de l'objet utilisateur avec les informations reçues
                const loggedUser = {
                    nom: user.nom,
                    equipe: response.equipe ?? 0,
                    equipeNom: response.equipeNom ?? "",
                    equipeFederation: response.equipeFederation ?? "",
                    equipeCategorie: response.equipeCategorie ?? "",
                };
                setUser(loggedUser);
                UserUpdate(loggedUser); // Met à jour l'état de l'application
            } else {
                setError("Identifiants invalides");
            }
        } catch (err) {
            setError("Erreur serveur. Réessayez plus tard.");
            console.error(err);
        } finally {
            setLoading(false);
        }
    };

    return (
        <form onSubmit={handleSubmit} style={{ display: "flex", flexDirection: "column", gap: "10px", width: "300px" }}>
            <input
                type="text"
                placeholder="Nom"
                value={user.nom}
                onChange={(e) => setUser({ ...user, nom: e.target.value })}
                style={{ padding: "8px" }}
            />
            <input
                type="password"
                placeholder="Mot de passe"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                style={{ padding: "8px" }}
            />
            <button type="submit" disabled={loading} style={{ padding: "10px" }}>
                {loading ? "Connexion..." : "Se connecter"}
            </button>
            {error && <p style={{ color: "red" }}>{error}</p>}
        </form>
    );
};

export default Logging;