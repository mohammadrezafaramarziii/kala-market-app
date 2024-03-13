import http from "./httpService";

export function getCoupons() {
  return http.get(`/admin/coupon/list`).then(({ data }) => data.data);
}

export function getCouponById(couponId) {
  return http.get(`/admin/coupon/${couponId}`).then(({ data }) => data.data);
}

export function addCoupon(data) {
  return http.post(`/admin/coupon/add`, data).then(({ data }) => data.data);
}

export function updateCoupon({ couponId, data }) {
  return http
    .patch(`/admin/coupon/update/${couponId}`, data)
    .then(({ data }) => data.data);
}

export function deleteCoupon(couponId) {
  return http
    .delete(`/admin/coupon/remove/${couponId}`)
    .then(({ data }) => data.data);
}
