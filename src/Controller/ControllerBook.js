const ModelBook = require('../Model/ModelBook');
const ModelRequestBook = require('../Model/ModelRequestBook');
const ModelHandleBook = require('../Model/ModelHandleBook');

class ControllerBook {
    async AddBook(req, res) {
        try {
            const { masach, img, tensach, tacgia, nhaxuatban, phienban, danhmuc, namxb, mota, soluong, ngaycapnhat } =
                req.body;
            const book = new ModelBook({
                masach,
                img,
                tensach,
                tacgia,
                nhaxuatban,
                phienban,
                danhmuc,
                namxb,
                mota,
                soluong,
                ngaycapnhat,
            });
            await book.save();
            return res.status(200).json({ message: 'Thêm Sách Thành Công ' });
        } catch (error) {
            return res.status(403).json({ message: 'Đã Xảy Ra Lỗi Vui Lòng Thử Lại' });
        }
    }

    async GetBooks(req, res) {
        ModelBook.find({}).then((dataBooks) => res.status(200).json(dataBooks));
    }

    async DeleteBook(req, res) {
        ModelBook.deleteOne({ _id: req.body.id }).then((data) =>
            res.status(200).json({ message: 'Xóa Sách Thành Công', data }),
        );
    }

    async UpdateBook(req, res) {
        const { masach, tensach, tacgia, nhaxuatban, phienban, danhmuc, namxb, mota, soluong, ngaycapnhat } = req.body;
        ModelBook.findOne({ _id: req.body.id }).then((dataBook) => {
            if (dataBook) {
                dataBook
                    .updateOne({
                        masach: masach || dataBook.masach,
                        tensach: tensach || dataBook.tensach,
                        tacgia: tacgia || dataBook.tacgia,
                        nhaxuatban: nhaxuatban || dataBook.nhaxuatban,
                        phienban: phienban || dataBook.phienban,
                        danhmuc: danhmuc || dataBook.danhmuc,
                        namxb: namxb || dataBook.namxb,
                        mota: mota || dataBook.mota,
                        soluong: soluong || dataBook.soluong,
                        ngaycapnhat: ngaycapnhat || dataBook.ngaycapnhat,
                    })
                    .then((data) => res.status(200).json({ message: 'Chỉnh Sửa Thành Công ', data }));
            }
        });
    }

    async HandleRequestBook(req, res) {
        const newRequestBook = new ModelRequestBook({
            iduser: req.body.iduser,
            tensach: req.body.tensach,
            ngaycap: req.body.ngaycap,
            ngayhethan: req.body.ngayhethan,
        });
        newRequestBook.save();
    }
    async SearchProduct(req, res) {
        const keyword = req.query.nameBook;
        ModelBook.find({ tensach: { $regex: keyword, $options: 'i' } }).then((dataProducts) => {
            //
            if (dataProducts.length <= 0) {
                return res.status(200).json([
                    {
                        img: 'https://st3.depositphotos.com/23594922/31822/v/450/depositphotos_318221368-stock-illustration-missing-picture-page-for-website.jpg',
                        nameBook: 'Không Tìm Thấy Sản Phẩm !!!',
                        price: 0,
                    },
                ]);
            } else {
                return res.status(200).json(dataProducts);
            }
        });
    }
    async ExtendsBook(req, res) {
        ModelHandleBook.findOne({ masinhvien: req.body.masinhvien }).then((data) => {
            if (data) {
                data.updateOne({ ngayhethan: req.body.date, tinhtrang: false }).then((data) => {
                    res.status(200).json({ message: 'Cập Nhật Thành Công', data });
                });
            } else {
                return res.status(200).json({ message: 'Error' });
            }
        });
    }
    DeleteBooks(req, res) {
        ModelHandleBook.deleteOne({ _id: req.body.id }).then((data) => {
            return res.status(200).json({ message: 'Hủy Thành Công !!!' });
        });
    }
}

module.exports = new ControllerBook();
