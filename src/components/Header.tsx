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

          <ul className="font-medium flex flex-row p-4 md:p-0 my-2 rounded-full bg-gray-50 md:flex-row md:space-x-8 rtl:space-x-reverse md:my-2 md:border-0  text-gray-800">
            <div className="border border-blue-500 py-1 px-2 rounded-full bg-blue-600 text-white cursor-pointer">
              <SignedOut>
                <SignInButton />
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
                      },
                    },
                  }}
                />
              </SignedIn>
            </div>
          </ul>
        </div>
      </nav>
    </>
  )
}

export default Header
