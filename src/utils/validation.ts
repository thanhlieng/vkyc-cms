import { Rule } from 'antd/lib/form';

const REG_PHONE = /((^(\+84|84|0|0084){1})(3|5|7|8|9))+([0-9]{8})$/;
const MOBI = /((^(\+84|84|0|0084){1})(3)(2|3|4|5|6|7|8|9))+([0-9]{7})$/;
const VINA = /((^(\+84|84|0|0084){1})(8)(2|3|4|5|6|8|9))+([0-9]{7})$/;
const VIETTEL = /((^(\+84|84|0|0084){1})(9)(3|4|1|6|7|8|9|0))+([0-9]{7})$/;
const SEVEN = /((^(\+84|84|0|0084){1})(7)(0|6|7|8|9))+([0-9]{7})$/;
const FIVE = /((^(\+84|84|0|0084){1})(5)(9))+([0-9]{7})$/;

export const errorValidPhone = () => ({
    validator(_: Rule, value: number) {
        if (!value?.toString()?.trim()) return Promise.resolve();
        if (
            (!value?.toString()?.match(SEVEN) &&
                !value?.toString()?.match(MOBI) &&
                !value?.toString()?.match(VIETTEL) &&
                !value?.toString()?.match(VINA) &&
                !value?.toString()?.match(FIVE)) ||
            isNaN(Number(value))
        ) {
            return Promise.reject(new Error('Vui lòng nhập đúng định dạng số điện thoại!'));
        }
        return Promise.resolve();
    },
});
export const errorConfirmPassword = ({ getFieldValue }: any) => ({
    validator(_: Rule, value: string) {
        if (!value) return Promise.resolve();
        if (!value || getFieldValue('password') === value) {
            return Promise.resolve();
        }
        return Promise.reject(new Error('Mật khẩu nhập lại chưa trùng khớp!'));
    },
});
export const errorWhiteSpace = () => ({
    validator(_: Rule, value: string) {
        if (!value) return Promise.resolve();
        if (value.startsWith(' ') || value.endsWith(' ')) {
            return Promise.reject(new Error('Không được bắt đầu hoặc kết thúc bằng khoảng trắng!'));
        }
        return Promise.resolve();
    },
});
