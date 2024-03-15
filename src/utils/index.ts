export const formatPostDate = (date: Date | undefined): string => {
	if (!date) return "";
	return new Intl.DateTimeFormat("ja-JP", {
		dateStyle: "medium",
		timeZone: "Asia/Tokyo",
	}).format(date);
};

// biome-ignore lint/suspicious/noExplicitAny: <explanation>
export const sortByDate = (collections: any[]): any[] => {
	return collections
		.sort((a, b) => {
			const aDate = new Date(a.data.publishedDate);
			const bDate = new Date(b.data.publishedDate);
			return aDate > bDate ? -1 : 1;
		})
		.reverse();
};
