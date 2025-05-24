import {Box} from "@mui/material";
import {ClipLoader} from "react-spinners";

type Props = {
    isLoading?: boolean;
    size?: number | string;
}

const Spinner = ({isLoading = true, size}: Props) => {
    return (
        <Box sx={{
            position: "fixed",
            top: "50%",
            left: "50%",
            transform: "translate(-50%, -50%)",
        }}>
            <ClipLoader
                color="#36d7d7"
                loading={isLoading}
                size={size || 50}
                area-label="Loading Spinner"
                data-testid="loader"
            />
        </Box>
    );
};

export default Spinner;