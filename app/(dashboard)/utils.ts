export const parseRevenueData = (chartData: any[], label: string, dataentry: string) => {
	return {
		labels: chartData?.map((data: any) => {
			let date = new Date(data.date);
			if (data.type == 'hours') {
				return data.date;
			}
			return new Intl.DateTimeFormat('en-US', { weekday: 'long' }).format(date);
		}),
		datasets: [
			{
				label: label,
				data: chartData?.map((data: any) => data[dataentry]),
			},
		],
	};
};
