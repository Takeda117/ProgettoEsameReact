import { useState } from "react"
import { useDispatch } from "react-redux"
import { register } from "../../store/authSlice"
import { Input, Button } from "@ui"

export const Register = () => {
    const dispatch = useDispatch()
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');

    const handleRegister = () => {
        if (email && password) {
            dispatch(register({ email, password, role: 'user' }))
        }
    }

    return (
        <div>
            <h1 className="text-heading">Register</h1>

            <div className="form-group">
                <Input
                    type="email"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    placeholder="Scrivi la tua email"
                    fullWidth
                />
            </div>

            <div className="form-group">
                <Input
                    type="password"
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    placeholder="Scrivi la tua password"
                    fullWidth
                />
            </div>

            <div className="form-actions">
                <Button
                    variant="primary"
                    size="md"
                    onClick={handleRegister}
                    fullWidth
                >
                    Registrati
                </Button>
            </div>
        </div>
    )
}