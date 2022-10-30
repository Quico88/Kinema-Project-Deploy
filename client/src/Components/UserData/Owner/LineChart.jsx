import { Bar, Line } from "react-chartjs-2"
import { useState } from "react"
import { Chart /* as ChartJS  */} from "chart.js/auto"
import { Flex } from "@chakra-ui/react"



  export default function LineChart({data, tableName}){



		const userData = {
			labels: ["Agosto", "September", "October", "November"],

			datasets: [
				{
					label: [tableName],
					data: [0, 0, data, 0],
					borderColor: 'rgb(75, 192, 192)',
					fill: false,
					tension: 0.2,
					responsive: true,
					
				}
			]
		}


	return (
			<Flex width={"600px"} backgroundColor="var(--chakra-colors-gray-300)" borderRadius="10px">
				<Line data={userData} />
			</Flex>
	)
		
			
  }