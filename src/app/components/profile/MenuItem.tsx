interface ButtonProps {
  children: string;
  buttonSelected: string;
  setButtonSelected: (value: string) => void;
}

export const MenuItem = ({
  children,
  buttonSelected,
  setButtonSelected,
}: ButtonProps) => {
  function handleClick() {
    setButtonSelected(children);
  }

  return (
    <button
      type="button"
      onClick={handleClick}
      className={`${
        buttonSelected === children
          ? `border-b-2 border-theme font-semibold`
          : ``
      } `}
    >
      {children}
    </button>
  );
};
