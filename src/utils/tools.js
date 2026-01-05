export const getTemperatureStatus = (temp) => {
    if (temp < 38) return { label: "Low", color: "info" };
    if (temp <= 39.5) return { label: "Normal", color: "success" };
    if (temp <= 40.5) return { label: "Slightly High", color: "warning" };
    return { label: "High Fever", color: "error" };
};