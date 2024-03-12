import http from "./httpService";

export function getCategories(){
    return  http.get("/category/list").then(({data}) => data.data)
}


// admin related function
export function addCategory(data){
    return  http.post("/admin/category/add", data).then(({data}) => data.data)
}

export function getCategoryById(categoryId){
    return  http.get(`/category/${categoryId}`).then(({data}) => data.data)
}

export function updateCategory({categoryId, data}){
    return  http.patch(`/admin/category/update/${categoryId}`, data).then(({data}) => data.data)
}

export function deleteCategory(categoryId){
    return  http.delete(`/admin/category/remove/${categoryId}`).then(({data}) => data.data)
}