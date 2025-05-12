import { DataTable } from "primereact/datatable"
import { Column } from "primereact/column"
import BadgeSeverity from "./BadgeSeverity"
import ButtonVulnDetails from "./ButtonVulnDetails"

type Props = {}

const vulns = [
  {
    name: "Vuln 1",
    cve: "CVE-2023-1234",
    severity: "informational",
  },
  {
    name: "Vuln 2",
    cve: "CVE-2023-1234",
    severity: "low",
  },
  {
    name: "Vuln 3",
    cve: "CVE-2023-1234",
    severity: "medium",
  },
  {
    name: "Vuln 4",
    cve: "CVE-2023-1234",
    severity: "high",
  },
  {
    name: "Vuln 5",
    cve: "CVE-2023-1234",
    severity: "critical",
  },
]

function TableVulns({}: Props) {
  return (
    <>
      <DataTable
        value={vulns}
        className="py-6 px-3 rounded-lg"
        tableStyle={{ minWidth: "50rem", borderRadius: "10rem" }}
      >
        <Column field="name" header="Name"></Column>
        <Column field="cve" header="CVE"></Column>
        <Column
          field="severity"
          header="Severity"
          body={(rowData) => <BadgeSeverity severity={rowData.severity} />}
        ></Column>
        <Column
          field="actions"
          header="Actions"
          body={ButtonVulnDetails}
        ></Column>
      </DataTable>
    </>
  )
}

export default TableVulns
