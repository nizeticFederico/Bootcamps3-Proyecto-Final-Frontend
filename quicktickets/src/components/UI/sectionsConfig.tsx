const getCurrentMonthRange = () => {
  const now = new Date();
  const startDate = new Date(now.getFullYear(), now.getMonth(), 0); // Primer día del mes
  const endDate = new Date(now.getFullYear(), now.getMonth() + 1, 1); // Último día del mes
  return {
    startDate: startDate.toISOString().split("T")[0], // Formato 'YYYY-MM-DD'
    endDate: endDate.toISOString().split("T")[0],    // Formato 'YYYY-MM-DD'
  };
};

const { startDate, endDate } = getCurrentMonthRange();

const sectionsConfig = [
  {
    title: "This month's events",
    endpoint: "/event/range", // Endpoint para eventos por rango de fecha
    sectionId: "HomeFirstSection",
    params: {
      startDate, // Fecha inicial calculada automáticamente
      endDate,   // Fecha final calculada automáticamente
    },
  },
  {
    title: "Latest Events",
    endpoint: "/event/latest", // Endpoint para los últimos 10 eventos
    sectionId: "HomeSecondSection",
  },
  {
    title: "Free Events",
    endpoint: "/event/free", // Endpoint para eventos gratuitos
    sectionId: "HomeThirdSection",
  },
];

export default sectionsConfig;