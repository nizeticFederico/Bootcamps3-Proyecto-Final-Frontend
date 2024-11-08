// HomeFirstSection.tsx
import HomeSections from "./HomeSections";

export default function HomeThirdSection() {
  const filterCriteria = {
    category: "Teatro",
    minPrice: "",
    maxPrice: "",
    location: "",
    dateRange: "",
  };

  return <HomeSections title="Titulo de prueba 3" filterCriteria={filterCriteria} />;
}