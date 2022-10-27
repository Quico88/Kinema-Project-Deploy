import { Bar, Line } from "react-chartjs-2"
import { useState } from "react"
import { Chart /* as ChartJS  */} from "chart.js/auto"

const userInfo = [
	{
		id: 1,
		year: 2016,
		userGain: 80000,
		userLost: 823
	},
	{
		id: 2,
		year: 2017,
		userGain: 45677,
		userLost: 345
	},
	{
		id: 3,
		year: 2018,
		userGain: 78888,
		userLost: 555
	},
	{
		id: 4,
		year: 2019,
		userGain: 93043,
		userLost: 650
	},
	{
		id: 5,
		year: 2020,
		userGain: 78888,
		userLost: 590
	},
]

  export default function TableSales({}){
		const [userData, setUserData] = useState({
			labels: userInfo.map(data => data.year),
			datasets: [
				{
					label: "Users Gained",
					data: userInfo.map(data => data.userGain),
					borderColor: 'rgb(75, 192, 192)',
					fill: false,
					tension: 0.2
				}
			]
		})


	return <Line data={userData} />
		
			
  }