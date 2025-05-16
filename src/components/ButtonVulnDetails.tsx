import { useState } from "react"

import { MagnifyingGlassCircleIcon } from "@heroicons/react/20/solid"
import { Sidebar } from "primereact/sidebar"
import VulnDetails from "./VulnDetails"
import type { IVulnerability } from "../services/vulnerability.service"

type Props = {
  vuln: IVulnerability
}

export default function ButtonVulnDetails({ vuln }: Props) {
  const [modalVisible, setModalVisible] = useState(false)

  return (
    <>
      <div className="card flex justify-content-center">
        <Sidebar
          visible={modalVisible}
          position="right"
          onHide={() => setModalVisible(false)}
          className="min-w-120"
        >
          <VulnDetails vuln={vuln} />
        </Sidebar>
      </div>
      <button
        onClick={() => setModalVisible(true)}
        type="button"
        className="flex items-center text-white bg-blue-600 hover:bg-blue-800 focus:ring-2 focus:ring-blue-700 font-medium rounded-lg text-sm px-5 py-2.5 ml-2 focus:outline-none cursor-pointer"
      >
        Details
        <MagnifyingGlassCircleIcon className="inline-block w-4 h-4 ml-1" />
      </button>
    </>
  )
}
