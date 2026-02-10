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
    static async get(path, params = {}) {
        try {
            // Build query string from params object
            const queryString = new URLSearchParams(params).toString();
            const url = BASE_URL + path + (queryString ? `?${queryString}` : '');

            const res = await fetch(url, {
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

    static async login(nom, password) {
        return await this.post("/session/connection", { nom, password });
    }

    static async getFederation(){
        return await this.get("/federation/list");
    }
    static async postCreezEquipe(nom,federation, categorie, utilisateur) {
        return await this.post("/equipe/creez", {nom, federation, categorie, utilisateur})
    }

    static async postInscription(nom, password) {
        return await this.post("/utilisateur/creez", {nom, password});
    }
    static async postJoueurs(equipe){
        return await this.post("/joueur/list", {id: equipe});
    }
    static async postCreezJoueur( nom, numero, equipe ) {
        return await this.post("/joueur/creez", {nom, numero, equipeid: equipe});
    }
    static async postDeleteJoueur(id, equipeid){
        return await this.post("/joueur/supprimer", {id, equipeid});
    }
    static async getTournois(date){
        return await this.get("/tournois/recherche", {
            date: date,
            type: "debut.after"
        });
    }
    static async removeEquipeTournois(equipe, tournois){
        return await this.post("/tournois/removeequipe", {equipe, tournois});
    }
    static async addEquipeTournois(equipe, tournois){
        return await this.post("/tournois/addequipe", {equipe, tournois});
    }

    // Add this new method for date-based tournament search
    static async rechercheTournois(date, type){
        return await this.get("/tournois/recherche", {
            date: date,
            type: type
        });
    }
    static async getTournoisLive(){
        return await this.get("/tournois/live");
    }
    static async getTournoisFuture(){
        return await this.get("/tournois/future");
    }
    static async getParties(date, type, equipe) {
        return await this.get("/partie/recherchedate", {date, type, equipe});
    }
    static async getClassement(tournoiId){
        return await this.get("/tournois/classement", {tournoiId: tournoiId});
    }
}