import MainContainer from "./MainContainer.tsx";
import {CircularProgress} from "@mui/material";

const LoadingBox = () => {
    return (
        // TODO: Style this component properly
        <MainContainer>
            <CircularProgress />
        </MainContainer>
    );
};

export default LoadingBox;