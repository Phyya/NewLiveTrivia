import {  IonPage} from '@ionic/react';

import Login from '../components/Login';
import './Home.css';

const LoginPage: React.FC = () => {
  return (
    <IonPage>
   <Login/>
    </IonPage>
  );
};

export default LoginPage;
