import { Button } from "../Button";
import Input from "../Input";
import { UserLogin } from "../../../domain/types/Auth";
import spotify_logo from "../../assets/spotify_logo.svg";
import { useAuth } from "../../../infra/contexts/auth/UseAuth";
import { useNavigate } from "react-router-dom";
import { useEffect } from "react";
import { useForm } from "react-hook-form";

export const FormSignIn = () => {
  const { user, profile, loading, handleLogin } = useAuth();

  const { register, handleSubmit } = useForm<UserLogin>();

  const navigate = useNavigate();

  useEffect(() => {
    if (user) {
      navigate(`/${user.username}`);
    }
  }, [user, loading]);

  function sendSubmit(data: UserLogin) {
    handleLogin(data);

    if (user) {
      navigate(`/${user.username}`);
    }
  }

  return (
    <form
      onSubmit={handleSubmit(sendSubmit)}
      className="flex flex-col space-y-5 px-6 py-5"
    >
      <div className="mb-4">
        <p className="text-3xl mb-1 font-semibold">Faça seu login</p>
        <p className="text-md font-light">
          Esteja conectado aos seus amigos e suas músicas
        </p>
      </div>

      <Button onClick={() => window.open("#", "_blank")} bg="bg-white">
        <div className="flex text-[#161616] relative gap-3">
          <div className=" relative h-auto size-6  md:flex ">
            <img className="size-fit " src={spotify_logo} alt="Logo" />
          </div>
          Inscrever-se com Spotify
        </div>
      </Button>

      <div className="flex flex-col space-y-4">
        <Input label="Login" {...register("login", { required: true })} />
        <Input
          label="Senha"
          type="password"
          {...register("password", { required: true })}
        />
      </div>

      <div className="flex justify-between text-sm font-light">
        <p>Esqueceu sua senha?</p>
        <div>
          <p>Lembre-se de mim</p>
        </div>
      </div>

      <Button type="submit">{loading ? "Loading..." : "Entrar"}</Button>
    </form>
  );
};
