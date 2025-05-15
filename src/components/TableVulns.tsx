import { DataTable } from "primereact/datatable"
import { Column } from "primereact/column"
import BadgeSeverity from "./BadgeSeverity"
import ButtonVulnDetails from "./ButtonVulnDetails"

type Props = {
  vulns: any[]
  loading: boolean
}

function TableVulns({ vulns, loading }: Props) {
  return (
    <>
      <div className="py-7 px-3 min-h-[500px]">
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
          <Column field="cwe" header="CWE"></Column>
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
      </div>
    </>
  )
}

export default TableVulns
