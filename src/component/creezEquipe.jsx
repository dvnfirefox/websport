import React, { useState, useEffect } from "react";
import ApiService from "../service/HttpService.jsx";

const CreezEquipe = ({ user, UserUpdate }) => {
    const [nom, setNom] = useState("");
    const [federation, setFederation] = useState("");
    const [categorie, setCategorie] = useState("Moustique");
    const [error, setError] = useState("");
    const [loading, setLoading] = useState(false);

    const categories = ["Moustique", "Atome", "Peewee", "Bantam", "Midget", "Junior"];
    const [federations, setFederations] = useState([]);

    useEffect(() => {
        const loadFederations = async () => {
            try {
                const data = await ApiService.getFederation();
                setFederations(data);
            } catch (e) {
                console.error(e);
                setError("Échec du chargement des fédérations");
            }
        };
        loadFederations();
    }, []);

    const handleSubmit = async (event) => {
        event.preventDefault();
        setError("");
        setLoading(true);

        if (!nom || !federation || !categorie) {
            setError("Veuillez remplir tous les champs");
            setLoading(false);
            return;
        }

        try {
            const response = await ApiService.postCreezEquipe(
                nom,
                federation,
                categorie,
                user.nom
            );

            if (response) {
                const updatedUser = {
                    ...user,
                    equipe: response.equipe ?? 0,
                    equipeNom: response.equipeNom ?? ""
                };

                UserUpdate(updatedUser); // update App state
            } else {
                setError("Échec de la création de l’équipe");
            }
        } catch (err) {
            console.error(err);
            setError("Erreur serveur. Réessayez plus tard.");
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
                placeholder="Nom de l’équipe"
                value={nom}
                onChange={(e) => setNom(e.target.value)}
            />

            <select
                value={federation}
                onChange={(e) => setFederation(e.target.value)}
                required
            >
                <option value="">Sélectionner votre fédération</option>
                {federations.map((fed) => (
                    <option key={fed} value={fed}>
                        {fed}
                    </option>
                ))}
            </select>

            <select
                value={categorie}
                onChange={(e) => setCategorie(e.target.value)}
            >
                {categories.map((cat) => (
                    <option key={cat} value={cat}>
                        {cat}
                    </option>
                ))}
            </select>

            <button type="submit" disabled={loading}>
                {loading ? "Création..." : "Créer l’équipe"}
            </button>

            {error && <p style={{ color: "red" }}>{error}</p>}
        </form>
    );
};

export default CreezEquipe;
