import React from "react"
import ButtonScan from "./ButtonScan"
import { LinkIcon } from "@heroicons/react/20/solid"
type Props = {
  target: string
  isUrl: boolean
  loading: boolean
  touched: boolean
  focused: boolean
  onChange: (e: React.ChangeEvent<HTMLInputElement>) => void
  onFocus: () => void
  onBlur: () => void
  onScanClick: () => void
  error: boolean
}

export default function ScanForm({
  target,
  isUrl,
  loading,
  touched,
  focused,
  onChange,
  onFocus,
  onBlur,
  onScanClick,
  error,
}: Props) {
  return (
    <form className="max-w-xl mx-auto py-14">
      <label className="block mb-2 text-sm font-medium text-gray-900 ">
        Put your website URL here
      </label>
      <div className="flex flex-row">
        <span className="inline-flex items-center px-3 text-sm text-gray-900 bg-gray-200 border border-e-0 border-gray-300 rounded-s-md dark:bg-gray-600 dark:text-gray-400 dark:border-gray-600">
          <LinkIcon className="w-5 h-5" />
        </span>
        <input
          type="text"
          id="target"
          value={target}
          className={`${
            loading ? "cursor-not-allowed" : ""
          } rounded-none rounded-e-lg bg-gray-50 border border-gray-300 text-gray-900 focus:ring-blue-500 focus:border-blue-500 block flex-1 min-w-0 w-full text-sm p-2.5`}
          placeholder="https://google.com"
          onChange={onChange}
          onFocus={onFocus}
          onBlur={onBlur}
          disabled={loading}
          readOnly={loading}
        />
        <ButtonScan
          onScanClick={onScanClick}
          loading={loading}
          isValidUrl={isUrl}
        />
      </div>
      <div className="min-h-10">
        {target && !isUrl && touched && focused && (
          <p className={`mt-2 text-sm text-red-600`}>
            <span className="font-medium">Oops!</span> Put a valid URL.
          </p>
        )}
        {loading && (
          <p className={`mt-2 text-sm text-blue-600`}>
            <span className="font-medium">Executing Scan...</span> Please wait,
            take about 4 minutes..
          </p>
        )}

        {error && (
          <p className={`mt-2 text-sm text-red-600`}>
            <span className="font-medium">Error...</span> Failed to fetch
            target.
          </p>
        )}
      </div>
    </form>
  )
}
