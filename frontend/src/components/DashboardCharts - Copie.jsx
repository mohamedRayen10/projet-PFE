import { Line, Bar, Pie, Radar, Doughnut } from 'react-chartjs-2';
import { Chart as ChartJS, CategoryScale, LinearScale, PointElement, LineElement, BarElement, ArcElement, RadialLinearScale, Title, Tooltip, Legend } from 'chart.js';

ChartJS.register(CategoryScale, LinearScale, PointElement, LineElement, BarElement, ArcElement, RadialLinearScale, Title, Tooltip, Legend);

const DashboardCharts = () => {
  const bgColor = "bg-white dark:bg-gray-900 p-4 md:p-6 rounded-lg shadow-md";

  const userGrowthData = {
    labels: ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul'],
    datasets: [
      {
        label: 'User Growth',
        data: [5, 7, 10, 6, 9, 4, 7],
        borderColor: 'rgba(255, 99, 132, 1)',
        backgroundColor: 'rgba(255, 99, 132, 0.2)',
        tension: 0.3,
      },
    ],
  };

  const postActivityData = {
    labels: ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul'],
    datasets: [
      {
        label: 'Posts per Month',
        data: [8, 5, 10, 9, 7, 6, 10],
        backgroundColor: 'rgba(54, 162, 235, 0.5)',
        borderColor: 'rgba(54, 162, 235, 1)',
        borderWidth: 1,
      },
    ],
  };

  const commentActivityData = {
    labels: ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul'],
    datasets: [
      {
        label: 'Comments per Month',
        data: [15, 20, 25, 30, 22, 28, 35],
        backgroundColor: 'rgba(153, 102, 255, 0.5)',
        borderColor: 'rgba(153, 102, 255, 1)',
        borderWidth: 1,
      },
    ],
  };

  const revenueData = {
    labels: ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul'],
    datasets: [
      {
        label: 'Revenue ($)',
        data: [500, 700, 800, 650, 900, 750, 870],
        backgroundColor: 'rgba(75, 192, 192, 0.5)',
        borderColor: 'rgba(75, 192, 192, 1)',
        borderWidth: 1,
      },
    ],
  };

  const paymentDoughnutData = {
    labels: ['Credit Card', 'PayPal', 'Crypto', 'Bank Transfer'],
    datasets: [
      {
        label: 'Payment Methods',
        data: [40, 30, 20, 10],
        backgroundColor: ['rgba(255, 99, 132, 0.6)', 'rgba(54, 162, 235, 0.6)', 'rgba(75, 192, 192, 0.6)', 'rgba(255, 159, 64, 0.6)'],
        borderColor: ['rgba(255, 99, 132, 1)', 'rgba(54, 162, 235, 1)', 'rgba(75, 192, 192, 1)', 'rgba(255, 159, 64, 1)'],
        borderWidth: 1,
      },
    ],
  };

  const userPieData = {
    labels: ['Admins', 'Users', 'Guests'],
    datasets: [
      {
        data: [20, 70, 10],
        backgroundColor: ['rgba(255, 0, 0, 0.6)', 'rgba(255, 159, 64, 0.6)', 'rgba(255, 99, 132, 0.6)'],
        borderColor: ['rgba(255, 0, 0, 1)', 'rgba(255, 159, 64, 1)', 'rgba(255, 99, 132, 1)'],
      },
    ],
  };

  return (
    <div>
  <h2 className="text-2xl font-bold text-center my-8 text-gray-100">📊 Statistiques Générales</h2>
  <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
    <div className={bgColor} style={{ maxWidth: '500px', maxHeight: '350px' }}>
      <h3 className="text-lg font-semibold mb-4 text-red-500">User Growth</h3>
      <Line data={userGrowthData} options={{ responsive: true, maintainAspectRatio: false }} height={250} />
    </div>
    <div className={bgColor} style={{ maxWidth: '500px', maxHeight: '350px' }}>
      <h3 className="text-lg font-semibold mb-4 text-red-500">Post Activity</h3>
      <Bar data={postActivityData} options={{ responsive: true, maintainAspectRatio: false }} height={250} />
    </div>
  </div>
  <div className="flex flex-col items-center justify-center min-h-screen">
  <h2 className="text-2xl font-bold text-center my-8 text-gray-100">💬 Activité des Commentaires</h2>
  <div className={bgColor} style={{ maxWidth: '500px', maxHeight: '350px', padding: '20px', borderRadius: '8px', backgroundColor: '#1A202C' }}>
    <h3 className="text-lg font-semibold mb-4 text-red-500 text-center">Comment Activity</h3>
    <div style={{ width: '100%', height: 'auto', padding: '10px' }}>
      <Bar data={commentActivityData} options={{ responsive: true, maintainAspectRatio: false }} height={250} />
    </div>
  </div>
</div>


  <h2 className="text-2xl font-bold text-center my-8 text-gray-100">💰 KPI & Paiements</h2>
  <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
    <div className={bgColor} style={{ maxWidth: '500px', maxHeight: '350px' }}>
      <h3 className="text-lg font-semibold mb-4 text-red-500">Monthly Revenue</h3>
      <Bar data={revenueData} options={{ responsive: true, maintainAspectRatio: false }} height={250} />
    </div>
    <div className={bgColor} style={{ maxWidth: '500px', padding: '20px', borderRadius: '8px', backgroundColor: '#1A202C' }}>
  <h3 className="text-lg font-semibold mb-4 text-red-500 text-center">Payment Methods</h3>
  <div style={{ width: '100%', height: 'auto', padding: '10px' }}>
    <Doughnut data={paymentDoughnutData} options={{ responsive: true, maintainAspectRatio: false }} height={250} />
  </div>
</div>

  </div>

  <div className="flex flex-col items-center justify-center min-h-screen">
  <h2 className="text-2xl font-bold text-center my-8 text-gray-100">🥧 Répartition des Utilisateurs</h2>
  <div className={bgColor} style={{ maxWidth: '500px', padding: '20px', borderRadius: '8px', backgroundColor: '#1A202C' }}>
    <h3 className="text-lg font-semibold mb-4 text-red-500 text-center">User Distribution</h3>
    <div style={{ width: '100%', height: 'auto', padding: '10px' }}>
      <Pie data={userPieData} options={{ responsive: true, maintainAspectRatio: false }} height={250} />
    </div>
  </div>
</div>


</div>



  );
};

export default DashboardCharts;