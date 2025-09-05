import { useState } from "react";
import API from '../../src/axios.js'
import { Link } from 'react-router-dom'
import styles from '../../styles/auth.module.css'
import "../../styles/global.css"
import logo from "../../src/assets/BN logo embossed.png"

const Login = ({ setUser }) => {
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [error, setError] = useState('');

    const handleLogin = async () => {
        try {
            setError(null)
            await API.post('api/user/login', { email, password })
            const { data } = await API.get('/api/user/me')
            setUser(data.user);
        } catch (err) {
            console.error(err.response?.data || err.message);
            setError("login failed")
        }
    }

    return (
        <div style={{ height: "100wh", display: "flex", alignItems: "center", flexDirection: "column", position: "relative", top: "22.5vh", fontFamily: "Product Sans" }}>
            <div style={{ width: "400px", backgroundColor: "rgb(55, 55, 55)", height: "400px", display: "flex", alignItems: "center", flexDirection: "column", justifyContent: "center", borderRadius: "40px" }}>
                <img src={logo} alt="" className={styles.imagee} />
                <input className={styles.input} placeholder='enter email' type="email" onChange={(e) => setEmail(e.target.value)} value={email} />
                <input className={styles.input} placeholder='enter password' type="password" onChange={e => setPassword(e.target.value)} value={password} />
                <button className={styles.login} onClick={handleLogin}>Login</button>

                <Link to="/register" className={styles.register}>Already not user? Register</Link>
            </div>

        </div>
    )
}

export default Login;