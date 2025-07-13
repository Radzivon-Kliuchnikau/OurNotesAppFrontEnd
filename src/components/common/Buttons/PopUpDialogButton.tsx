import { Button, styled } from "@mui/material";

const PopUpDialogButton = styled(Button)(() => ({
    width: "120px",
    height: "40px",
    borderRadius: "10px",
    textTransform: "none",
    fontSize: "16px",
    fontWeight: "500",
    border: "1px solid black",
    color: "black",
    transition: "background-color 0.3s ease",
}));

export default PopUpDialogButton;
