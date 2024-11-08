// HomeSecondSection.tsx
import HomeSections from "./HomeSections";

export default function HomeSecondSection() {
  const filterCriteria = {
    category: "Teatro",
    minPrice: "",
    maxPrice: "",
    location: "",
    dateRange: "",
  };

  return <HomeSections title="Titulo de prueba 2" filterCriteria={filterCriteria} />;
}