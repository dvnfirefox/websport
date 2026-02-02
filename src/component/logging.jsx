import React, { useState } from "react";
import ApiService from "../service/HttpService.jsx";

const Logging = ({ logingClick }) => {
    const [user, setUser] = useState({ nom: "", equipe: 0 });
    const [password, setPassword] = useState("");
    const [error, setError] = useState("");
    const [loading, setLoading] = useState(false);

    const handleSubmit = async (event) => {
        event.preventDefault();
        setError("");
        setLoading(true);

        if (!user.nom || !password) {
            setError("Please fill in all fields");
            setLoading(false);
            return;
        }

        try {
            const response = await ApiService.login(user.nom, password);
            if (response.connection) {
                // build user object
                const loggedUser = {
                    nom: user.nom,
                    equipe: response.equipe ?? 0,
                    equipeNom: response.equipeNom ?? "",
                };
                setUser(loggedUser);
                logingClick(loggedUser); // send to App
            } else {
                setError("Invalid credentials");
            }
        } catch (err) {
            setError("Server error. Try again later.");
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
                placeholder="Password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                style={{ padding: "8px" }}
            />
            <button type="submit" disabled={loading} style={{ padding: "10px" }}>
                {loading ? "Logging in..." : "Login"}
            </button>
            {error && <p style={{ color: "red" }}>{error}</p>}
        </form>
    );
};

export default Logging;