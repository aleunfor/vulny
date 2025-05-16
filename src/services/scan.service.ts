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
  static async executeScan(
    userId: string,
    target: string,
    token: string
  ): Promise<any> {
    const data = {
      userId,
      target,
      token,
    }

    const response = await axios.post(`${apiUrl}/scans/execute`, data, {
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${token}`,
      },
    })
    return response.data
  }

  static async getLastScan(token: string): Promise<any> {
    const response = await axios.get(`${apiUrl}/scans/last`, {
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${token}`,
      },
    })
    return response.data
  }

  static async getUserScans(token: string): Promise<any> {
    const response = await axios.get(`${apiUrl}/scans/`, {
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${token}`,
      },
    })
    return response.data
  }
}
