import { Dayjs } from 'dayjs';

export const getbyDay = (sDate: Dayjs, eDate: Dayjs) => {
	return {
		pipeline: [
			{
				$match: {
					$expr: {
						$and: [
							{
								$gte: [
									'$createdAt',
									{
										$dateFromString: {
											dateString: sDate.toISOString(),
										},
									},
								],
							},
							{
								$lte: [
									'$createdAt',
									{
										$dateFromString: {
											dateString: eDate.toISOString(),
										},
									},
								],
							},
						],
					},
				},
			},
			{
				$group: {
					_id: {
						$dateToString: {
							format: '%Y-%m-%d',
							date: '$createdAt',
						},
					},
					totalAmount: { $sum: '$amount' },
					count: { $sum: 1 },
					paymentMethodCount: { $push: '$paymentMethod' },
				},
			},
			// {
			// 	$group: {
			// 		_id: '$_id.paymentMethod',
			// 		count: { $sum: 1 },
			// 		totalAmount: 1,
			// 	},
			// },

			{
				$project: {
					_id: 0,
					date: '$_id',
					totalAmount: 1,
					count: 1,
					paymentMethod: 1,
				},
			},
			{
				$sort: {
					date: 1,
				},
			},
		],
	};
};

export const getByHour = (sDate: Dayjs, eDate: Dayjs) => {
	return {
		pipeline: [
			{
				$match: {
					$expr: {
						$and: [
							{
								$gte: [
									'$createdAt',
									{
										$dateFromString: {
											dateString: sDate.toISOString(),
										},
									},
								],
							},
							{
								$lte: [
									'$createdAt',
									{
										$dateFromString: {
											dateString: eDate.toISOString(),
										},
									},
								],
							},
						],
					},
				},
			},
			{
				$facet: {
					data: [
						{
							$group: {
								_id: {
									$hour: '$createdAt',
								},
								totalAmount: {
									$sum: '$amount',
								},
								count: {
									$sum: 1,
								},
							},
						},
						{
							$project: {
								_id: 0,
								date: '$_id',
								totalAmount: 1,
								count: 1,
							},
						},
					],
				},
			},
			{
				$addFields: {
					dates: {
						$map: {
							input: {
								$range: [0, 24],
							},
							// maybe more dynamic with $dateDiff -> { $dateDiff: { startDate: new Date("2022-10-19"), endDate: new Date("2022-10-26") }, unit: "day" } }
							in: {
								date: {
									$hour: {
										$dateAdd: {
											startDate: {
												$dateFromString: {
													dateString: sDate.toISOString(),
												},
											},
											unit: 'hour',
											amount: '$$this',
										},
									},
								},
							},
						},
					},
				},
			},
			{
				$project: {
					data: {
						$concatArrays: ['$data', '$dates'],
					},
				},
			},
			{
				$unwind: '$data',
			},
			{
				$group: {
					_id: '$data.date',
					metadata: {
						$first: '$data',
					},
				},
			},
			{
				$project: {
					_id: 0,
					date: '$_id',
					type: 'hours',
					totalAmount: '$metadata.totalAmount',
					count: '$metadata.count',
				},
			},
			{
				$unset: 'metadata.date',
			},
			{
				$sort: {
					date: 1,
				},
			},
		],
	};
};
