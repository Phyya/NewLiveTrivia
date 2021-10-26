import { IonPage, IonContent } from "@ionic/react";

import Ranking from "../components/Ranking";

import "./Home.css";

const RankingPage: React.FC = () => {
  return (
    <IonPage>
      <IonContent>
       <Ranking/>
      </IonContent>
    </IonPage>
  );
};

export default RankingPage;
