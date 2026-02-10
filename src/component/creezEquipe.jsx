import React, { useState, useEffect } from "react";
import ApiService from "../service/HttpService.jsx";

const CreezEquipe = ({ user, equipeUpdate }) => {
    const [nom, setNom] = useState("");
    const [federation, setFederation] = useState("");
    const [categorie, setCategorie] = useState("Moustique");
    const [error, setError] = useState("");
    const [loading, setLoading] = useState(false);

    const categories = ["Moustique", "Atome", "Peewee", "Bantam", "Midget", "Junior"];
    const [federations, setFederations] = useState([]);

    // Méthode utilisée à l'ouverture de la page pour charger les fédérations disponibles
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

    // Méthode pour gérer la soumission du formulaire de création d'équipe
    const handleSubmit = async (event) => {
        event.preventDefault();
        setError("");
        setLoading(true);

        // Validation des champs obligatoires
        if (!nom || !federation || !categorie) {
            setError("Veuillez remplir tous les champs");
            setLoading(false);
            return;
        }

        try {
            // Appel au backend pour créer l'équipe
            const response = await ApiService.postCreezEquipe(
                nom,
                federation,
                categorie,
                user.nom
            );

            // Met à jour les informations de l'utilisateur si la création a réussi
            if (response.resultat) {
                const updatedUser = {
                    ...user,
                    equipe: response.equipe ?? 0,
                    equipeNom: response.equipeNom ?? "",
                    equipeFederation: response.equipeFederation ?? "",
                    equipeCategorie: response.equipeCategorie ?? "",
                };

                equipeUpdate(updatedUser); // Met à jour l'état de l'application
            } else {
                setError("Échec de la création de l'équipe");
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
                placeholder="Nom de l'équipe"
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
                {loading ? "Création..." : "Créer l'équipe"}
            </button>

            {error && <p style={{ color: "red" }}>{error}</p>}
        </form>
    );
};

export default CreezEquipe;