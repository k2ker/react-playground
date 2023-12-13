import Image from "next/image";
const Header = () => {
  return (
    <div className=" absolute left-0 top-0 w-full bg-[#263038] p-4">
      <div className="relative h-8 w-32">
        <Image src="/vercel.svg" alt="logo" width={394} height={80} />
      </div>
    </div>
  );
};

export default Header;
