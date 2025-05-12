import { MagnifyingGlassCircleIcon } from "@heroicons/react/20/solid"

type Props = {}

export default function ButtonVulnDetails({}: Props) {
  return (
    <>
      <button
        type="button"
        className="flex items-center text-white bg-blue-600 hover:bg-blue-800 focus:ring-2 focus:ring-blue-700 font-medium rounded-lg text-sm px-5 py-2.5 ml-2 focus:outline-none hover:cursor-pointer"
      >
        Details
        <MagnifyingGlassCircleIcon className="inline-block w-4 h-4 ml-1" />
      </button>
    </>
  )
}
