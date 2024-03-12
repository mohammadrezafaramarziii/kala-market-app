import http from "./httpService";

export function createPayment(){
    return  http.post("/payment/create").then(({data}) => data.data)
}

// admin relate function
export function getPayments(){
    return  http.get("/admin/payment/list").then(({data}) => data.data)
}

export function getPaymentById(paymentId){
    return  http.get(`/admin/payment/${paymentId}`).then(({data}) => data.data)
}

