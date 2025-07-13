import { Button, ButtonProps, LinkProps, styled } from "@mui/material";

type LinkButtonProps = ButtonProps & {
    component?: React.ElementType;
    to?: LinkProps["href"];
};

const LinkButton = styled(Button)<LinkButtonProps>({
    height: "auto",
    border: "none",
    borderRadius: 0,
    padding: 0,
    minWidth: "auto",
    backgroundColor: "transparent",
    boxShadow: "none",

    display: "inline",
    color: "black",
    textDecoration: "underline",
    fontSize: "18px",
    fontWeight: 600,
    textTransform: "none",
    lineHeight: "inherit",

    "&:hover": {
        textDecoration: "none",
        backgroundColor: "transparent",
        boxShadow: "none",
    },
});

export default LinkButton;
