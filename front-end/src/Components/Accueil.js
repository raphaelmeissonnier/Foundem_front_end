import React from "react";
import {Link} from "react-router-dom";


const Accueil = () => {
    return (
      <div className="Accueil">
          <div>
            <br></br><br></br><br></br><br></br><br></br>
            <h1> Un objet perdu se transforme souvent en objet trouvé ! </h1>
            <h5> Vous avez perdu ou trouvé un objet ? Déclarez-le et la communauté
            se met en mouvement pour vous aider à retrouver votre objet </h5>
            <box direction="row" spacing={2}>
                <Link to="/AjoutObjetTrouve"><button>J'AI TROUVE UN OBJET</button></Link>
                <Link to="/AjoutObjetPerdu"><button>J'AI PERDU UN OBJET</button></Link>
            </box>
          </div>
      </div>
    )
}
export default Accueil;