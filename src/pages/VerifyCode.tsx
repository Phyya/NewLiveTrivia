import {  IonPage } from '@ionic/react';
import VerifyCode from '../components/VerifyCode';
import './Home.css';

const Home: React.FC = () => {
  return (
    <IonPage>
 <VerifyCode/>
    </IonPage>
  );
};

export default Home;
