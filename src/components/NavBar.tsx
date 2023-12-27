import Image from "next/image";
import logo from "../../public/logo.png";
import userImage from "../../public/kawaii.jpg";
import { Plus } from "lucide-react";

export default function NavBar() {
    return (
      <div className="border-2 border-red-600 h-screen border-solid pb-12 max-h-screen box-border">
        <div className="top-0 right-0 flex items-center justify-between pt-1">
          <div className="flex items-center justify-center ml-1">
            <Image width={40} height={40} src={logo} alt="logo" />
            <span>New chat</span>
          </div>
          <div className="mr-2">
            <Plus />
          </div>
        </div>
        <div className="prev-chats"></div>
        <div className="absolute bottom-0 gap-2 pb-2 flex items-center justify-start pl-2">
            <Image
              width={40}
              height={40}
              src={userImage}
              alt="logo"
              className="rounded-full"
            />
            <span>Felix</span>
        </div>
      </div>
    );
  }
  
