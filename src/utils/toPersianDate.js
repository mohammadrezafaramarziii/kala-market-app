export function toPersianDate(date){
    const options = {
        year: "numeric",
        month: "long",
        day: "numeric",
    }

    return new Date(date).toLocaleDateString("fa-IR", options)
}