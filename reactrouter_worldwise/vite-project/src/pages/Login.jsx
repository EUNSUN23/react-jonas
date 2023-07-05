import styles from "./Login.module.css";
import {useEffect, useState} from "react";
import PageNav from "../components/PageNav.jsx";
import Button from "../components/Button.jsx";
import {useAuth} from "../context/FakeAuthContext.jsx";
import {useNavigate} from "react-router-dom";

export default function Login() {
    // PRE-FILL FOR DEV PURPOSES
    const [email, setEmail] = useState("jack@example.com");
    const [password, setPassword] = useState("qwerty");
    const {login, isAuthenticated} = useAuth();
    const navigate = useNavigate();

    useEffect(() => {
        if(isAuthenticated) navigate("/app",{replace:true}); // replace:true -> 이전히스토리를 navigate대상 url로 대체함
    }, [isAuthenticated]);


    function handleLogin(e) {
        e.preventDefault();
        if(!email) {
            alert("이메일을 입력하세요.");
            return;
        }
        if(!password){
            alert("비밀번호를 입력하세요.");
            return;
        }

        login(email, password);
    }

    return (
        <main className={styles.login}>
            <PageNav/>
            <form className={styles.form}>
                <div className={styles.row}>
                    <label htmlFor="email">Email address</label>
                    <input
                        type="email"
                        id="email"
                        onChange={(e) => setEmail(e.target.value)}
                        value={email}
                    />
                </div>

                <div className={styles.row}>
                    <label htmlFor="password">Password</label>
                    <input
                        type="password"
                        id="password"
                        onChange={(e) => setPassword(e.target.value)}
                        value={password}
                    />
                </div>

                <div>
                    <Button type="primary" onClick={handleLogin}>Login</Button>
                </div>
            </form>
        </main>
    );
}
