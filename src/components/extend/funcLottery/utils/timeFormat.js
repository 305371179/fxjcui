export default
	(date) => {
		if (date.length == 14) {
			return date.substring(0, 4) + "-" + date.substring(4, 6) + "-" + date.substring(6, 8)
				+ " " + date.substring(8, 10) + ":" + date.substring(10, 12) + ":" + date.substring(12, 14);
		} else if (date.length > 14) {
			return date.substring(0, 4) + "-" + date.substring(4, 6) + "-" + date.substring(6, 8)
				+ " " + date.substring(8, 10) + ":" + date.substring(10, 12) + ":" + date.substring(12, 14)
				+ ":" + date.substring(14, date.length);
		}
		return date;
	}
