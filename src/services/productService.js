import http from "./httpService";

export function getProducts(qs, cookies){
    return  http.get(`/product/list?${qs}`, {
        headers:{
            Cookie:cookies
        } 
    }).then(({data}) => data.data)
}

export function getProductBySlug(slug){
    return  http.get(`/product/slug/${slug}`).then(({data}) => data.data)
}

export function getProductById(id){
    return  http.get(`/product/${id}`).then(({data}) => data.data)
}

export function likeProduct(productId){
    return  http.post(`/product/like/${productId}`).then(({data}) => data.data)
}


// admin relate function
export function addProduct(data){
    return  http.post(`/admin/product/add`, data).then(({data}) => data.data)
}

export function updateProduct({id, data}){
    return  http.patch(`/admin/product/update/${id}`, data).then(({data}) => data.data)
}

export function deleteProduct(id){
    return  http.delete(`/admin/product/remove/${id}`).then(({data}) => data.data)
}
