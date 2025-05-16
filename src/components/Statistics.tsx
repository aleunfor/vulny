import CardStatistics from "./CardStatistics"

type Props = {
  statistics: any
  loading: boolean
}

export default function Statistics({ statistics, loading }: Props) {
  return (
    <>
      <div className="py-10 px-3">
        <h3 className="text-2xl font-bold mb-4 mx-auto">Statistics Last Scan</h3>
        <div className="grid grid-cols-4 gap-4 ">
          <div className="min-h-20">
            <CardStatistics
              qtyVulns={statistics.high}
              severity={"high"}
              loading={loading}
            ></CardStatistics>
          </div>
          <div className="min-h-20">
            <CardStatistics
              qtyVulns={statistics.medium}
              severity={"medium"}
              loading={loading}
            ></CardStatistics>
          </div>
          <div className="min-h-20">
            <CardStatistics
              qtyVulns={statistics.low}
              severity={"low"}
              loading={loading}
            ></CardStatistics>
          </div>
          <div className="min-h-20">
            <CardStatistics
              qtyVulns={statistics.informational}
              severity={"informational"}
              loading={loading}
            ></CardStatistics>
          </div>
        </div>
      </div>
    </>
  )
}
