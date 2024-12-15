import MainContainer from "./MainContainer.tsx";
import {CircularProgress} from "@mui/material";

const LoadingBox = () => {
    return (
        <MainContainer>
            <CircularProgress />
        </MainContainer>
    );
};

export default LoadingBox;