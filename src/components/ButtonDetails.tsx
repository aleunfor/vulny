type Props = {}

export default function ButtonDetails({}: Props) {
  return (
    <>
      <button
        type="button"
        className="text-white bg-blue-700 hover:bg-blue-800 focus:ring-2 focus:ring-blue-700 font-medium rounded-lg text-sm px-5 py-2.5 ml-2 focus:outline-none hover:cursor-pointer"
      >
        Details
      </button>
    </>
  )
}
