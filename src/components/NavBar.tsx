import Image from "next/image";
import logo from "../../public/logo.png";
import { Plus } from "lucide-react";
import './style.css';
import { UserButton } from "@clerk/nextjs";

export default function NavBar() {
  return (
    <div className="h-screen border-solid max-h-screen box-border rounded-lg bg-[#F5F5F5]">
      <div className="top-0 right-0 flex items-center justify-between pt-2">
        <div className="flex items-center justify-center ml-2">
          <Image width={40} height={40} src={logo} alt="logo" />
          <span>New chat</span>
        </div>
        <div className="mr-2 transition-transform duration-2000 ease-linear transform hover:rotate-180">
          <Plus />
        </div>
      </div>
      <div className="prev-chats"></div>
      <div className="absolute bottom-0 gap-3 pb-4 flex items-center justify-start pl-3">
        <UserButton />
        <span>Felix Dawodu</span>
      </div>
    </div>
  );
}
