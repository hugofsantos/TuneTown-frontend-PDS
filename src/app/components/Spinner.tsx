type SpinnerProps = {
  size?: number;
};

export function Spinner({ size = 24 }: SpinnerProps) {
  const borderSize = Math.max(2, Math.floor(size / 8));

  return (
    <div
      className="inline-block animate-spin rounded-full border border-solid border-theme border-t-transparent"
      style={{
        width: size,
        height: size,
        borderWidth: borderSize,
      }}
      aria-label="Carregando"
    />
  );
}
