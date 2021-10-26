import { Redirect, Route, Switch } from "react-router-dom";
import { IonApp, IonRouterOutlet } from "@ionic/react";
import { SplashScreen } from "@capacitor/splash-screen";
import { IonReactRouter } from "@ionic/react-router";
import React, { useEffect, useState } from "react";
// import axios from "axios";
import "./components/style.css";
import "./components/style2.css";
/* Core CSS required for Ionic components to work properly */
import "@ionic/react/css/core.css";

/* Basic CSS for apps built with Ionic */
import "@ionic/react/css/normalize.css";
import "@ionic/react/css/structure.css";
import "@ionic/react/css/typography.css";

/* Optional CSS utils that can be commented out */
import "@ionic/react/css/padding.css";
import "@ionic/react/css/float-elements.css";
import "@ionic/react/css/text-alignment.css";
import "@ionic/react/css/text-transformation.css";
import "@ionic/react/css/flex-utils.css";
import "@ionic/react/css/display.css";

/* Theme variables */
import "./theme/variables.css";
import Login from "./components/Login";
import SplashScreenPage from "./components/SplashScreen";
import VerifyCode from "./components/VerifyCode";
import ChooseUsername from "./components/ChooseUsername";
import HomePagee from "./pages/HomePage";
import ProfilePage from "./pages/Profile";
import RulesPage from "./pages/Rules";
import RankingPage from "./pages/Ranking";
import ShopPage from "./pages/Shop";
// import Friends from "./pages/Friends";
import LiveGame from "./pages/LiveGame";
import QuestionPage from "./pages/QuestionPage";
import InstantGame from "./pages/InstantGame";
import LiveParticipants from "./pages/LiveParticipants";
import { get } from "./context/Store";

// const Friends = React.lazy(() => import("./pages/Friends"));
// const SelectLevelPage = React.lazy(() => import("./pages/SelectLevel"));
// const RankingPage = React.lazy(() => import("./pages/Ranking"));

const App: React.FC = () => {
  const token = localStorage.getItem("token");
  const token2 = token !== null ? JSON.parse(token) : "";

  //  eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6IjYxM…zA5fQ.0vEIKfDWsHxEvxHedvN3W07z02u02q-N9y1WF4u6rZU
  useEffect(() => {
    SplashScreen.hide();
  }, []);

  return (
    <IonApp>
      <IonReactRouter>
        <IonRouterOutlet>
          <Switch>
            <Route exact path="/login">
              <Login />
            </Route>
            <Route exact path="/homepage">
              <HomePagee />
            </Route>
            <Route exact path="/splashscreen">
              <SplashScreenPage />
            </Route>
            <Route exact path="/verifycode">
              <VerifyCode />
            </Route>
            <Route path="/profile">
              <ProfilePage />
            </Route>
            {/* <Route exact path="/livegame/:name">
              <LiveGame />
            </Route> */}
            <Route
              path="/"
              exact
              render={(props) =>
                token2 === "" ? <SplashScreenPage /> : <HomePagee />
              }
            />
            <Route exact path="/rankingpage">
              <RankingPage />
            </Route>
            <Route exact path="/shop">
              <ShopPage />
            </Route>
            <Route exact path="/rules">
              <RulesPage />
            </Route>
            <Route exact path="/livegame/:name">
              <LiveGame />
            </Route>
            <Route exact path="/chooseusername">
              <ChooseUsername />
            </Route>
            {/* <Route exact path="/">
              <Redirect to={token ? "homepage" : "/splashscreen"} />
            </Route>

            <Route exact path="/">
              <Redirect to={token ? "homepage" : "/splashscreen"} />
            </Route> */}
            <Route exact path="/question">
              <QuestionPage />
            </Route>
            <Route exact path="/instantgame">
              <InstantGame />
            </Route>
          </Switch>
        </IonRouterOutlet>
      </IonReactRouter>
    </IonApp>
  );
};

export default App;
export {};
