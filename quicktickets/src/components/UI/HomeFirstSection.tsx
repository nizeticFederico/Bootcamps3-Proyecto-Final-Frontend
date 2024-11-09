// HomeFirtsSection.tsx
import HomeSections from "./HomeSections";

export default function HomeFirtsSection() {
  const filterCriteria = {
    category: "",
    minPrice: null,
    maxPrice: null,
    location: "",
    dateRange: "",
  };

  return <HomeSections title="Primea Sección" filterCriteria={filterCriteria} sectionId="HomeFirtsSection" />;
}