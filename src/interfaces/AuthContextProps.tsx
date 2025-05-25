import User from "./User.tsx";

export default interface AuthContextProps {
    authUser: User | null;
    setAuthUser: React.Dispatch<React.SetStateAction<User | null>>;
}
