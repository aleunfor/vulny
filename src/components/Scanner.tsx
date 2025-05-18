import { useEffect, useState } from "react"
import { useAuth, RedirectToSignIn } from "@clerk/clerk-react"

import DescriptionApp from "./DescriptionApp"
import SectionContainer from "./SectionContainer"
import TableVulns from "./TableVulns"
import Statistics from "./Statistics"
import TableScans from "./TableScans"
import { TabMenu } from "primereact/tabmenu"

import { ScanService } from "../services/scan.service"
import ScanForm from "./ScanForm"

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
  const [error, setError] = useState(false)
  const [activeIndex, setActiveIndex] = useState(0)
  const { isSignedIn, userId, getToken } = useAuth()

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
        } finally {
          setLoadingStatistics(false)
          setIsMockData(false)
        }
      })
    }

    if ((isSignedIn && vulns.length === 0) || !isSignedIn) {
      fetchMockData()
    }
  }

  useEffect(() => {
    setLoading(false)
    setLoadingStatistics(false)
    setIsMockData(false)
  }, [])

  useEffect(() => {
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
      setVulns([])
      setActiveIndex(0)
      const token = await getToken()

      await ScanService.executeScan(userId, target, String(token))
        .then((response) => {
          const data = response
          setVulns(data.vulns)
          setStatistics(data.statistics)
          setScanData(data.scanData)
          setIsMockData(false)
        })
        .catch((err) => {
          console.log(err)
          setLoading(false)
          setLoadingStatistics(false)
          setError(true)
        })
        .finally(() => {
          setLoading(false)
          setLoadingStatistics(false)
        })
    }
  }

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const inputValue = e.target.value
    setTarget(inputValue)
    setIsUrl(isValidUrl(inputValue))
    setError(false)
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
      /^https?:\/\/([\w-]+\.)+([a-z]{2,})(\/[\w\-._~:/?#[\]@!$&'()*+,;=]*)?$/i

    return regex.test(value)
  }

  if (redirect) {
    return <RedirectToSignIn />
  }

  return (
    <>
      <SectionContainer>
        <DescriptionApp />
        <ScanForm
          target={target}
          isUrl={isUrl}
          loading={loading}
          touched={touched}
          focused={focused}
          onChange={handleChange}
          onFocus={handleFocus}
          onBlur={handleBlur}
          onScanClick={executeScan}
          error={error}
        />
      </SectionContainer>

      {isSignedIn && (
        <SectionContainer>
          <Statistics statistics={statistics} loading={loadingStatistics} />
        </SectionContainer>
      )}

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
