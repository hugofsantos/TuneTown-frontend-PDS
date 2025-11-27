import { Button } from "../Button";
import Input from "../Input";
import { useForm } from "react-hook-form";
import { TextArea } from "../TextArea";
import FormPhotoUpload from "../PhotoButton";
import { EditProfile } from "../../../domain/types/Profile";

export const FormEditProfile = () => {
  const { register, handleSubmit } = useForm<EditProfile>();

  function sendSubmit(data: EditProfile) {
    void data;
    // const response = await editProfileRequest(user!.id, data);
    // console.log("Profile edited:", response);
  }

  return (
    <form
      onSubmit={handleSubmit(sendSubmit)}
      className="flex flex-col space-y-5 px-6 py-5"
    >
      <div className="flex flex-col items-center space-y-4">
        <FormPhotoUpload />

        {/* <PhotoButton size="7" src={profile?.urlPhoto} /> */}

        {/* <Input label="Nome" {...register("name", { required: true })} /> */}
        <TextArea
          label="Bio"
          height="16"
          {...register("bio", { required: false })}
        />
        <Input
          label="Música favorita"
          {...register("favoriteSong", { required: true })}
        />
        {/* <Input
          label="Senha"
          type="password"
          {...register("password", { required: true })}
        /> */}
      </div>

      <Button type="submit">Editar</Button>
    </form>
  );
};
