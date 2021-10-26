import {
  IonPage,
  IonContent,
  IonHeader,
  IonToolbar,
  IonTitle,
} from "@ionic/react";
import Shop from "../components/Shop";
const ShopPage: React.FC = () => {
  return (
    <IonPage>
      {/* <IonHeader>
        <IonToolbar>
          <IonTitle>Shop</IonTitle>
        </IonToolbar>
      </IonHeader> */}
      <IonContent>
        <Shop />
      </IonContent>
    </IonPage>
  );
};

export default ShopPage;
