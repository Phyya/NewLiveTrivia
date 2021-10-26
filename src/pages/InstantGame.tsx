import { IonPage, IonContent } from "@ionic/react";
import InstantGame from "../components/InstantGame";

import "./Home.css";

const InstantGame1: React.FC = () => {
  return (
    <IonPage>
      <IonContent>
        <InstantGame />
      </IonContent>
    </IonPage>
  );
};

export default InstantGame1;
