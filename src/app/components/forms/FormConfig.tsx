import { Button } from "../Button";
import { LineInput } from "../LineInput";
import { SheetClose, SheetFooter, SheetHeader, SheetTitle } from "../Sheet";
import { useForm } from "react-hook-form";
import { EditConfig } from "../../../domain/types/Profile";
import { useAuth } from "../../../infra/contexts/auth/UseAuth";
import { useNavigate } from "react-router-dom";
export const FormConfig = () => {
  const { register, handleSubmit } = useForm<EditConfig>();
  const { user } = useAuth();

  const navigate = useNavigate();
  function sendSubmit(data: EditConfig) {}

  return (
    <div className="flex h-full flex-col">
      <SheetHeader>
        <SheetTitle>Configurações</SheetTitle>
        <div className="border-b border-stroke w-full" />
      </SheetHeader>
      <form
        onSubmit={handleSubmit(sendSubmit)}
        className="flex flex-col space-y-5 px-2 py-5"
      >
        <div className="flex flex-col space-y-4">
          <div>
            <p className="text-md font-semibold mb-4">Sua conta</p>
            <div className="ml-2 flex items-end flex-col space-y-5">
              <LineInput
                label="Email"
                {...register("email", { required: true })}
                defaultValue={user?.email}
              />

              <LineInput
                label="Senha"
                {...register("password", { required: true })}
                defaultValue={"alterar senha"}
              />
              <LineInput
                label="Username"
                {...register("username", { required: true })}
                defaultValue={user?.username ? `@${user.username}` : ""}
              />
            </div>
          </div>
        </div>
      </form>
      <SheetFooter>
        <SheetClose asChild>
          <Button type="submit">Salvar</Button>
        </SheetClose>
      </SheetFooter>
      <div className="mt-auto">
        <Button
        onClick={()=> {
 localStorage.clear();
 localStorage.removeItem("tunetown@token");
 localStorage.removeItem("tunetown@user");
 localStorage.removeItem("tunetown@profile");

 navigate("/", { replace: true });
        }}
        >Sair</Button>
      </div>
    </div>
  );
};
