import BadgeSeverity from "./BadgeSeverity"

type Props = {}

export default function VulnDetails({}: Props) {
  return (
    <>
      <h2 className="text-xl mb-2 font-bold">Name <BadgeSeverity severity="low" /></h2>
      <h3 className="text-md mb-1 font-bold">Description</h3>
      <p className="mb-4">
        Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod
        tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim
        veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea
        commodo consequat.
      </p>
      <h3 className="text-md mb-1 font-bold">Mitigation</h3>
      <p>
        Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod
        tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim
        veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea
        commodo consequat.
      </p>
    </>
  )
}
