import { IonPage, IonContent } from "@ionic/react";
import Questions from "../components/Questions";

import "./Home.css";

const QuestionPage: React.FC = () => {
  return (
    <IonPage>
      <IonContent>
       <Questions firstQuestion = {{question: "", options: [{}]}} auth = {{token:"", identifier:""}} playedLiveGames = {[]}/> 
      </IonContent>
    </IonPage>
  );
};

export default QuestionPage;
