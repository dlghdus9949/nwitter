import { authService, firebaseInstance } from "fbase";
import { useState } from "react";

const Auth = () => {
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [newAccount, setNewAccount] = useState(true);
    const [error, setError] = useState("");

    const onChange = (event) => {
        const {
            target: {name, value},
        } = event;
        if (name==="email") {
            setEmail(value);
        } else if (name==="password"){
            setPassword(value);
        }
    };

    const onSubmit = async (event) => {
        event.preventDefault();
        //submit이 발생했을 때 onSubmit 함수에서 submit 이벤트를 가로채고,
        //이벤트의 기본값을 event.preventDefault()가 막아 새로고침이 발생하지 않음
        try {
            let data;
            if (newAccount) {
                //create newAccount
                data = await authService.createUserWithEmailAndPassword(email, password);
            } else {
                //login
                data = await authService.signInWithEmailAndPassword(email, password);
            }
            console.log(data);
        } catch(error) {
            setError(error.message);
        }
    };

    const toggleAccount = () => setNewAccount((prev) => !prev);

    const onSocialClick = async (event) => {
        const {
            target: {name},
        } = event;
        let provider;
        if (name === "google") {
            provider = new firebaseInstance.auth.GoogleAuthProvider();
        } else if (name === "github") {
            provider = new firebaseInstance.auth.GithubAuthProvider();
        }
        const data = await authService.signInWithPopup(provider);
        console.log(data);
    };

    return(
        <div>
            <form onSubmit={onSubmit}>
                <input
                    name="email"
                    type="email"
                    placeholder="Email"
                    required
                    value={email}
                    onChange={onChange}
                    />
                <input 
                    name="password"
                    type="password"
                    placeholder="Password"
                    required
                    value={password}
                    onChange={onChange}
                    />
                <input type="submit" value={newAccount ? "Create Account" : "Log In"} />
                {error}
            </form>
            <span onClick={toggleAccount}>
                {newAccount ? "Sign In" : "Create Account"}
            </span>
            <div>
                <button onClick={onSocialClick} name="google">
                    Continue with Goggle
                </button>
                <button onClick={onSocialClick} name="github">
                    Continue with Github
                </button>
            </div>
        </div>
    );
};

export default Auth;