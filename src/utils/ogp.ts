import { readFile } from "node:fs/promises";
import { join } from "node:path";
import { fileURLToPath } from "node:url";
import satori from "satori";
import sharp from "sharp";

export async function generateOgImage(
	color: string,
	title: string,
	tagName: string,
) {
	const tagSize = 40;

	const svg = await satori(
		{
			type: "div",
			props: {
				style: {
					display: "flex",
					justifyContent: "space-between",
					flexDirection: "column",
					padding: "30px",
					width: "100%",
					height: "100%",
					backgroundImage:
						"linear-gradient(to bottom right, #313244, #1e1e2e 60%)",
					fontFamily: 'ml, "NotoSansJP", sans-serif',
					fontWeight: "semibold",
				},
				children: [
					{
						type: "div",
						props: {
							style: {
								display: "flex",
								flexDirection: "column",
								justifyContent: "space-between",
								border: "6px dashed #9399b2",
								borderRadius: "6px",
								padding: "15px 20px",
								width: "100%",
								height: "100%",
							},
							children: [
								{
									type: "div",
									props: {
										style: {
											display: "flex",
											flexDirection: "column",
										},
										children: [
											{
												type: "div",
												props: {
													style: {
														display: "flex",
													},
													children: [
														{
															type: "div",
															props: {
																style: {
																	display: "flex",
																	color: "#94e2d5",
																	fontSize: tagSize,
																},
																children: "<",
															},
														},
														{
															type: "div",
															props: {
																style: {
																	display: "flex",
																	color: "#89b4fa",
																	fontSize: tagSize,
																	fontStyle: "italic",
																	fontFamily:
																		'ml italic, "NotoSansJP", sans-serif',
																},
																children: tagName,
															},
														},
														{
															type: "div",
															props: {
																style: {
																	display: "flex",
																	color: "#94e2d5",
																	fontSize: tagSize,
																},
																children: ">",
															},
														},
													],
												},
											},
											{
												type: "div",
												props: {
													style: {
														display: "flex",
														paddingLeft: 10,
														color,
														fontSize: 90,
														marginTop: 10,
													},
													children: title,
												},
											},
										],
									},
								},
								{
									type: "div",
									props: {
										style: {
											display: "flex",
											flexDirection: "column",
										},
										children: [
											{
												type: "div",
												props: {
													style: {
														display: "flex",
														flexDirection: "column",
														justifyContent: "flex-end",
														alignItems: "flex-end",
														gap: 5,
														paddingRight: 10,
													},
													children: [
														{
															type: "div",
															props: {
																style: {
																	display: "flex",
																	fontSize: 60,
																	textWrap: "wrap",
																},
																children: [
																	{
																		type: "div",
																		props: {
																			style: {
																				dispaly: "flex",
																				color: "#a6e3a1",
																			},
																			children: "kt",
																		},
																	},
																	{
																		type: "div",
																		props: {
																			style: {
																				dispaly: "flex",
																				color: "#f5c2e7",
																			},
																			children: "ym",
																		},
																	},
																	{
																		type: "div",
																		props: {
																			style: {
																				dispaly: "flex",
																				color: "#89b4fa",
																			},
																			children: "4",
																		},
																	},
																	{
																		type: "div",
																		props: {
																			style: {
																				dispaly: "flex",
																				color: "#fab387",
																			},
																			children: "a",
																		},
																	},
																],
															},
														},
													],
												},
											},
											{
												type: "div",
												props: {
													style: {
														display: "flex",
													},
													children: [
														{
															type: "div",
															props: {
																style: {
																	display: "flex",
																	color: "#94e2d5",
																	fontSize: tagSize,
																},
																children: "</",
															},
														},
														{
															type: "div",
															props: {
																style: {
																	display: "flex",
																	color: "#89b4fa",
																	fontSize: tagSize,
																	fontStyle: "italic",
																	fontFamily:
																		'ml italic, "NotoSansJP", sans-serif',
																},
																children: tagName,
															},
														},
														{
															type: "div",
															props: {
																style: {
																	display: "flex",
																	color: "#94e2d5",
																	fontSize: tagSize,
																},
																children: ">",
															},
														},
													],
												},
											},
										],
									},
								},
							],
						},
					},
				],
			},
		},
		{
			width: 700,
			height: 700,
			fonts: [
				{
					name: "ml",
					data: await readFile(
						join(
							fileURLToPath(import.meta.url),
							"../../fonts/MonoLisa-SemiBold.ttf",
						),
					),
				},
				{
					name: "ml italic",
					data: await readFile(
						join(
							fileURLToPath(import.meta.url),
							"../../fonts/MonoLisa-SemiBoldItalic.ttf",
						),
					),
				},
				{
					name: "NotoSansJP",
					data: await readFile(
						join(
							fileURLToPath(import.meta.url),
							"../../fonts/NotoSansJP SemiBold.ttf",
						),
					),
				},
			],
		},
	);
	const res = await sharp(Buffer.from(svg)).png().toBuffer();

	return res;
}
