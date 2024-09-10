export async function fetchAppointmentData() {
  try {
    const response = await fetch('http://localhost:3001/appointments'); // Adjust the API endpoint as needed
    const result = await response.json();

    // Transform data into the required format
    return {
      labels: result.labels || [],
      datasets: result.datasets || [{
        label: "Appointments",
        fill: true,
        backgroundColor: 'rgba(29,140,248,0.2)',
        borderColor: '#1f8ef1',
        borderWidth: 2,
        data: result.data || [],
      }],
    };
  } catch (error) {
    console.error('Error fetching appointment data:', error);
    return {
      labels: [],
      datasets: [{
        label: "Error",
        fill: false,
        backgroundColor: 'rgba(255,0,0,0.2)',
        borderColor: 'rgba(255,0,0,1)',
        borderWidth: 2,
        data: [],
      }],
    };
  }
}