import { useEffect,useState } from "react";
import AppRouter from "components/Router";
import { authService } from "fbase";
import { updateProfile } from "firebase/auth";

function App() { 
  const [init, sestInit] = useState(false);
  const [userObj, setUserObjet] = useState(null);

  useEffect(()=> {
    authService.onAuthStateChanged((user) => {
      if (user) {
        setUserObjet({
          uid: user.uid,
          displayName: user.displayName,
          updateProfile: (args) => updateProfile(user, {displayName: user.displayName}),
        });
      } else {
        setUserObjet(false);
      }
      sestInit(true);
    });
  },[]);
  
  const refreshUser = () => {
    const user = authService.currentUser;
    setUserObjet({
      uid: user.uid,
      displayName: user.displayName,
      updateProfile: (args) => updateProfile(user, {displayName: user.displayName}),
    });
  };

  return (
    <>
      {init ? (
        <AppRouter
          refreshUser={refreshUser}
          isLoggedIn={Boolean(userObj)}
          userObj={userObj}
        /> 
      ) : (
        "initializing..."
      )}
    </>
  );
}

export default App;
