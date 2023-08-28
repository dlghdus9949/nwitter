import { useEffect,useState } from "react";
import AppRouter from "components/Router";
import { authService } from "fbase";

function App() { 
  const [init, sestInit] = useState(false);
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [userObj, setUserObjet] = useState(null);

  useEffect(()=> {
    authService.onAuthStateChanged((user) => {
      if (user) {
        setIsLoggedIn(user);
        setUserObjet(user);
      } else {
        setIsLoggedIn(false);
      }
      sestInit(true);
    });
  },[]);

  return (
    <>
      {init ? (
        <AppRouter isLoggedIn={isLoggedIn} userObj={userObj}/> 
      ) : (
        "initializing..."
      )}
      <footer>&copy; {new Date().getFullYear()} Nwitter</footer>
    </>
  );
}

export default App;
