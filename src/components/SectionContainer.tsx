type Props = {
  children?: React.ReactNode
}

export default function SectionContainer({ children }: Props) {
  return (
    <div className="max-w-screen-xl mx-auto px-4 my-4 bg-white rounded-xl">
      {children}
    </div>
  )
}
