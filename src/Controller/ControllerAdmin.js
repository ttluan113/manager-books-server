const ModelUser = require('../Model/ModelUser');
const ModelCart = require('../Model/ModalCart');
const ModelHandleBook = require('../Model/ModelHandleBook');

class ControllerAdmin {
    GetUser(req, res) {
        ModelUser.find({}).then((dataUser) => res.status(200).json(dataUser));
    }
    async EditUser(req, res) {
        ModelUser.findOne({ _id: req.body.id }).then((dataUser) => {
            if (dataUser) {
                dataUser
                    .updateOne({
                        name: req.body.username || dataUser.name,
                        address: req.body.address || dataUser.address,
                        birthday: req.body.birthday || dataUser.birthday,
                        email: req.body.email || dataUser.email,
                    })
                    .then((data) => res.status(200).json({ message: 'Cập Nhật Thành Công', data }));
            } else {
                return;
            }
        });
    }
    async DeleteUser(req, res) {
        ModelUser.deleteOne({ _id: req.body.id }).then((data) =>
            res.status(200).json({ message: 'Xóa Người Dùng Thành Công ', data }),
        );
    }
    async EditCart(req, res) {
        ModelCart.findOne({ _id: req.body.id }).then((dataCart) => {
            if (dataCart) {
                dataCart
                    .updateOne({
                        idthe: req.body.idthe || dataCart.idthe,
                        masinhvien: req.body.maSinhVien || dataCart.masinhvien,
                        ngaycap: req.body.ngaycap || dataCart.ngaycap,
                        ngayhethan: req.body.ngayhethan || dataCart.ngayhethan,
                        tinhtrang: true,
                    })
                    .then((data) => res.status(200).json({ message: 'Cập Nhật Thành Công', data }));
            } else {
                return res.status(403).json({ message: 'error' });
            }
        });
    }
    async GetAllCart(req, res) {
        ModelHandleBook.find({}).then((data) => res.status(200).json(data));
    }
    async EditGetAllCart(req, res) {
        ModelHandleBook.findOne({ _id: req.body.id }).then((data) => {
            if (data) {
                data.updateOne({ tinhtrang: true }).then((data) => res.status(200).json(data));
            }
        });
    }
    async ThuThe(req, res) {
        ModelCart.deleteOne({ _id: req.body.id }).then((dataUser) =>
            res.status(200).json({ message: 'Thu Hồi Thẻ Thành Công !!!' }),
        );
    }
}

module.exports = new ControllerAdmin();
