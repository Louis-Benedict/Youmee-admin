export const errorReportTemplate = (
    userName: string,
    encounterLocation: string,
    description: string
) => {
    return `<!DOCTYPE html PUBLIC "-//W3C//DTD XHTML 1.0 Transitional//EN" "http://www.w3.org/TR/xhtml1/DTD/xhtml1-transitional.dtd">
<html lang="en">
	<head data-id="__react-email-head">
		<meta
			http-equiv="Content-Type"
			content="text/html; charset=UTF-8" />
	</head>
	<div
		id="__react-email-preview"
		style="
			display: none;
			overflow: hidden;
			line-height: 1px;
			opacity: 0;
			max-height: 0;
			max-width: 0;
		">
		Invitation to Youmee Team
		<div>
			 ‌​‍‎‏﻿ ‌​‍‎‏﻿ ‌​‍‎‏﻿ ‌​‍‎‏﻿ ‌​‍‎‏﻿ ‌​‍‎‏﻿ ‌​‍‎‏﻿ ‌​‍‎‏﻿ ‌​‍‎‏﻿ ‌​‍‎‏﻿ ‌​‍‎‏﻿ ‌​‍‎‏﻿ ‌​‍‎‏﻿ ‌​‍‎‏﻿ ‌​‍‎‏﻿ ‌​‍‎‏﻿ ‌​‍‎‏﻿ ‌​‍‎‏﻿ ‌​‍‎‏﻿ ‌​‍‎‏﻿ ‌​‍‎‏﻿ ‌​‍‎‏﻿ ‌​‍‎‏﻿ ‌​‍‎‏﻿ ‌​‍‎‏﻿ ‌​‍‎‏﻿ ‌​‍‎‏﻿ ‌​‍‎‏﻿ ‌​‍‎‏﻿ ‌​‍‎‏﻿ ‌​‍‎‏﻿ ‌​‍‎‏﻿ ‌​‍‎‏﻿ ‌​‍‎‏﻿ ‌​‍‎‏﻿ ‌​‍‎‏﻿ ‌​‍‎‏﻿ ‌​‍‎‏﻿ ‌​‍‎‏﻿ ‌​‍‎‏﻿ ‌​‍‎‏﻿ ‌​‍‎‏﻿ ‌​‍‎‏﻿ ‌​‍‎‏﻿ ‌​‍‎‏﻿ ‌​‍‎‏﻿ ‌​‍‎‏﻿ ‌​‍‎‏﻿ ‌​‍‎‏﻿ ‌​‍‎‏﻿ ‌​‍‎‏﻿ ‌​‍‎‏﻿ ‌​‍‎‏﻿ ‌​‍‎‏﻿ ‌​‍‎‏﻿ ‌​‍‎‏﻿ ‌​‍‎‏﻿ ‌​‍‎‏﻿ ‌​‍‎‏﻿ ‌​‍‎‏﻿ ‌​‍‎‏﻿ ‌​‍‎‏﻿ ‌​‍‎‏﻿ ‌​‍‎‏﻿ ‌​‍‎‏﻿ ‌​‍‎‏﻿ ‌​‍‎‏﻿ ‌​‍‎‏﻿ ‌​‍‎‏﻿ ‌​‍‎‏﻿ ‌​‍‎‏﻿ ‌​‍‎‏﻿ ‌​‍‎‏﻿ ‌​‍‎‏﻿ ‌​‍‎‏﻿ ‌​‍‎‏﻿ ‌​‍‎‏﻿ ‌​‍‎‏﻿ ‌​‍‎‏﻿ ‌​‍‎‏﻿ ‌​‍‎‏﻿ ‌​‍‎‏﻿ ‌​‍‎‏﻿ ‌​‍‎‏﻿ ‌​‍‎‏﻿ ‌​‍‎‏﻿ ‌​‍‎‏﻿ ‌​‍‎‏﻿ ‌​‍‎‏﻿ ‌​‍‎‏﻿ ‌​‍‎‏﻿ ‌​‍‎‏﻿ ‌​‍‎‏﻿ ‌​‍‎‏﻿ ‌​‍‎‏﻿ ‌​‍‎‏﻿ ‌​‍‎‏﻿ ‌​‍‎‏﻿ ‌​‍‎‏﻿ ‌​‍‎‏﻿ ‌​‍‎‏﻿ ‌​‍‎‏﻿ ‌​‍‎‏﻿ ‌​‍‎‏﻿ ‌​‍‎‏﻿ ‌​‍‎‏﻿ ‌​‍‎‏﻿ ‌​‍‎‏﻿ ‌​‍‎‏﻿ ‌​‍‎‏﻿ ‌​‍‎‏﻿ ‌​‍‎‏﻿ ‌​‍‎‏﻿ ‌​‍‎‏﻿ ‌​‍‎‏﻿ ‌​‍‎‏﻿ ‌​‍‎‏﻿
		</div>
	</div>
	<body
		data-id="__react-email-body"
		style="
			background-color: rgb(255, 255, 255);
			margin-top: auto;
			margin-bottom: auto;
			margin-left: auto;
			margin-right: auto;
			font-family: ui-sans-serif, system-ui, -apple-system, BlinkMacSystemFont,
				Segoe UI, Roboto, Helvetica Neue, Arial, Noto Sans, sans-serif,
				Apple Color Emoji, Segoe UI Emoji, Segoe UI Symbol, Noto Color Emoji;
		">
		<table
			align="center"
			width="100%"
			data-id="__react-email-container"
			role="presentation"
			cellspacing="0"
			cellpadding="0"
			border="0"
			style="
				max-width: 37.5em;
				border-width: 1px;
				border-style: solid;
				border-color: rgb(234, 234, 234);
				border-radius: 0.5rem;
				margin-top: 40px;
				margin-bottom: 40px;
				margin-left: auto;
				margin-right: auto;
				padding: 30px;
				width: 465px;
			">
			<tbody>
				<tr style="width: 100%">
					<td>
						<table
							align="center"
							width="100%"
							data-id="react-email-section"
							border="0"
							cellpadding="0"
							cellspacing="0"
							role="presentation"
							style="margin-top: 10px; margin-bottom: 40px">
							<tbody>
								<tr>
									<td>
										<img
											data-id="react-email-img"
											alt="Youmee"
											src="https://d1ljz7er88cmtt.cloudfront.net/static/youmee_logo_font.png"
											width="70"
											height="80"
											style="
												display: block;
												outline: none;
												border: none;
												text-decoration: none;
												margin-top: 0px;
												margin-bottom: 0px;
												margin-left: auto;
												margin-right: auto;
											" />
									</td>
								</tr>
							</tbody>
						</table>
						<hr
							data-id="react-email-hr"
							style="
								width: 100%;
								border: none;
								border-top: 1px solid #eaeaea;
							" />
						<table
							align="center"
							width="100%"
							data-id="react-email-section"
							border="0"
							cellpadding="0"
							cellspacing="0"
							role="presentation">
							<tbody>
								<tr>
									<td>
										<h1
											data-id="react-email-heading"
											style="
												color: rgb(0, 0, 0);
												font-size: 24px;
												font-weight: 700;
												text-align: center;
												padding: 0px;
												margin-top: 30px;
												margin-bottom: 30px;
												margin-left: 0px;
												margin-right: 0px;
											">
											Invitation to Youmee Team
										</h1>
										<p
											data-id="react-email-text"
											style="
												font-size: 14px;
												line-height: 20px;
												margin: 16px 0;
												color: rgb(0, 0, 0);
											">
											A new error report from ${userName},
										</p>
									
										<p
											data-id="react-email-text"
											style="
												font-size: 14px;
												line-height: 20px;
												margin: 16px 0;
												color: rgb(0, 0, 0);
											">
											The error occurred at: ${encounterLocation}. <br/>
                                            Description: ${description}
											<a
												href="mailto:support@youmee.info"
												data-id="react-email-link"
												target="_blank"
												style="color: rgb(64, 64, 64); text-decoration: none"
												>support@youmee.info</a
											>.<br /><br />Regards,<br />
											Your Youmee Team
										</p>
									</td>
								</tr>
							</tbody>
						</table>
						<hr
							data-id="react-email-hr"
							style="
								width: 100%;
								border: none;
								border-top: 1px solid #eaeaea;
								border-width: 1px;
								border-style: solid;
								border-color: rgb(234, 234, 234);
								margin-left: 0px;
								margin-right: 0px;
							" />
						<table
							align="center"
							width="100%"
							data-id="react-email-section"
							border="0"
							cellpadding="0"
							cellspacing="0"
							role="presentation">
							<tbody>
								<tr>
									<td>
										<p
											data-id="react-email-text"
											style="
												font-size: 10px;
												line-height: 18px;
												margin: 16px 0;
												color: rgb(102, 102, 102);
											">
											You&#x27;re receiving this message as a user of Youmee. If
											you prefer to not receive these messages anymore, feel
											free to unsubscribe. If you have any questions, don&#x27;t
											hesitate to contact us at
											<a
												href="mailto:support@youmee.info"
												data-id="react-email-link"
												target="_blank"
												style="color: rgb(64, 64, 64); text-decoration: none"
												>support@youmee.info</a
											>.
										</p>
										<table
											align="center"
											width="100%"
											data-id="react-email-row"
											role="presentation"
											cellspacing="0"
											cellpadding="0"
											border="0">
											<tbody style="width: 100%">
												<tr style="width: 100%">
													<td
														align="left"
														data-id="__react-email-column">
														<p
															data-id="react-email-text"
															style="
																font-size: 10px;
																line-height: 18px;
																margin: 16px 0;
																color: rgb(102, 102, 102);
															">
															Youmee Enterprises, LTD<br />Bangkok, Thailand
														</p>
													</td>
													<td
														align="right"
														data-id="__react-email-column">
														<a
															href="https://facebook.com/youmee.th"
															data-id="react-email-link"
															target="_blank"
															style="color: #067df7; text-decoration: none"
															><svg
																stroke="currentColor"
																fill="currentColor"
																stroke-width="0"
																viewBox="0 0 512 512"
																height="24"
																width="24"
																xmlns="http://www.w3.org/2000/svg"
																style="
																	margin-left: 0.25rem;
																	margin-right: 0.25rem;
																	color: rgb(0, 0, 0);
																">
																<path
																	d="M504 256C504 119 393 8 256 8S8 119 8 256c0 123.78 90.69 226.38 209.25 245V327.69h-63V256h63v-54.64c0-62.15 37-96.48 93.67-96.48 27.14 0 55.52 4.84 55.52 4.84v61h-31.28c-30.8 0-40.41 19.12-40.41 38.73V256h68.78l-11 71.69h-57.78V501C413.31 482.38 504 379.78 504 256z"></path></svg></a
														><a
															href="https://instagram.com/youmee_th?utm_source=qr&amp;igshid=MThlNWY1MzQwNA=="
															data-id="react-email-link"
															target="_blank"
															style="color: #067df7; text-decoration: none"
															><svg
																stroke="currentColor"
																fill="currentColor"
																stroke-width="0"
																viewBox="0 0 448 512"
																height="24"
																width="24"
																xmlns="http://www.w3.org/2000/svg"
																style="
																	margin-left: 0.25rem;
																	margin-right: 0.25rem;
																	color: rgb(0, 0, 0);
																">
																<path
																	d="M224.1 141c-63.6 0-114.9 51.3-114.9 114.9s51.3 114.9 114.9 114.9S339 319.5 339 255.9 287.7 141 224.1 141zm0 189.6c-41.1 0-74.7-33.5-74.7-74.7s33.5-74.7 74.7-74.7 74.7 33.5 74.7 74.7-33.6 74.7-74.7 74.7zm146.4-194.3c0 14.9-12 26.8-26.8 26.8-14.9 0-26.8-12-26.8-26.8s12-26.8 26.8-26.8 26.8 12 26.8 26.8zm76.1 27.2c-1.7-35.9-9.9-67.7-36.2-93.9-26.2-26.2-58-34.4-93.9-36.2-37-2.1-147.9-2.1-184.9 0-35.8 1.7-67.6 9.9-93.9 36.1s-34.4 58-36.2 93.9c-2.1 37-2.1 147.9 0 184.9 1.7 35.9 9.9 67.7 36.2 93.9s58 34.4 93.9 36.2c37 2.1 147.9 2.1 184.9 0 35.9-1.7 67.7-9.9 93.9-36.2 26.2-26.2 34.4-58 36.2-93.9 2.1-37 2.1-147.8 0-184.8zM398.8 388c-7.8 19.6-22.9 34.7-42.6 42.6-29.5 11.7-99.5 9-132.1 9s-102.7 2.6-132.1-9c-19.6-7.8-34.7-22.9-42.6-42.6-11.7-29.5-9-99.5-9-132.1s-2.6-102.7 9-132.1c7.8-19.6 22.9-34.7 42.6-42.6 29.5-11.7 99.5-9 132.1-9s102.7-2.6 132.1 9c19.6 7.8 34.7 22.9 42.6 42.6 11.7 29.5 9 99.5 9 132.1s2.7 102.7-9 132.1z"></path></svg></a
														><a
															href="https://tiktok.com/@youmee.th"
															data-id="react-email-link"
															target="_blank"
															style="color: #067df7; text-decoration: none"
															><svg
																stroke="currentColor"
																fill="currentColor"
																stroke-width="0"
																viewBox="0 0 448 512"
																height="24"
																width="24"
																xmlns="http://www.w3.org/2000/svg"
																style="
																	margin-left: 0.25rem;
																	margin-right: 0.25rem;
																	color: rgb(0, 0, 0);
																">
																<path
																	d="M448,209.91a210.06,210.06,0,0,1-122.77-39.25V349.38A162.55,162.55,0,1,1,185,188.31V278.2a74.62,74.62,0,1,0,52.23,71.18V0l88,0a121.18,121.18,0,0,0,1.86,22.17h0A122.18,122.18,0,0,0,381,102.39a121.43,121.43,0,0,0,67,20.14Z"></path></svg></a
														><a
															href="https://youtube.com/channel/UCoL1aAJreCUmHg0vdibxYLQ"
															data-id="react-email-link"
															target="_blank"
															style="color: #067df7; text-decoration: none"
															><svg
																stroke="currentColor"
																fill="currentColor"
																stroke-width="0"
																viewBox="0 0 576 512"
																height="24"
																width="24"
																xmlns="http://www.w3.org/2000/svg"
																style="
																	margin-left: 0.25rem;
																	margin-right: 0.25rem;
																	color: rgb(0, 0, 0);
																">
																<path
																	d="M549.655 124.083c-6.281-23.65-24.787-42.276-48.284-48.597C458.781 64 288 64 288 64S117.22 64 74.629 75.486c-23.497 6.322-42.003 24.947-48.284 48.597-11.412 42.867-11.412 132.305-11.412 132.305s0 89.438 11.412 132.305c6.281 23.65 24.787 41.5 48.284 47.821C117.22 448 288 448 288 448s170.78 0 213.371-11.486c23.497-6.321 42.003-24.171 48.284-47.821 11.412-42.867 11.412-132.305 11.412-132.305s0-89.438-11.412-132.305zm-317.51 213.508V175.185l142.739 81.205-142.739 81.201z"></path></svg
														></a>
													</td>
												</tr>
											</tbody>
										</table>
									</td>
								</tr>
							</tbody>
						</table>
					</td>
				</tr>
			</tbody>
		</table>
	</body>
</html>
`
}
