import { useState } from "react";
import Navbar from "./component/NavBar.jsx";
import Logging from "./component/logging.jsx";
import CreezUtilisateur from "./component/CreezUtilisateur.jsx";
import CreezEquipe from "./component/creezEquipe.jsx";
import GestionJoueur from "./component/joueur/GestionJoueur.jsx";
import GestionTournois from "./component/tournois/GestionTournois.jsx";
import PublicTournois from "./component/tournoisPublic/PublicTournois.jsx"
import parties from "./component/Partie/Parties.jsx"
import Parties from "./component/Partie/Parties.jsx";

function App() {
  const [user, setUser] = useState(null);
  const [navBar, setNavBar] = useState("tournoispublic");

  const navBarClick = (page) => setNavBar(page);
  const onLogout = () => {
    setUser(null)
    setNavBar("connection");
  };
  const userUpdate = (userData) => {
    setUser(userData);
    setNavBar("tournois");
  }
  const equipeUpdate = (userData) => {
    setUser(userData);
    setNavBar("tournois");
  }

  let content;
  switch (navBar) {
    case "connection":
      content = <Logging UserUpdate={userUpdate} />;
      break;
    case "tournois":
      content = <GestionTournois user={user} />;
      break;
    case "tournoispublic":
      content = <PublicTournois/>;
      break;
    case "resultats":
      content = <Parties user={user} />;
      break;
    case "inscriptions":
      content = <CreezUtilisateur/>;
      break;
    case "joueur":
      content = <GestionJoueur user={user}/>;
      break;
    case "historique":
      content = <h2>Historique</h2>;
      break;
    case "classement":
      content = <h2>Classement</h2>;
      break;
    case "creezEquipe":
      content = <CreezEquipe user={user} equipeUpdate={equipeUpdate}  />;
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
