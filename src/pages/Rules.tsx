import { IonPage, IonContent } from "@ionic/react";
import Rules from "../components/Rules";

import "./Home.css";

const RulesPage: React.FC = () => {
  return (
    <IonPage>
      <IonContent>
        <Rules />
      </IonContent>
    </IonPage>
  );
};

export default RulesPage;
