
export const headers = () => {
    return `Bearer ${localStorage.getItem("token")}`;
}