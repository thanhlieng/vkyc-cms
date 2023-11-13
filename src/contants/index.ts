import { PerformanceNodeTiming } from 'perf_hooks';

export const STATUS = {
    active: 1,
    unActive: 0,
};

export const REWARD = {
    gift: 1,
    discount: 2,
};

export const APPLICABLE_TYPE = {
    order: 1,
    product: 2,
};

export const CUSTOMER_TYPE = {
    AGENT: 1,
    DISTRIBUTORS: 2,
    ALL: 3,
};
export const ADMIN = {
    main: 'admin', // admin chính
    stall: 'shop_admin', // admin gian hàng
    news: 'news_admin', // admin tin tức
    accountant: 'accountant_admin', // kế toán
};
// export const ORDERSTATUS = {
//     completed: 'completed',
//     inprogress: 'inprogress',
//     cancelled: 'cancelled',
//     wait: 'wait_confirmation',
// };
export const PAYMENTSTATUS = {
    pending: 'pending',
};

export const PAYMENT_STATUS = {
    FAILED: 'failed',
    PENDING: 'pending',
    COMPLETED: 'completed',
};

export const ORDER_STATUS = {
    WAIT_CONFIRMATION: 'wait_confirmation',
    INPROGRESS: 'inprogress',
    COMPLETED: 'completed',
    CANCELLED: 'cancelled',
};

export enum WALLET_TYPE {
    ORDER_COMPLETE = 'order_completed',
    ORDER_REFUND_POINT = 'order_refund_point',
    ORDER_PAYMENT = 'order_payment',
}

export enum ORDER_STATE {
    ORDER_TIME = 'order_time',
    CONFIRM = 'confirm',
    COMPLETED = 'completed',
    CANCELLED = 'cancelled',
    USER_PAID = 'user_paid',
}

export const ROLE_TYPE = {
    admin: 'admin',
};

export enum NotificationType {
    ALL = 1, // thông báo tất cả.
    ORDER_SHOP = 2, // thông báo trạng thái đơn hàng.
    COMMENT_POST = 3, // thông báo có người bình luận bài viết.
    LIKE_POST = 4, // thông báo có người thích bài viết.
    SEND_COMMENT = 5, // thông báo shop trả lời bình luận
    LIKE_COMMENT = 6, // thông báo shop thích bình luận
    SHOP_CREATE_LIVESTREAM = 7, // thông báo shop tạo livestream
    REGISTER_USER = 8, // thông báo đăng kí tài khoản thành công được cộng điểm.
    PURCHASE_GIFT = 9, // thông báo có yêu cầu đổi quà web admin.
    CONFIRM_PURCHASE_GIFT = 10, // Thông báo trạng thái đổi quà của bạn.
    NEW_ORDER = 11, // Thông báo shop có đơn hàng cần duyệt.
    GIFT_EXCHANGE = 12, // Thông báo trừ điểm.
    NEWS_POST = 13, // Thông báo bài viết.
    REFERRAL_APP = 14, // Giới thiệu APP thành công.
    PROMOTION_POINT = 15, // Cộng điểm khi đặt hàng thành công.
    REFERRAL_CODE = 16, // Cộng điểm khi nhập mã thành công.
    NEW_MESSAGE = 17, // Có tin nhắn mới.
    ORDER_CANCEL = 18, // kHÁCH HÀNG HỦY ĐƠN HÀNG.
    REQUESTED_FLOWER_DELIVERY = 19,
    APROVE_FLOWER_DELIVERY = 20, // Chấp nhận điện hoa.
    REJECT_FLOWER_DELIVERY = 21, // Từ chối điện hoa.
    REJECT_PURCHASE_GIFT = 22, // Từ chối yêu cầu đổi quà
    SUBTRACT_POINT = 23, // Thông báo trừ điểm
    ADD_POINT = 24, // Cộng điểm
    NEW_REVIEW = 25, // Tạo review
    COIN = 26, // Nạp xu
    NEWS = 27, //Thông báo tin tức
}
