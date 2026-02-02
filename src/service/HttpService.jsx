const BASE_URL = "http://localhost:8080";

export default class ApiService {
    // Generic POST request
    static async post(path, body) {
        try {
            const res = await fetch(BASE_URL + path, {
                method: "POST",
                headers: {
                    "Content-Type": "application/json",
                },
                credentials: "include", // needed for session cookies
                body: JSON.stringify(body),
            });

            const text = await res.text(); // backend returns string
            return JSON.parse(text);       // parse JSON
        } catch (err) {
            console.error("API POST ERROR:", err);
            throw err; // rethrow to handle in component
        }
    }

    // Generic GET request
    static async get(path) {
        try {
            const res = await fetch(BASE_URL + path, {
                method: "GET",
                credentials: "include",
            });
            const text = await res.text();
            return JSON.parse(text);
        } catch (err) {
            console.error("API GET ERROR:", err);
            throw err;
        }
    }

    // Example: login method
    static async login(nom, password) {
        return await this.post("/session/connection", { nom, password });
    }

    static async getFederation(){
        return await this.get("/federation/list");
    }
    static async postCreezEquipe(nom,federation, categorie, utilisateur) {
        return await this.post("/equipe/creez", {nom, federation, categorie, utilisateur})
    }}