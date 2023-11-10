import { Rule } from 'antd/lib/form';

export const rules = {
    required: (message: string) => ({
        required: true,
        message: message,
    }),

    validateCode: () => ({
        validator(_: Rule, value: string) {
            if (!value) return Promise.resolve();
            if (value.startsWith(' ') || value.endsWith(' ')) {
                return Promise.reject(new Error('Không được bắt đầu hoặc kết thúc bằng khoảng trắng!'));
            }

            // min length 5
            if (value.length < 6) {
                return Promise.reject(new Error('Tối thiểu 6 ký tự!'));
            }

            // check white space
            if (/\s/.test(value)) {
                return Promise.reject(new Error('Không được có khoảng trắng!'));
            }

            // max length 56
            if (value.length > 56) {
                return Promise.reject(new Error('Tối đa 56 ký tự!'));
            }

            // exits vietnamese characters and special characters
            if (!/^[a-zA-Z0-9_ ]*$/.test(value)) {
                return Promise.reject(new Error('Không được có ký tự đặc biệt!'));
            }

            return Promise.resolve();
        },
    }),

    validateName: () => ({
        validator(_: Rule, value: string) {
            if (!value) return Promise.resolve();
            // if (value.startsWith(' ') || value.endsWith(' ')) {
            //     return Promise.reject(new Error('Không được bắt đầu hoặc kết thúc bằng khoảng trắng!'));
            // }
            // min length 5

            // max length 56
            if (value.length > 50) {
                return Promise.reject(new Error('Tối đa 50 ký tự!'));
            }
            if (value.trim() === '') {
                return Promise.reject(new Error('Vui lòng nhập họ tên!'));
            }
            if (value.length < 6) {
                return Promise.reject(new Error('Tối thiểu 6 ký tự!'));
            }
            return Promise.resolve();
        },
    }),

    validatePassword: () => ({
        validator(_: Rule, value: string) {
            if (!value) return Promise.resolve();
            if (value.startsWith(' ') || value.endsWith(' ')) {
                return Promise.reject(new Error('Không được bắt đầu hoặc kết thúc bằng khoảng trắng!'));
            }

            // min length 5
            if (value.length < 6) {
                return Promise.reject(new Error('Tối thiểu 6 ký tự!'));
            }

            // check white space
            if (/\s/.test(value)) {
                return Promise.reject(new Error('Không được có khoảng trắng!'));
            }

            // max length 56
            if (value.length > 56) {
                return Promise.reject(new Error('Tối đa 56 ký tự!'));
            }

            return Promise.resolve();
        },
    }),
};
