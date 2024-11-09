// HomeThirdSection.tsx
import HomeSections from "./HomeSections";

export default function HomeThirdSection() {
  const filterCriteria = {
    category: "",
    minPrice: null,
    maxPrice: null,
    location: "",
    dateRange: "",
  };

  return <HomeSections title="Tercera Sección" filterCriteria={filterCriteria} sectionId="HomeThirdSection" />;
}