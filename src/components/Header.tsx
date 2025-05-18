import {
  SignedIn,
  SignedOut,
  SignInButton,
  UserButton,
} from "@clerk/clerk-react"

type Props = {}

function Header({}: Props) {
  return (
    <>
      <nav className="border-gray-200">
        <div className="bg-white rounded-full px-6 py-4 mt-2 max-w-screen-xl flex flex-wrap items-center justify-between mx-auto">
          <a
            href="/"
            className="flex items-center space-x-3 rtl:space-x-reverse"
          >
            <img src="/vulny.svg" className="h-12" alt="Flowbite Logo" />
            <span className="self-center text-2xl font-extrabold whitespace-nowrap dark:text-gray-800">
              Vulny
            </span>
          </a>

          <div className="border border-blue-500 rounded-full bg-blue-600 text-white cursor-pointer">
            <SignedOut>
              <SignInButton mode="modal">
                <button className="border-blue-500 bg-blue-600 hover:bg-blue-700 transition text-white font-bold py-2 px-4 rounded-full cursor-pointer">
                  Sign In
                </button>
              </SignInButton>
            </SignedOut>
            <SignedIn>
              <UserButton
                showName
                appearance={{
                  elements: {
                    userButtonBox: {
                      color: "white",
                      fontWeight: "bold",
                      borderRadius: "100px",
                      padding: "0.2rem 0.4rem",
                    },
                  },
                }}
              />
            </SignedIn>
          </div>
        </div>
      </nav>
    </>
  )
}

export default Header
