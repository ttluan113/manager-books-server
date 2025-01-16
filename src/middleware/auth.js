const { jwtDecode } = require('jwt-decode');
const modelUser = require('../Model/ModelUser');
const modelCart = require('../Model/ModalCart');

const auth = () => {
    return async (req, res, next) => {
        try {
            const token = req.cookies.Token;
            const decoded = jwtDecode(token);
            const user = await modelCart.findOne({ idUser: decoded.email });
            if (!user) {
                return res.status(403).json({ message: 'Vui lòng gửi yêu cầu cấp thẻ !!!' });
            }
            if (user.idthe === '') {
                return res.status(403).json({ message: 'Vui lòng gửi yêu cầu cấp thẻ !!!' });
            }
            next();
        } catch (error) {
            console.log(error);
        }
    };
};

module.exports = auth;
