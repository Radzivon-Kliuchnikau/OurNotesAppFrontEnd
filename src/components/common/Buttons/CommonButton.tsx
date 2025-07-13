import { Button, ButtonProps, styled } from "@mui/material";

type LinkButtonProps = ButtonProps & {
    to?: string;
};

const CommonButton = styled(Button)<LinkButtonProps>({
    fontWeight: 600,
    borderWidth: "2px",
    border: "1px solid black",
    borderRadius: "2rem",
    padding: ".5rem 2.5rem",
    color: "black",
    textShadow: "none",
    letterSpacing: "0.025rem",
    textDecoration: "none",
    textTransform: "none",
    fontSize: "20px",
    whiteSpace: "nowrap",
    minWidth: "fit-content",
});

export default CommonButton;
