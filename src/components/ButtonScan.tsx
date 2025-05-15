import { PlayIcon } from "@heroicons/react/16/solid"
import { RedirectToSignIn } from "@clerk/clerk-react"

type Props = {
  onScanClick: () => void
  loading: boolean
  isValidUrl: boolean
  isSignedIn: boolean | undefined
}

export default function ButtonScan({
  onScanClick,
  loading,
  isValidUrl,
  isSignedIn,
}: Props) {
  if (!isSignedIn) {
    return <RedirectToSignIn />
  }

  return (
    <>
      <button
        type="button"
        disabled={loading || !isValidUrl}
        className={`flex items-center text-white ${
          loading || !isValidUrl
            ? "cursor-not-allowed disabled:hover:cursor-not-allowed disabled:bg-blue-400 font-medium rounded-lg text-sm px-5 py-2.5 ml-2"
            : "bg-blue-600 hover:bg-blue-800 focus:ring-2 focus:ring-blue-700 font-medium rounded-lg text-sm px-5 py-2.5 ml-2 focus:outline-none hover:cursor-pointer"
        }`}
        onClick={onScanClick}
      >
        Scan
        <PlayIcon className="inline-block w-4 h-4 ml-1" />
      </button>
    </>
  )
}
