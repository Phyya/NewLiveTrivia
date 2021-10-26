import React, { useState, useEffect } from "react";
import SelectLevel from "./SelectLevel";
import InstantQuestion from "./InstantQuestion";
import { Store, get } from "../context/Store";

const InstantGame = () => {
  const [playing, setPlaying] = useState(false);
  const [auth, setAuth] = useState({});
  const [count, setCount] = useState(0);
  const [firstQuestion, setFirstQuestion] = useState({});
  const getToken = async () => {
    const token = await get("token");
    console.log(token)
    setAuth({ token: token });
  };
  useEffect(() => {
    getToken();
  }, []);
  return (
    <div>
      {!playing ? (
        <SelectLevel
          // auth={auth}
          setPlaying={setPlaying}
          setFirstQuestion={setFirstQuestion}
          count = {count}
          setCount = {setCount}
        />
      ) : (
        <InstantQuestion firstQuestion={firstQuestion} auth={auth} />
      )}
    </div>
  );
};

export default InstantGame;
