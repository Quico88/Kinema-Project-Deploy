import { Bar } from "react-chartjs-2"
import { useState } from "react"
import { Chart /* as ChartJS  */} from "chart.js/auto"
import { Flex } from "@chakra-ui/react"



  export default function BarChart({data, tableName}){



		const userData = {
			labels: ["Agosto", "September", "October", "November"],

			datasets: [
				{
					label: [tableName],
					data: [0, 5, data, ],
					borderColor: 'rgba(54, 162, 235, 1)',
                    backgroundColor: ["rgba(75, 192, 192, .5)", "rgb(54, 162, 235)"],
					borderWidth: 2,
				}
			]
		}


        return (
                <Flex width={"600px"} backgroundColor="var(--chakra-colors-gray-300)" borderRadius="10px">
                    <Bar data={userData} />
                </Flex>
        )	
			
  }