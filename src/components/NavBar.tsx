import Image from "next/image";
import logo from "../../public/logo.png";
import { Plus } from "lucide-react";
import './style.css';
import { UserButton } from "@clerk/nextjs";

export default function NavBar() {
  return (
    <div className="h-screen border-solid pb-12 max-h-screen box-border">
      <div className="top-0 right-0 flex items-center justify-between pt-2">
        <div className="flex items-center justify-center ml-2">
          <Image width={40} height={40} src={logo} alt="logo" />
          <span>New chat</span>
        </div>
        <div className="mr-2">
          <Plus />
        </div>
      </div>
      <div className="prev-chats"></div>
      <div className="absolute bottom-0 gap-2 pb-2 flex items-center justify-start pl-3">
        <UserButton />
        <span>Felix Dawodu</span>
      </div>
    </div>
  );
}
