import { useState, useEffect } from "react"
import { useAuth } from "@clerk/clerk-react"
import { DateTime } from "luxon"

import { DataTable } from "primereact/datatable"
import { Column } from "primereact/column"
import ButtonDownloadPdf from "./ButtonDownloadPdf"

import { ScanService } from "../services/scan.service"

type Props = {
  isSignedIn?: boolean
}

function Scans({ isSignedIn }: Props) {
  const [scans, setScans] = useState([])
  const [loading, setLoading] = useState(true)
  const { getToken } = useAuth()

  const getUserScans = async () => {
    if (isSignedIn) {
      setLoading(true)
      const token = await getToken()

      await ScanService.getUserScans(String(token)).then((response) => {
        try {
          const data = response
          setScans(data.scans)
        } catch (err: any) {
          console.log(err)
          setLoading(false)
        } finally {
          setLoading(false)
        }
      })
    }

    if (!isSignedIn) {
      setLoading(false)
    }
  }

  useEffect(() => {
    getUserScans()
  }, [isSignedIn])

  return (
    <>
      <div
        className={`${
          !isSignedIn ? "blur-xs pointer-events-none opacity-80" : ""
        } py-7 px-3 min-h-[500px] `}
      >
        <DataTable
          value={scans}
          loading={loading}
          paginator
          rows={10}
          className="bg-gray-500/5"
          tableStyle={{
            backgroundColor:
              "color-mix(in oklab, var(--color-gray-400) 5%, transparent)",
            minWidth: "50rem",
            minHeight: "30rem",
            borderRadius: "10px",
          }}
          emptyMessage={"Vulnerabilities not found"}
        >
          <Column field="_id" header="ID"></Column>
          <Column field="target" header="Target"></Column>
          <Column
            field="createdAt"
            header="Created At"
            body={(rowData) => (
              <>
                {DateTime.fromISO(rowData.createdAt).toLocaleString(
                  DateTime.DATETIME_MED
                )}
              </>
            )}
          ></Column>
          <Column
            field="actions"
            header="Actions"
            body={(rowData) => (
              <ButtonDownloadPdf
                vulns={rowData.vulns}
                scanId={rowData._id}
              />
            )}
          ></Column>
        </DataTable>
      </div>
    </>
  )
}

export default Scans
