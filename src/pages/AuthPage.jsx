import { useState } from "react"
import { Login } from "@auth/Login"
import { Register } from "@auth/Register"
import { Container, Card, Button } from "@ui"

export const AuthPage = () => {
    const [toggleSection, setToggleSection] = useState(true)

    const handleToggle = () => {
        if (toggleSection) {
            setToggleSection(false)
        } else {
            setToggleSection(true)
        }
    }

    return (
        <div className="page-container">
            <div className="page-header">
                <h1 className="page-title">Auth</h1>
            </div>

            <Container maxWidth="md" centered>
                <Card padding="lg" shadow="md" className="glow-effect">
                    <Card.Body>
                        {toggleSection ? <Login /> : <Register />}
                    </Card.Body>

                    <Card.Footer>
                        <Button
                            variant="ghost"
                            size="md"
                            onClick={handleToggle}
                            fullWidth
                        >
                            {toggleSection ? 'Registrati?' : 'Login'}
                        </Button>
                    </Card.Footer>
                </Card>
            </Container>
        </div>
    )
}