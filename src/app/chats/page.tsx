import Dropdown from "@/components/DropDown";
import NavBar from "@/components/NavBar";
import logo from "../../../public/logo.png";
import Image from "next/image";
import {
  Card,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import "./style.css";

export default function ChatsDashboard() {
  return (
    <div className="flex">
      <div className="w-1/5">
        <NavBar />
      </div>
      <div className="top-0 w-4/5">
        <div className="pt-2 pl-2">
          <Dropdown />
        </div>
        <div className="border-2 border-red-600 mt-1 w-full h-4/5 flex flex-col justify-between items-center">
          <div className="flex flex-col items-center mt-10">
            <Image width={120} height={120} src={logo} alt="logo" />
            <h2>How can i help you today?</h2>
          </div>
          <div className="border-2 border-red-600 w-3/5 bottom-0 h-2/5 flex flex-wrap justify-between">
            <Card className="border border-gray-300 bg-transparent shadow-none custom-card">
              <CardHeader>
                <CardTitle className="text-lg">Help me debug</CardTitle>
                <CardDescription>a linked list problem</CardDescription>
              </CardHeader>
            </Card>
            <Card className="border border-gray-300 bg-transparent shadow-none custom-card">
              <CardHeader>
                <CardTitle className="text-lg">Help me debug</CardTitle>
                <CardDescription>a linked list problem</CardDescription>
              </CardHeader>
            </Card>
            <Card className="border border-gray-300 bg-transparent shadow-none custom-card">
              <CardHeader>
                <CardTitle className="text-lg">Help me debug</CardTitle>
                <CardDescription>a linked list problem</CardDescription>
              </CardHeader>
            </Card>
            <Card className="border border-gray-300 bg-transparent shadow-none custom-card">
              <CardHeader>
                <CardTitle className="text-lg">Help me debug</CardTitle>
                <CardDescription>a linked list problem</CardDescription>
              </CardHeader>
            </Card>
          </div>
          <div>
            
          </div>
        </div>
      </div>
    </div>
  );
}
