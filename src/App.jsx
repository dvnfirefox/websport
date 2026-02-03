import { useState } from "react";
import Navbar from "./component/NavBar.jsx";
import Logging from "./component/logging.jsx";
import CreezUtilisateur from "./component/CreezUtilisateur.jsx";

function App() {
  const [user, setUser] = useState(null);
  const [navBar, setNavBar] = useState("connection");

  const navBarClick = (page) => setNavBar(page);
  const onLogout = () => setUser(null);
  const logingClick = (userData) => {
    setUser(userData);
    setNavBar("tournois");
  }

  let content;
  switch (navBar) {
    case "connection":
      content = <Logging logingClick={logingClick} />;
      break;
    case "tournois":
      content = <h2>Tournois</h2>;
      break;
    case "resultats":
      content = <h2>Résultats</h2>;
      break;
    case "inscriptions":
      content = <CreezUtilisateur/>;
      break;
    case "joueur":
      content = <h2>Joueur</h2>;
      break;
    case "historique":
      content = <h2>Historique</h2>;
      break;
    case "classement":
      content = <h2>Classement</h2>;
      break;
    default:
      content = <h2>Page non trouvée</h2>;
  }

  return (
      <div style={{ width: "100vw", height: "100vh", display: "flex", flexDirection: "column", alignItems: "center" }}>
        <Navbar user={user} onNavigate={navBarClick} onLogout={onLogout} />
        <div>{content}</div>
      </div>
  );
}

export default App;
