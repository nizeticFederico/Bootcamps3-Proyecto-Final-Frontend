// HomeSecondSection.tsx
import HomeSections from "./HomeSections";

export default function HomeSecondSection() {
  const filterCriteria = {
    category: "",
    minPrice: null,
    maxPrice: null,
    location: "",
    dateRange: "",
  };

  return <HomeSections title="Segunda Sección" filterCriteria={filterCriteria} sectionId="HomeSecondSection" />;
}