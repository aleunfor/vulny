import { DocumentIcon } from "@heroicons/react/20/solid"

import type { IVulnerability } from "../services/vulnerability.service"

import { jsPDF } from "jspdf"
import { autoTable } from "jspdf-autotable"

type Props = {
  vulns: IVulnerability[]
  scanId: string
}

export default function ButtonVulnDetails({ vulns, scanId }: Props) {
  const downloadPdf = () => {
    let keys = [] as string[]

    if (vulns.length > 0) {
      keys = Object.keys(vulns[0])
    }

    const doc = new jsPDF({ orientation: "landscape" })
    autoTable(doc, { html: "#my-table" })

    // Or use javascript directly:
    autoTable(doc, {
      head: [keys.map((key) => key.toUpperCase())],
      body: vulns.map((vuln) => Object.values(vuln)),
    })

    doc.save(`${scanId}-vulnerabilties.pdf`)
  }

  return (
    <>
      <button
        onClick={downloadPdf}
        type="button"
        className="flex items-center text-white bg-blue-600 hover:bg-blue-800 transition focus:ring-2 focus:ring-blue-700 font-medium rounded-lg text-sm px-5 py-2.5 ml-2 focus:outline-none cursor-pointer"
      >
        Download
        <DocumentIcon className="inline-block w-4 h-4 ml-1" />
      </button>
    </>
  )
}
