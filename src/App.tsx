import DescriptionApp from "./components/DescriptionApp"
import Header from "./components/Header"
import Scanner from "./components/Scanner"
import SectionContainer from "./components/SectionContainer"
import TableVulns from "./components/TableVulns"

function App() {
  return (
    <>
      <Header />

      <SectionContainer>
        <DescriptionApp />
        <Scanner />
      </SectionContainer>

      <SectionContainer>
        <TableVulns />
      </SectionContainer>
    </>
  )
}

export default App
