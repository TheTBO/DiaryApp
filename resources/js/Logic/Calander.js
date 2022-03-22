export function getLocale() {
    if (navigator.languages) return navigator.languages[0];
    return navigator.language;
}

export function getTime(time) {
    if (typeof time === "string" && time !== "") {
        time = time.match(".[0-9]:.[0-9]");
        if (time && time.length) {
            return time[0];
        }
    }
}

export function parseTime(datetime) {
    return new Date(datetime).toLocaleTimeString(getLocale(), {
        hour: "2-digit",
        minute: "2-digit",
    });
}

export function getMonthString(day) {
    return new Date(day.year, day.month).toLocaleString("Default", {
        month: "long",
    });
}

export function dayToString(day) {
    if (typeof day !== "undefined")
        return `${day.day} ${getMonthString(day)} ${day.year}`;
}

export function getMonthDays(year, month) {
    return new Date(year, month + 1, 0).getDate();
}

export function getDayEvents(events, y, m, d) {
    return events.filter((event) => {
        let dt = new Date(event.date);
        return (
            dt.getFullYear() === y && dt.getMonth() === m && dt.getDate() === d
        );
    });
}

export function incDay({ day, month, year }) {
    let _day, _month, _year;

    const days = getMonthDays(year, month);

    if (days > day) {
        _day = day + 1;
        _month = month;
        _year = year;
    } else {
        _day = 1;
        const { month: nextMonth, year: nextYear } = increamentMonth({
            month,
            year,
        });
        _month = nextMonth;
        _year = nextYear;
    }
    return {
        day: _day,
        month: _month,
        year: _year,
    };
}

export function incMonth({ month, year }) {
    let _month, _year;
    if (11 > month) {
        _month = month + 1;
        _year = year;
    } else {
        _month = 0;
        _year = incYear(year);
    }
    return {
        month: _month,
        year: _year,
    };
}

export function incYear(year) {
    return year + 1;
}

export function decDay({ day, month, year }) {
    let _day, _month, _year;

    if (0 < day) {
        _day = day - 1;
        _month = month;
        _year = year;
    } else {
        _day = getMonthDays(year, month - 1);
        const { month: nextMonth, year: nextYear } = decreamentMonth({
            month,
            year,
        });
        _month = nextMonth;
        _year = nextYear;
    }
    return {
        day: _day,
        month: _month,
        year: _year,
    };
}

export function decMonth({ month, year }) {
    let _month, _year;
    if (0 < month) {
        _month = month - 1;
        _year = year;
    } else {
        _month = 11;
        _year = decYear(year);
    }
    return {
        month: _month,
        year: _year,
    };
}

export function decYear(year) {
    return year - 1;
}
