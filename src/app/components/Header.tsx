function Header() {
  return (
    <header className=" overflow-hidden w-full h-16 flex bg-gradient-to-r content-center from-oil-black-100 via-oil-black-100 to-[#576C8B] ">
      <div className="flex flex-col bg-oil-black-100 justify-center items-center w-full h-[98%]">
        <div className="flex bg-oil-black-200 justify-center items-center  w-full h-full blur-xl translate-x-2/3 -rotate-6" />
        <div className="absolute size-16 left-3 top-5 bg-oil-black-100 shadow-moon rounded-full"></div>
      </div>
    </header>
  );
}
{
  /*

box-sizing: border-box;

position: absolute;
width: 72px;
height: 72px;
left: 43px;
top: 50px;

background: #1B1B1B;
box-shadow: inset 14px -1px 9.8px #759EBD;
*/
}
export default Header;
