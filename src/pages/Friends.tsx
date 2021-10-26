import { IonPage, IonContent } from "@ionic/react";
import Friendss from "../components/Friends";

import "./Home.css";

const Friends: React.FC = () => {
  return (
    <IonPage>
      <IonContent>
     <Friendss/>
      </IonContent>
    </IonPage>
  );
};

export default Friends;
