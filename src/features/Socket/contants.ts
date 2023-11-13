export enum NotificationType {
    ORDER_SHOP = 1, // trạng thái đơn hàng
    NEW_ORDER = 2, // có đơn hàng mới
    ORDER_INPROGRESS = 3, // xác nhận đơn hàng
    ORDER_COMPLETED = 4, // hoàn thành đơn hàng
    ORDER_CANCEL = 5, // hủy đơn hàng
    NEW_KIOTVIET_SYNC = 6, // đồng bộ gian hàng mới
    KIOTVIET_ACTIVE = 7, // active gian hàng
    KIOTVIET_SYNC_SUCCESS = 8, // đồng bộ gian hàng thành công
    KIOTIVET_SYNC_FAILURE = 9, // đồng bộ gian hàng thất bại
    OVERDUE_DEBT_PAYMENT = 10, // quá hạn thanh toán công nợ
    NEWS = 11, // bài viết mới
    ORDER_COMPLETION_ADD_POINT = 12, // cộng điểm hoàn thành đơn hàng
    ORDER_PAYMENT_SUBTRACT_POINT = 13, // trừ điểm thanh toán đơn hàng
    VOUCHER_EXPIRED = 14, // voucher hết hạn
    VOUCHER_OUT_OF_STOCK = 15, // voucher hết số lượng sử dụng
    ALL = 16, // thông báo tất cả
}

export const ORDER_TYPE = [1, 2, 3, 4, 5];
export const VOUCHER_TYPE = [14, 15];
export const SYNC = [6, 8, 9];
export const DEBT_PAYMENT = [10];
