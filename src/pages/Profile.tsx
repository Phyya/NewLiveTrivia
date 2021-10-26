import { IonPage, IonContent } from "@ionic/react";
import Profile from "../components/Profile";

import "./Home.css";

const ProfilePage: React.FC = () => {
  return (
    <IonPage>
      <IonContent>
        <Profile />
      </IonContent>
    </IonPage>
  );
};

export default ProfilePage;

// const RulesComponent = () => {
//   return (
//     <>
//       <h1 className="rules__h1"> Rules </h1>
//       {Rules.map((r, i) => (
//         <li key={i} className="live_game_rules">
//           {/* <span className="rules__span">{i + 1}</span> */}
//           {r}
//         </li>
//       ))}
//       <h1 className="rules__h1">Good luck!</h1>
//       <FcAlarmClock className="rules__h1 goodluck" />
//     </>
//   );
// };
