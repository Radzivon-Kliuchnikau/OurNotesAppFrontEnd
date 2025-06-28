import { Card, styled } from "@mui/material";
import * as React from "react";

const CustomFormCard = styled(Card)(() => ({
    display: "flex",
    flexDirection: "column",
    alignSelf: "center",
    textAlign: "center",
    width: "420px",
    padding: "10px 40px 10px 40px",
    marginTop: "70px",
}));

interface Props {
    children: React.ReactNode;
}

const FormCard: React.FC<Props> = (props: {
    children: React.ReactNode;
}): React.ReactElement => {
    return <CustomFormCard>{props.children}</CustomFormCard>;
};

export default FormCard;
