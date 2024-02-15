export function toPersianDigit(number){
    let numToString = String(number);
    let convertedNum = numToString.replace(/\d/g, d => '۰۱۲۳۴۵۶۷۸۹'[d]);

    return convertedNum;
}