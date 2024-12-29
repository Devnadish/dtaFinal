"use client";
import { useRouter } from "next/navigation";
import {Icon} from '@iconify/react'

const ContactUs: React.FC = () => {
  const router = useRouter();
  const handleClick = () => {
    router.push(`/contactus`);
  };

  return (
    <button
      onClick={handleClick}
      className="  rounded-full  w-[30px] h-[30px] hover:text-black hover:bg-white/80 flex items-center justify-center   flex-row  p-1"
      aria-label={"contact us"}
    >
      <Icon icon="mingcute:send-fill" width={24} height={24} />
    </button>
  );
};

export default ContactUs;
