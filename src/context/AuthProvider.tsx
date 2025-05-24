import { createContext, ReactNode, useState } from 'react'
import AuthContextProps from '../interfaces/AuthContextProps.tsx'
import User from '../interfaces/User.tsx'

const defaultContext: AuthContextProps = {
    authUser: null,
    setAuthUser: () => {},
}

const AuthContext = createContext<AuthContextProps | null>(defaultContext)

// @ts-ignore
export const AuthProvider = ({ children }: { children: ReactNode }) => {
    const [authUser, setAuthUser] = useState<User | null>(null)

    return (
        <AuthContext.Provider value={{ authUser, setAuthUser }}>
            {children}
        </AuthContext.Provider>
    )
}

export default AuthContext
