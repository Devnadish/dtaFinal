import Image from "next/image";
import bg from "@/public/bg.webp";
import logo from "@/public/logo.webp";
import HomeQuastion from "@/components/HomeQuastion";
import Typography from "./Text";

// New BackgroundImage component
function BackgroundImage() {
  return (
    <div className="absolute inset-0 -z-10 w-full h-full">
      <Image
        src={bg}
        alt="Hero background"
        fill
        priority
        quality={60}
        placeholder="blur"
        blurDataURL="data:image/jpeg;base64,/9j/4AAQSkZJRgABAQAAAQABAAD/4gHYSUNDX1BST0ZJTEUAAQEAAAHIAAAAAAQwAABtbnRyUkdCIFhZWiAH4AABAAEAAAAAAABhY3NwAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAQAA9tYAAQAAAADTLQAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAlkZXNjAAAA8AAAACRyWFlaAAABFAAAABRnWFlaAAABKAAAABRiWFlaAAABPAAAABR3dHB0AAABUAAAABRyVFJDAAABZAAAAChnVFJDAAABZAAAAChiVFJDAAABZAAAAChjcHJ0AAABjAAAADxtbHVjAAAAAAAAAAEAAAAMZW5VUwAAAAgAAAAcAHMAUgBHAEJYWVogAAAAAAAAb6IAADj1AAADkFhZWiAAAAAAAABimQAAt4UAABjaWFlaIAAAAAAAACSgAAAPhAAAts9YWVogAAAAAAAA9tYAAQAAAADTLXBhcmEAAAAAAAQAAAACZmYAAPKnAAANWQAAE9AAAApbAAAAAAAAAABtbHVjAAAAAAAAAAEAAAAMZW5VUwAAACAAAAAcAEcAbwBvAGcAbABlACAASQBuAGMALgAgADIAMAAxADb/2wBDABQODxIPDRQSEBIXFRQdHx4eHRoaHSQrJyEwPNRdXVtQTVFfZIJrW32DiXaZd2N7iZCJlZaXW3+jvqWZva7/2wBDARUXFx4aHR4eHa7AoyCuwMDAwMDAwMDAwMDAwMDAwMDAwMDAwMDAwMDAwMDAwMDAwMDAwMDAwMDAwMDAwMDAwMD/wAARCAAIAAoDASIAAhEBAxEB/8QAFQABAQAAAAAAAAAAAAAAAAAAAAb/xAAUEAEAAAAAAAAAAAAAAAAAAAAA/8QAFQEBAQAAAAAAAAAAAAAAAAAAAAX/xAAUEQEAAAAAAAAAAAAAAAAAAAAA/9oADAMBAAIRAxEAPwCdABmX/9k="
        className="object-cover object-center"
        sizes="100vw"
        onLoadingComplete={(img) => {
          // Add fade-in effect when image loads
          img.classList.add('animate-fade-in');
        }}
      />
      <div className="absolute inset-0 bg-gradient-to-r from-black via-transparent to-black opacity-50" />
    </div>
  );
}

// New Logo component
function Logo() {
  return (
    <div className="relative w-[225px] h-[225px]">
      <Image
        src={logo}
        alt="Logo"
        priority
        className="object-contain"
        sizes="(max-width: 640px) 50vw, (max-width: 1280px) 50vw, 30vw"
        fill
        quality={90}
      />
    </div>
  );
}

// New Title component
function Title() {
  return (
    <Typography 
      variant="h1" 
      className="text-3xl font-bold text-blueColor bg-yellowColor rounded-lg p-2 w-full z-1 text-center"
    >
      Dream To App
    </Typography>
  );
}

export default function HeroSection() {
  return (
    <section className="relative min-h-screen flex flex-col items-center justify-center text-white">
      <BackgroundImage />
      <div className="container mx-auto px-4 flex flex-col items-center justify-center gap-8">
        <Logo />
        <Title />
        <HomeQuastion />
      </div>
    </section>
  );
}
