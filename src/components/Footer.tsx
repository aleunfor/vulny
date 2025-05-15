type Props = {}

export default function Footer({}: Props) {
  return (
    <>
      <footer className="max-w-screen-xl mx-auto px-4 my-4 border border-gray-200 bg-gray-400/5 rounded-xl">
        <div className="w-full mx-auto max-w-screen-xl p-4 md:flex md:items-center md:justify-between">
          <span className="text-sm  sm:text-center ">
            © 2025{" "}
            <a
              href="https://www.linkedin.com/in/alejandro-hermosilla/"
              target="_blank"
              className="hover:underline"
            >
              With ❤️ by Alejandro Hermosilla
            </a>
          </span>
          <ul className="flex flex-wrap items-center mt-3 text-sm font-medium  sm:mt-0">
            <li>
              <a
                href="https://github.com/aleunfor/vulny"
                target="_blank"
                className="hover:text-blue-600 transition me-4 md:me-6"
              >
                Go To Code
              </a>
            </li>
          </ul>
        </div>
      </footer>
    </>
  )
}
