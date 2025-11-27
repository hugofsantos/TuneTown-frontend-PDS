import { useAuth } from "@/infra/contexts/auth/UseAuth";
import UserGatewayHttp from "@/infra/gateway/UserGatewayHttp";
import { BiCamera } from "react-icons/bi";
import { useRef, ChangeEvent, useState, useEffect } from "react";

export default function FormPhotoUpload() {
  const { profile, setProfile } = useAuth();
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [preview, setPreview] = useState<string | null>(
    profile?.photoUrl ?? null,
  );

  // Atualiza preview se profile mudar (ex: ao editar perfil ou logar outro usuário)
  useEffect(() => {
    setPreview(profile?.photoUrl ?? null);
  }, [profile?.photoUrl]);

  const userGatewayHttp = new UserGatewayHttp();
  const inputRef = useRef<HTMLInputElement | null>(null);

  const allowedTypes = ["image/jpeg", "image/png", "image/webp"];
  const maxSizeMB = 5;

  function validateFile(file: File) {
    if (!allowedTypes.includes(file.type)) {
      setError("Formato inválido! Use JPG, PNG ou WEBP.");
      return false;
    }

    if (file.size > maxSizeMB * 1024 * 1024) {
      setError(`A imagem deve ter no máximo ${maxSizeMB}MB.`);
      return false;
    }

    setError(null);
    return true;
  }

  function openFile() {
    inputRef.current?.click();
  }

  async function handleFileChange(e: ChangeEvent<HTMLInputElement>) {
    const file = e.target.files?.[0];
    if (!file || !profile) return;

    if (!validateFile(file)) return;

    setPreview(URL.createObjectURL(file));
  }

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    if (!inputRef.current?.files?.[0] || !profile) return;

    const file = inputRef.current.files[0];

    setLoading(true);

    try {
      const formData = new FormData();
      formData.append("file", file);
      console.log(profile);

      const response = await userGatewayHttp.uploadPhoto(profile.id, formData);
      // response já é o data correto
      setProfile({
        ...profile,
        photoUrl: response.photoUrl,
      });
      localStorage.setItem("tunetown@profile", JSON.stringify(response));

      setPreview(response.photoUrl || null);
      setError(null);
    } catch (err) {
      setError("Erro ao enviar foto, tente novamente.");
    }
    setLoading(false);
  }

  return (
    <div className="flex flex-col gap-3 items-center">
      <div
        className="relative rounded-full overflow-hidden flex items-center justify-center bg-[#d9d9d9]"
        style={{
          height: "6rem",
          width: "6rem",
        }}
      >
        {preview ? (
          <img
            src={preview}
            alt="Foto de perfil"
            className="w-full h-full object-cover rounded-full"
          />
        ) : (
          <span className="text-gray-600 text-sm">Sem foto</span>
        )}

        {/* Loading */}
        {loading && (
          <div className="absolute inset-0 bg-black/40 flex items-center justify-center">
            <div className="w-6 h-6 border-4 border-white border-t-transparent rounded-full animate-spin"></div>
          </div>
        )}

        <input
          ref={inputRef}
          type="file"
          accept="image/*"
          className="hidden"
          onChange={handleFileChange}
        />

        <button
          type="button"
          onClick={openFile}
          disabled={loading}
          className="absolute bottom-0 right-0 rounded-full flex size-10 bg-black/40 hover:bg-black/50 transition items-center justify-center disabled:cursor-not-allowed"
        >
          <BiCamera size={24} className="text-white" />
        </button>
      </div>

      {error && (
        <span className="text-xs text-red-500 text-center">{error}</span>
      )}

      <button
        onClick={handleSubmit}
        disabled={loading || !preview || preview === profile?.photoUrl}
        className="px-4 py-2 rounded-lg bg-blue-600 disabled:bg-gray-400 text-white text-sm"
      >
        Salvar Foto
      </button>
    </div>
  );
}
