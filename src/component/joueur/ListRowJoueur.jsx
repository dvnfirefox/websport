import React from "react";

const ListRowJoueur = ({ joueur, onDelete }) => {
    return (
        <div style={styles.row}>
            <span><strong>Nom: </strong> {joueur.nom}</span>
            <span><strong>Numero: </strong> {joueur.numero}</span>
            <button onClick={onDelete} style={styles.button}>
                Supprimer
            </button>
        </div>
    )
}

const styles = {
    row: {
        display: "flex",
        alignItems: "center",
        gap: "12px",
        padding: "8px",
        borderBottom: "1px solid #ccc",
    },
    button: {
        marginLeft: "auto",
        cursor: "pointer",
    },
};

export default ListRowJoueur;