import { IonPage, IonContent } from "@ionic/react";
import HomePage from "../components/HomePage";

import "./Home.css";

const HomePagee: React.FC = () => {
  return (
    <IonPage>
      <IonContent>
        <HomePage />
      </IonContent>
    </IonPage>
  );
};

export default HomePagee;
