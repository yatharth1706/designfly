export default function ProtectedLayout({ children }) {
  return (
    <html lang="en">
      <body>
        <div className="w-full flex justify-between bg-[#1B1B1B] text-white p-10">
          <div className="flex space-x-4 w-2/5">
            {/* Logo */}
            <img
              src="/assets/DesignflyLogo.png"
              className="w-6 h-6"
              alt="Designfly Logo"
            />
            <span>Designfly</span>
          </div>
          <div className="w-10 h-10 rounded-full flex justify-center items-center bg-white text-gray-500">
            Y
          </div>
        </div>
        {children}
      </body>
    </html>
  );
}
