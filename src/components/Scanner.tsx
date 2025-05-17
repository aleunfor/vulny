import { useEffect, useState } from "react"
import { useAuth, RedirectToSignIn } from "@clerk/clerk-react"

import ButtonScan from "./ButtonScan"
import DescriptionApp from "./DescriptionApp"
import SectionContainer from "./SectionContainer"
import TableVulns from "./TableVulns"
import Statistics from "./Statistics"
import TableScans from "./TableScans"
import { LinkIcon } from "@heroicons/react/20/solid"
import { TabMenu } from "primereact/tabmenu"

import { ScanService } from "../services/scan.service"

const Scanner = () => {
  const tabOptions = [
    { label: "Last Scan", icon: "pi pi-home" },
    { label: "My Scans", icon: "pi pi-users" },
  ]

  const [vulns, setVulns] = useState([])
  const [scanData, setScanData] = useState({})
  const [statistics, setStatistics] = useState({})
  const [target, setTarget] = useState<string>("")
  const [isUrl, setIsUrl] = useState(false)
  const [loading, setLoading] = useState(false)
  const [loadingStatistics, setLoadingStatistics] = useState(false)
  const [touched, setTouched] = useState(false)
  const [focused, setFocused] = useState(false)
  const [redirect, setRedirect] = useState(false)
  const [isMockData, setIsMockData] = useState(false)
  const [activeIndex, setActiveIndex] = useState(0)
  const { isSignedIn, userId, getToken } = useAuth()

  useEffect(() => {
    const fetchMockData = async () => {
      setLoading(true)
      fetch("/mockData.json")
        .then((res) => res.json())
        .then((data) => {
          setVulns(data)
          setIsMockData(true)
          setLoading(false)
        })
        .catch((err) => console.error("Error loading JSON:", err))
    }

    const fetchLastScan = async () => {
      if (isSignedIn) {
        setLoadingStatistics(true)
        setIsMockData(false)
        const token = await getToken()

        await ScanService.getLastScan(String(token)).then((response) => {
          try {
            const data = response
            setVulns(data.vulns)
            setStatistics(data.statistics)
            setScanData(data.scanData)
            setLoadingStatistics(false)
          } catch (err: any) {
            console.log(err)
            setLoadingStatistics(false)
          } finally {
            setLoadingStatistics(false)
            setIsMockData(false)
          }
        })
      }

      if (isSignedIn && vulns.length === 0) {
        await fetchMockData()
      }
    }

    fetchLastScan()
  }, [isSignedIn, getToken, isMockData])

  const executeScan = async () => {
    if (!isUrl || loading) {
      return
    }

    if (!isSignedIn) {
      setRedirect(true)
    }

    if (isSignedIn) {
      setLoading(true)
      setLoadingStatistics(true)
      setActiveIndex(0)
      const token = await getToken()

      await ScanService.executeScan(userId, target, String(token)).then(
        (response) => {
          try {
            const data = response
            setVulns(data.vulns)
            setStatistics(data.statistics)
            setScanData(data.scanData)
            setIsMockData(false)
          } catch (err: any) {
            console.log(err)
            setLoading(false)
            setLoadingStatistics(false)
          } finally {
            setLoading(false)
            setLoadingStatistics(false)
          }
        }
      )
    }
  }

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const inputValue = e.target.value
    setTarget(inputValue)
    setIsUrl(isValidUrl(inputValue))
    if (!touched) setTouched(true)
  }

  const handleFocus = () => setFocused(true)
  const handleBlur = () => setFocused(false)

  const renderComponent = (
    vulns: any[],
    loading: boolean,
    isSignedIn: boolean | undefined,
    isMockData: boolean,
    scanData: any
  ) => {
    switch (activeIndex) {
      case 0:
        return (
          <TableVulns
            vulns={vulns}
            loading={loading}
            isSignedIn={isSignedIn}
            isMockData={isMockData}
            scanData={scanData}
          />
        )
      case 1:
        return <TableScans isSignedIn={isSignedIn} />
      default:
        return null
    }
  }

  const isValidUrl = (value: string): boolean => {
    const regex =
      /^(https?:\/\/)?([\w\-]+\.)+[a-z]{2,}(\/[\w\-._~:/?#[\]@!$&'()*+,;=]*)?$/i
    return regex.test(value)
  }

  if (redirect) {
    return <RedirectToSignIn />
  }

  return (
    <>
      <SectionContainer>
        <DescriptionApp />
        <form className="max-w-xl mx-auto py-14">
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
            />
          </div>
          <div className="min-h-10">
            {!isUrl && touched && focused && (
              <p className={`mt-2 text-sm text-red-600`}>
                <span className="font-medium">Oops!</span> Put a valid URL.
              </p>
            )}

            {loading && (
              <p className={`mt-2 text-sm text-blue-600`}>
                <span className="font-medium">Executing Scan...</span> Please
                wait, took about 4 minutes..
              </p>
            )}
          </div>
        </form>
      </SectionContainer>

      <SectionContainer>
        <Statistics statistics={statistics} loading={loadingStatistics} />
      </SectionContainer>

      <SectionContainer>
        <TabMenu
          model={tabOptions}
          activeIndex={activeIndex}
          onTabChange={(e) => setActiveIndex(e.index)}
          className="p-4"
        />
        <div className="rounded-xl bg-white p-4">
          {renderComponent(vulns, loading, isSignedIn, isMockData, scanData)}
        </div>
      </SectionContainer>
    </>
  )
}

export default Scanner
