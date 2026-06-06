import Image from "next/image";

const Logo = () => {
  return (
    <div className="flex items-center gap-2">
      <Image src="/logo.webp" alt="Logo" width={30} height={30} className="rounded-md" />
      <h1 className="text-xl">Sklep AGD</h1>
    </div>
  );
};

export default Logo;
