export const formatPrice = (price: string | number) => {
  const isBig = price.toString().split('.')[0].length >= 4 
  return Number(price).toLocaleString(undefined, {
    minimumFractionDigits: 2,
    maximumFractionDigits: isBig ? 2 : 6,
  });
}

export const formatTime = (closeTime?: number) =>
  closeTime
    ? new Date(closeTime).toLocaleTimeString(undefined, {
      hour: "2-digit",
      minute: "2-digit",
    })
    : "Not available";
