import NavigationBar from "@/components/NavigationBar";
import Image from "next/image";
import Link from "next/link";

export default function Home() {
  return (
    <main className="flex min-h-screen flex-col py-6 px-20 bg-[#1B1B1B] text-white">
      <div className="h-44">
        {/* navigation bar */}
        <NavigationBar />
      </div>

      <div className="flex flex-col w-full items-center mx-auto space-y-8">
        <div
          className="px-12 py-3 rounded-full max-w-4xl"
          style={{
            background:
              "linear-gradient(91deg, rgba(206, 206, 206, 0.07) 9.41%, rgba(255, 255, 255, 0.07) 146.46%, rgba(2, 255, 255, 0.00) 204.33%, rgba(255, 19, 2, 0.07) 204.33%)",
          }}
        >
          Over 1K people have become part of our community 🎉
        </div>

        <h1
          className="max-w-4xl mx-auto text-7xl font-medium text-center"
          style={{ lineHeight: "80px" }}
        >
          Your Destination for Inspiring Visual Creativity
        </h1>

        <p className="text-xl">
          Discover, Share, Collaborate, and Elevate Your Creative Journey
        </p>

        <Link href="/signup">
          <button
            className="rounded-full py-4 px-20 text-white"
            style={{
              background:
                "linear-gradient(91deg, #2FBEFF 7.38%, #1A67DC 92.4%, rgba(255, 255, 255, 0.90) 126.21%, rgba(44, 189, 255, 0.29) 161.04%, rgba(38, 13, 192, 0.00) 224.67%, rgba(108, 84, 255, 0.00) 224.67%)",
            }}
          >
            Get Started
          </button>
        </Link>
      </div>

      <div className="border rounded mt-20 p-1">
        {/* Hero image */}

        <img
          src="/assets/HeroImage.png"
          className="w-full h-full object-cover"
          alt="Hero image for designfly"
        />
      </div>

      <footer className="flex justify-between mt-12 py-20">
        <span>Created with NextJS and Appwrite</span>

        <div>
          {/* Logo */}
          <div className="flex space-x-4 w-2/5">
            {/* Logo */}
            <img
              src="/assets/DesignflyLogo.png"
              className="w-6 h-6"
              alt="Designfly Logo"
            />
            <span>Designfly</span>
          </div>
        </div>
      </footer>
    </main>
  );
}
