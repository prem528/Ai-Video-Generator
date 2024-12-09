import { Button } from "@/components/ui/button";
import { UserButton } from "@clerk/nextjs";
import Image from "next/image";

export default function Home() {
  return (
    <div>
      <h2>heyyy </h2>
      <Button  variant="destructive"> click meee </Button>
      <UserButton/>
    </div>
  );
}
