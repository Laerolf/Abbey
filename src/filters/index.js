import Vue from "vue";
export default {
  capitalize: Vue.filter("capitalize", function(value) {
    if (!value) return "";
    value = value.toString();
    return value.charAt(0).toUpperCase() + value.slice(1);
  }),
  percentize: Vue.filter("percentize", function(value) {
    if (!value) return "";
    value = Math.round(value * 100 * 100) / 100;
    return `${value}%`;
  }),
  pluralizeByQuantity: Vue.filter("pluralizeByQuantity", function(value, quantity) {
    if (!value) return "";
    if (quantity !== 1) {
      value += "s";
    }
    return value;
  }),
  zeroToNo: Vue.filter("zeroToNo", function(value) {
    if (value === 0 || !value) {
      value = "no";
    }
    return value;
  }),
  pluralizeBag: Vue.filter("pluralizeBag", function(value) {
    if (!value) return "";
    let valueParts = value.split(" ");
    if (valueParts[0].toLowerCase() === "bag") {
      valueParts[0] = valueParts[0] + "s";
      value = valueParts.join(" ");
    }
    return value;
  }),
  formatBeerDiscoveryDate: Vue.filter("formatBeerDiscoveryDate", function(value) {
    if (!value) return "";
    const monthsOfTheYear = [
      "January",
      "February",
      "March",
      "April",
      "May",
      "June",
      "July",
      "August",
      "September",
      "November",
      "December"
    ];
    return `${monthsOfTheYear[value.month - 1]} ${value.year}`;
  }),
  formatDateDayNameMonthYear: Vue.filter("formatDateDayNameMonthYear", function(value) {
    if (!value) return "";
    let date = new Date(value);
    const daysOfTheWeek = [
      "Sunday",
      "Monday",
      "Tuesday",
      "Wednesday",
      "Thursday",
      "Friday",
      "Saturday"
    ];
    const monthsOfTheYear = [
      "January",
      "February",
      "March",
      "April",
      "May",
      "June",
      "July",
      "August",
      "September",
      "October",
      "November",
      "December"
    ];
    let dateParts = {
      dayNumber: date.getDay(),
      date: date.getDate(),
      monthNumber: date.getMonth(),
      yearNumber: date.getFullYear()
    };
    let dayNumberAbbreviation = "";
    switch (dateParts.date) {
      case 1:
        dayNumberAbbreviation = "st";
        break;
      case 2:
        dayNumberAbbreviation = "nd";
        break;
      default:
        dayNumberAbbreviation = "th";
        break;
    }
    return `${
      daysOfTheWeek[dateParts.dayNumber]
    }, ${dateParts.date + dayNumberAbbreviation} of ${monthsOfTheYear[dateParts.monthNumber]} ${dateParts.yearNumber}`;
  }),
  formatDateDayNameMonthYearWithTime: Vue.filter("formatDateDayNameMonthYearWithTime", function(
    value
  ) {
    if (!value) return "";
    let date = new Date(value);
    const daysOfTheWeek = [
      "Sunday",
      "Monday",
      "Tuesday",
      "Wednesday",
      "Thursday",
      "Friday",
      "Saturday"
    ];
    const monthsOfTheYear = [
      "January",
      "February",
      "March",
      "April",
      "May",
      "June",
      "July",
      "August",
      "September",
      "November",
      "December"
    ];
    let dateParts = {
      dayNumber: date.getDay(),
      date: date.getDate(),
      monthNumber: date.getMonth() + 1,
      yearNumber: date.getFullYear(),
      hours: date.getHours(),
      minutes: date.getMinutes()
    };
    let dayNumberAbbreviation = "";
    switch (dateParts.date) {
      case 1:
        dayNumberAbbreviation = "st";
        break;
      case 2:
        dayNumberAbbreviation = "nd";
        break;
      default:
        dayNumberAbbreviation = "th";
        break;
    }
    return `${daysOfTheWeek[dateParts.dayNumber]}, ${dateParts.date + dayNumberAbbreviation} of ${
      monthsOfTheYear[dateParts.monthNumber - 1]
    } ${dateParts.yearNumber} at
${dateParts.hours}:${dateParts.minutes}`;
  }),
  pluralizeBagByQuantity: Vue.filter("pluralizeBagByQuantity", function(value, quantity) {
    if (!value) return "";
    if (quantity > 1) {
      let valueParts = value.split(" ");
      if (valueParts[0].toLowerCase() === "bag") {
        valueParts[0] = valueParts[0] + "s";
        value = valueParts.join(" ");
      }
    }
    return value;
  })
};
