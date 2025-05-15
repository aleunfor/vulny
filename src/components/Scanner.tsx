import { useState } from "react"
import { useAuth, RedirectToSignIn } from "@clerk/clerk-react"

import ButtonScan from "./ButtonScan"
import DescriptionApp from "./DescriptionApp"
import SectionContainer from "./SectionContainer"
import TableVulns from "./TableVulns"
import { LinkIcon } from "@heroicons/react/20/solid"

import { ScanService } from "../services/scan.service"

const Scanner = () => {
  const [vulns, setVulns] = useState([])
  const [userId, setUserId] = useState<string>("")
  const [target, setTarget] = useState<string>("")
  const [isUrl, setIsUrl] = useState(false)
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState<string | null>(null)
  const [touched, setTouched] = useState(false)
  const [focused, setFocused] = useState(false)
  const { isSignedIn } = useAuth()

  const executeScan = async () => {
    if (!isUrl || loading) {
      return
    }

    if (!isSignedIn) {
      <RedirectToSignIn />
    }

    setLoading(true)
    await ScanService.executeScan(userId, target).then((response) => {
      setError(null)
      try {
        const data = response
        setVulns(data.vulns)
      } catch (err: any) {
        console.log(err)
        setError(err.message || "Error desconocido")
      } finally {
        setLoading(false)
      }
    })
  }

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const inputValue = e.target.value
    setTarget(inputValue)
    setIsUrl(isValidUrl(inputValue))
    if (!touched) setTouched(true)
  }

  const handleFocus = () => setFocused(true)
  const handleBlur = () => setFocused(false)

  const isValidUrl = (value: string): boolean => {
    try {
      new URL(value)
      return true
    } catch (_) {
      return false
    }
  }

  return (
    <>
      <SectionContainer>
        <DescriptionApp />
        <form className="max-w-xl mx-auto my-14">
          <label className="block mb-2 text-sm font-medium text-gray-900 ">
            Put your website URL here
          </label>
          <div className="flex flex-row">
            <span className="inline-flex items-center px-3 text-sm text-gray-900 bg-gray-200 border border-e-0 border-gray-300 rounded-s-md dark:bg-gray-600 dark:text-gray-400 dark:border-gray-600">
              <LinkIcon className="w-5 h-5" />
            </span>
            <input
              type="text"
              id="website-admin"
              className={`${
                loading ? "cursor-not-allowed" : ""
              } rounded-none rounded-e-lg bg-gray-50 border border-gray-300 text-gray-900 focus:ring-blue-500 focus:border-blue-500 block flex-1 min-w-0 w-full text-sm p-2.5`}
              placeholder="https://google.com"
              onChange={handleChange}
              onFocus={handleFocus}
              onBlur={handleBlur}
              disabled={loading}
              readOnly={loading}
            />
            <ButtonScan
              onScanClick={executeScan}
              loading={loading}
              isValidUrl={isUrl}
              isSignedIn={isSignedIn}
            />
          </div>
          <div className="min-h-10">
            {!isUrl && touched && focused && (
              <p className={`mt-2 text-sm text-red-600 dark:text-red-500`}>
                <span className="font-medium">Oops!</span> Put a valid URL.
              </p>
            )}
          </div>
        </form>
      </SectionContainer>

      <SectionContainer>
        <TableVulns vulns={vulns} loading={loading} />
      </SectionContainer>
    </>
  )
}

export default Scanner
