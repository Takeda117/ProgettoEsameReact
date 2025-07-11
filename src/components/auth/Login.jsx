import { useDispatch } from "react-redux"
import { useState } from "react"
import { login } from "@store/authSlice"
import { useNavigate } from "react-router-dom"
import { Input, Button } from "@ui"

export const Login = () => {
    const dispatch = useDispatch()
    const navigate = useNavigate()
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');





    const handleLogin = () => {
        dispatch(login({ email, password }))
        navigate('/')
    }

    return (
        <div>
            <h1 className="text-heading">Login</h1>

            <div className="form-group">
                <Input
                    type="email"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    placeholder="Email"
                    fullWidth
                />
            </div>

            <div className="form-group">
                <Input
                    type="password"
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    placeholder="Password"
                    fullWidth
                />
            </div>

            <div className="form-actions">
                <Button
                    variant="primary"
                    size="md"
                    onClick={handleLogin}
                    fullWidth
                >
                    Login
                </Button>
            </div>
        </div>
    )
}