export function formatTime(date,format = 'YYYY-MM-DD HH:mm:ss'){
	const config = {
	        YYYY: date.getFullYear(),
	        MM: date.getMonth() + 1 >= 10 ? date.getMonth() + 1 : '0' + (date.getMonth() + 1),
	        DD: date.getDate() >= 10 ? date.getDate() : '0' + date.getDate(),
	        HH: date.getHours() >= 10 ? date.getHours() : '0' + date.getHours(),
	        mm: date.getMinutes() >= 10 ? date.getMinutes() : '0' + date.getMinutes(),
	        ss: date.getSeconds() >= 10 ? date.getSeconds() : '0' + date.getSeconds(),
	    };
	    for (const key in config) {
	        format = format.replace(key, config[key]);
	    }
	    return format;
}