export const formatDate = (dateString) => {
  if (!dateString) return "";

  const date = new Date(dateString);
  return date.toLocaleDateString("en-US", {
    year: "numeric",
    month: "long",
    day: "numeric",
  });
};

export const formatTime = (dateString) => {
  if (!dateString) return "";

  const date = new Date(dateString);
  return date.toLocaleTimeString("en-US", {
    hour: "2-digit",
    minute: "2-digit",
  });
};

export const formatDateTime = (dateString) => {
  if (!dateString) return "";

  return `${formatDate(dateString)} at ${formatTime(dateString)}`;
};

export const formatPhoneNumber = (phoneNumberString) => {
  if (!phoneNumberString) return "";

  const cleaned = ("" + phoneNumberString).replace(/\D/g, "");
  const match = cleaned.match(/^(\d{3})(\d{3})(\d{4})$/);

  if (match) {
    return "(" + match[1] + ") " + match[2] + "-" + match[3];
  }

  return phoneNumberString;
};

export const truncateText = (text, maxLength = 100) => {
  if (!text) return "";

  if (text.length <= maxLength) return text;

  return text.slice(0, maxLength) + "...";
};

export const formatPercentage = (value, decimalPlaces = 2) => {
  if (value === null || value === undefined) return "";

  return (value * 100).toFixed(decimalPlaces) + "%";
};

export const formatCurrency = (amount, currencyCode = "USD") => {
  if (amount === null || amount === undefined) return "";

  return new Intl.NumberFormat("en-US", {
    style: "currency",
    currency: currencyCode,
  }).format(amount);
};
