import { DataTable } from "primereact/datatable"
import { Column } from "primereact/column"
import BadgeSeverity from "./BadgeSeverity"
import ButtonVulnDetails from "./ButtonVulnDetails"

type Props = {
  vulns: any[]
  loading: boolean
  isSignedIn?: boolean
  isMockData?: boolean
  scanData?: any
}

function TableVulns({
  vulns,
  loading,
  isSignedIn,
  isMockData,
  scanData,
}: Props) {
  return (
    <>
      <div
        className={`${
          !isSignedIn || isMockData
            ? "blur-xs pointer-events-none opacity-80"
            : ""
        } py-7 px-3 min-h-[500px] `}
      >
        <h2 className="text-xl font-bold mb-4">
          Last scan:{" "}
          <span className="font-light">
            {scanData.target ? scanData.target : "Not excecuted yet"}
          </span>
        </h2>
        <DataTable
          value={vulns}
          loading={loading}
          paginator
          rows={10}
          className="bg-gray-500/5"
          tableStyle={{
            backgroundColor:
              "color-mix(in oklab, var(--color-gray-400) 5%, transparent)",
            minWidth: "50rem",
            minHeight: "25rem",
            borderRadius: "10px",
          }}
          emptyMessage={"Vulnerabilities not found"}
        >
          <Column field="name" header="Name"></Column>
          <Column
            field="cwe"
            header="CWE"
            body={(rowData) =>
              rowData.cwe !== "N/A" ? (
                <a
                  className="text-blue-500 hover:underline"
                  href={`https://appsec.backslash.security/cwe/${
                    rowData.cwe.split("-")[1]
                  }`}
                  target="_blank"
                  rel="noopener noreferrer"
                >
                  {rowData.cwe}
                </a>
              ) : (
                <span className="text-gray-400">{rowData.cwe}</span>
              )
            }
          ></Column>
          <Column
            field="severity"
            header="Severity"
            body={(rowData) => <BadgeSeverity severity={rowData.severity} />}
          ></Column>
          <Column
            field="actions"
            header="Actions"
            body={(rowData) => <ButtonVulnDetails vuln={rowData} />}
          ></Column>
        </DataTable>
      </div>
    </>
  )
}

export default TableVulns
