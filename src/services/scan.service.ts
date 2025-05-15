import type { IVulnerability } from "./vulnerability.service"
import axios from "axios"

export interface IScan {
  _id: string
  userId: string
  typeScan: string
  createdAt: Date
  updatedAt: Date
  vulnerabilities: IVulnerability[]
}

const apiUrl = import.meta.env.VITE_API_URL

export class ScanService {
  static async executeScan(userId: string, target: string): Promise<any> {
    const data = {
      userId: "asdasd",
      target,
    }

    const response = await axios.post(`${apiUrl}/scans/execute`, data, {
      headers: {
        "Content-Type": "application/json",
      },
    })
    return response.data
  }
}
