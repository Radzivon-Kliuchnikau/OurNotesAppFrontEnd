import MainContainer from "../components/common/MainContainer.tsx";
import { useForm } from "react-hook-form";
import { LoginFormInputs } from "../types/general.ts";
import EmailRequestForm from "../components/common/EmailRequestForm.tsx";

const RegistrationRequest = () => {
    const { reset } = useForm<LoginFormInputs>({ mode: "onChange" });

    const onSubmit = async (form: LoginFormInputs) => {
        reset();
    };

    return (
        <MainContainer>
            <EmailRequestForm
                title="Create new account"
                description="Enter your email address and we will send you an email to create your new account."
                submitFunction={onSubmit}
            />
        </MainContainer>
    );
};

export default RegistrationRequest;
