import { Doughnut } from 'react-chartjs-2';

export default function DoughnutChart({ basicUsers, premiumUsers }) {
  const userData = {
    labels: [`Basic Users: ${basicUsers}%`, `Premium Users: ${premiumUsers}%`],
    datasets: [
      {
        label: 'My First Dataset',
        data: [basicUsers, premiumUsers],
        backgroundColor: ['rgb(255, 99, 132)', 'rgb(54, 162, 235)'],
        color: 'blue',
      },
    ],
  };

  return <Doughnut data={userData} />;
}
