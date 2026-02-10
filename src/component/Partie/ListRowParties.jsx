import React from "react";

const ListRowParties = ({ partie }) => {
    return (
        <div style={styles.row}>
            <span style={styles.column}>{partie.id}</span>
            <span style={styles.column}>{partie.date}</span>
            <span style={styles.column}>{partie.equipeLocal?.nom || 'N/A'}</span>
            <span style={styles.column}>{partie.equipeVisiteur?.nom || 'N/A'}</span>
            <span style={styles.column}>{partie.pointLocal} - {partie.pointVisiteur}</span>
        </div>
    );
};

// Separate header component you'll need to add
export const ListHeaderParties = () => {
    return (
        <div style={styles.header}>
            <span style={styles.column}><strong>ID</strong></span>
            <span style={styles.column}><strong>Date</strong></span>
            <span style={styles.column}><strong>Local</strong></span>
            <span style={styles.column}><strong>Visiteur</strong></span>
            <span style={styles.column}><strong>Pointage</strong></span>
        </div>
    );
};

const styles = {
    row: {
        display: "flex",
        alignItems: "center",
        gap: "12px",
        padding: "8px",
        borderBottom: "1px solid #ccc",
    },
    header: {
        display: "flex",
        alignItems: "center",
        gap: "12px",
        padding: "8px",
        borderBottom: "2px solid #333",
        backgroundColor: "#000000",
    },
    column: {
        flex: "1 1 0",
        minWidth: "150px",
    },
};

export default ListRowParties;