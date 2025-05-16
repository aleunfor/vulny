import type { IVulnerability } from "../services/vulnerability.service"
import BadgeSeverity from "./BadgeSeverity"

type Props = {
  vuln: IVulnerability
}

export default function VulnDetails({ vuln }: Props) {
  return (
    <>
      <div className="inline-flex gap-x-2 mb-4">
        <BadgeSeverity severity={vuln?.severity} />
        {vuln.cwe && vuln.cwe !== "N/A" && (
          <span className="bg-gray-100 text-gray-800 font-medium px-2.5 py-0.5 rounded-sm text-sm">
            {vuln.cwe}
          </span>
        )}
      </div>
      <h2 className="text-xl mb-4 font-bold">{vuln?.name}</h2>

      <h3 className="text-md mb-1 font-bold">Description</h3>
      <p className="mb-4">{vuln?.description}</p>
      <h3 className="text-md mb-1 font-bold">Mitigation</h3>
      <p>
        {vuln?.mitigation
          ? vuln.mitigation
          : "No mitigation provided for this vulnerability."}
      </p>
    </>
  )
}
