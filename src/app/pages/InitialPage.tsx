import logo from "../assets/logo.svg";
import { ThemeButton } from "../components/ThemeButton";
import { Button } from "../components/Button";
import * as Dialog from "@radix-ui/react-dialog";
import { FormSignIn } from "../components/forms/FormSignIn";
import { FormSignUp } from "../components/forms/FormSignUp";
import { useEffect, useState } from "react";
import { useAuth } from "@/infra/contexts/auth/UseAuth";
import { useNavigate } from "react-router-dom";

interface InitialPageProps {
  name?: string;
  email?: string;
  username?: string;
  avatarUrl?: string;
  form?: "signUp" | "signIn";
  refreshToken?: string;
  accessToken?: string;
}

export const InitialPage = ({
  name,
  email,
  username,
  form,
  avatarUrl,
  refreshToken,
  accessToken,
}: InitialPageProps) => {
  const [signUpOpen, setSignUpOpen] = useState(false);
  const [signInOpen, setSignInOpen] = useState(false);
  const { user, profile } = useAuth();
  const navigate = useNavigate();

  useEffect(() => {
    if (user && profile) {
      navigate(`/${user.username}`);
    }

    form === "signUp" ? setSignUpOpen(true) : setSignUpOpen(false);
    form === "signIn" ? setSignInOpen(true) : setSignInOpen(false);
  }, [user, profile, form, navigate]);

  return (
    <div className="bg-base text-contrast justify-center items-center flex fixed w-screen h-screen text-balance">
      <div
        className="size-[50%] rounded-full bg-[#B56CFF] -translate-x-96 -translate-y-72 absolute 
        blur-3xl opacity-5
        "
      />
      <div
        className="size-[80%] rounded-full bg-[#68C56F]  -translate-x-[90%] translate-y-[80%] absolute 
        blur-3xl opacity-5"
      />
      <div className="size-[100%] rounded-full blur-3xl  bg-purple-600  translate-x-[95%] translate-y-96 opacity-10 absolute" />

      <div className="absolute top-4 left-4">
        <ThemeButton />
      </div>

      <div className="relative flex justify-center w-full  gap-40 items-center">
        <div className=" relative  md:h-2/4 w-auto hidden md:flex ">
          <img className="w-full h-auto" src={logo} alt="Logo" />
        </div>

        <div className="flex flex-col w-full md:w-1/4 h-[50%] space-y-6 p-12 md:p-0">
          <h1 className="font-semibold  text-3xl  outline-none pointer-events-none ">
            Inscreva-se hoje
          </h1>

          <Dialog.Root open={signUpOpen}>
            <Dialog.Trigger asChild>
              <Button onClick={() => setSignUpOpen(true)}>Criar conta</Button>
            </Dialog.Trigger>

            <Dialog.Portal>
              <Dialog.Overlay className="bg-[#292929]  opacity-50 data-[state=open]:animate-overlayShow fixed inset-0" />
              <Dialog.Content className=" bg-fume border border-stroke text-contrast stroke-stroke data-[state=open]:animate-contentShow fixed top-[50%] left-[50%] max-h-[85vh] w-[90vw] max-w-[450px] translate-x-[-50%] translate-y-[-50%] rounded-[6px] p-[25px] shadow-[hsl(206_22%_7%_/_35%)_0px_10px_38px_-10px,_hsl(206_22%_7%_/_20%)_0px_10px_20px_-15px] focus:outline-none">
                <Dialog.Close asChild>
                  <button
                    className="flex self-end"
                    aria-label="Close"
                    onClick={() => setSignUpOpen(false)}
                  >
                    X
                  </button>
                </Dialog.Close>

                <FormSignUp
                  avatarUrl={avatarUrl}
                  name={name}
                  email={email}
                  username={username}
                  refreshToken={refreshToken}
                  accessToken={accessToken}
                />
              </Dialog.Content>
            </Dialog.Portal>
          </Dialog.Root>

          <p className="text-contrast text-justify text-xs outline-none pointer-events-none">
            Ao se inscrever, você concorda com os{" "}
            <a className="underline">Termos de Serviço </a>e a{" "}
            <a className="underline">Política de Privacidade</a>, incluindo o
            Uso de <a className="underline">Cookies</a>.
          </p>

          <Dialog.Root open={signInOpen}>
            <Dialog.Trigger asChild>
              <div className="space-y-3 text-left">
                <h1 className="font-semibold text-xl outline-none pointer-events-none">
                  Já tem uma conta?
                </h1>
                <Button full onClick={() => setSignInOpen(true)}>
                  Entrar com o e-mail
                </Button>
              </div>
            </Dialog.Trigger>

            <Dialog.Portal>
              <Dialog.Overlay className="bg-[#292929] opacity-50  data-[state=open]:animate-overlayShow fixed inset-0" />
              <Dialog.Content className="text-contrast border border-stroke data-[state=open]:animate-contentShow fixed top-[50%] left-[50%] max-h-[85vh] w-[90vw] max-w-[450px] translate-x-[-50%] translate-y-[-50%] rounded-[6px] bg-fume stroke-stroke p-[25px] shadow-[hsl(206_22%_7%_/_35%)_0px_10px_38px_-10px,_hsl(206_22%_7%_/_20%)_0px_10px_20px_-15px] focus:outline-none">
                <Dialog.Close asChild>
                  <button
                    className="flex self-end"
                    aria-label="Close"
                    onClick={() => setSignInOpen(false)}
                  >
                    X
                  </button>
                </Dialog.Close>
                <FormSignIn />
              </Dialog.Content>
            </Dialog.Portal>
          </Dialog.Root>
        </div>
      </div>
    </div>
  );
};
