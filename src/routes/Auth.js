import { useState } from "react";

const Auth = () => {
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");

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

    const onSubmit = (event) => {
        event.preventDefault();
        //submit이 발생했을 때 onSubmit 함수에서 submit 이벤트를 가로채고,
        //이벤트의 기본값을 event.preventDefault()가 막아 새로고침이 발생하지 않음
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
                <input type="submit" value="Log In" />
            </form>
            <div>
                <button>Continue with Goggle</button>
                <button>Continue with Github</button>
            </div>
        </div>
    );
};

export default Auth;