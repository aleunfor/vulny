type Props = {
  severity: string
}

const returnSeverityColor = (severity: string) => {
  switch (severity) {
    case "informational":
      return "bg-blue-100 text-blue-800 px-2.5 py-0.5 rounded-sm text-sm"
    case "low":
      return "bg-green-100 text-green-800 px-2.5 py-0.5 rounded-sm text-sm"
    case "medium":
      return "bg-yellow-100 text-yellow-800 px-2.5 py-0.5 rounded-sm text-sm"
    case "high":
      return "bg-orange-100 text-red-800 px-2.5 py-0.5 rounded-sm text-sm"
    case "critical":
      return "bg-red-100 text-red-800 px-2.5 py-0.5 rounded-sm text-sm"
    default:
      return "bg-blue-100 text-blue-800 px-2.5 py-0.5 rounded-sm text-sm"
  }
}

export default function BadgeSeverity({ severity }: Props) {
  return (
    <>
      <span className={returnSeverityColor(severity)}>
        {severity ? severity.toUpperCase() : "N/A"}
      </span>
    </>
  )
}
