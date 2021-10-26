import {IonPage, IonContent } from '@ionic/react';
import ChooseUsername from '../components/ChooseUsername';

import './Home.css';

const Home: React.FC = () => {
  return (
    <IonPage>
      <IonContent>
      <ChooseUsername/>
      </IonContent>
   
    </IonPage>
  );
};

export default Home;
