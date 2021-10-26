import { IonPage, IonContent } from "@ionic/react";
import Livegame from "../components/LiveGame";

import "./Home.css";

const LiveGame: React.FC = () => {
  return (
    <IonPage>
      <IonContent>
       <Livegame/>
      </IonContent>
    </IonPage>
  );
};

export default LiveGame;
