# Shoe shop

- 5 Danh mục:

Loại sản phẩm
    Giày thể thao
    Giày trẻ em
    Giày nam
    Giày nữ
    Giày tây
    Giày bata
    Giày scandal
    Giày boot
    Giày cao gót
Hãng 
    - Nike 
    - Addidas 
    - Gucci 
    - Abc 
    - Def
    ...
        Sản phẩm
        _ Product 1 
            - ID 
            - Name 
            - Short Description 
            - Full Description 
            - Price 
            - Stock 
            - CategoryID 
            - SizeID 
            - ColorID 
            - material
        _ Prođuct 2
            ...

        Top hãng có doanh thu cao tháng
        Top sản phẩm bán chạy theo ngày, tháng, năm
Bảng Brand
    -Id
    -Name
Bảng Brand_Product
    -BranhId
    -ProductId

Bảng Category 
    - id 
    - name

Bảng Product 
    - id 
    - name 
    - short_description 
    - full_description 
    - price 
    - categoryID 
    - sizeID

Bảng Size
    sizeID
    
    pID
    size
Bảng product_size
    sizeId
    productId
    stock
    
Bảng Color
    colorID
    pID
    color
    image
Bảng product_color
    productId
    colorId
    
Bảng Cart_Line
    id
    productId
    userId
    quantity

Bảng User
    id
    name
    username
    password
    address
    email
    role
    locked
    
Bảng Order
    - id 
    - userId
    - total
Bảng Order_Line
    -id
    -OrderId
    -ProductId
    -Quantity
    -Price

Bảng Account
    - id
    - balance

Bảng Voucher
    - id
    - code(mã discount)
    - percent(giảm giá bao nhiêu %)
    - date_expire 
    - limit(số lượng có hạn) Giả sử có 5 nguuời được áp

------------------------- ADMIN --------------------------------

- Dashboard
    - post top5doanhthutheothang( month ) -> danh sách gồm object. Mỗi object phải có : Tên brand, total money(dựa theo brand theo tháng chỉ định)
    - post top5 sản phẩm(year) ->  Danh sách 5 sản phẩm 
    - post 9tháng gần nhất danh mục cao nhất(current date -> month) -> Danh sách gồm 5 object. Mõi object gồm: list tháng, list total, category name
- Account: 
    - get user by id(id) -> entity user, user account(id, balance) của hệ thống phụ, nếu không có trả về null
    - get user list(offset: trang hiện tại, limit: số phẩn tử của một trang) -> trả về danh sách user list từ offset* limit + limit
    - delete user (id) -> delete user by id - Tạm thời để đó
    - post ban/unban user(id) -> change locked = true  
    - get account(id) -> get account by id -> trả account entity
- Category
    - get category by id(id) -> trả về category entity
    - get category list(offset, limit) -> trả về danh sách category list từ offset*limit, limit
    - post category(name) -> insert category
    - get category list(offset, limit) -> trả về danh sách category list từ offset* limit + limit 
    - post category(id, name) -> update category by id
    - post delete category(id) -> delete category by id

- Product
    - get product by id(id) -> get product by id
    - get product list(offset, limit) -> get product list từ offset*limit, limit
    - post product(images(multiple), các trường trong bảng product) -> insert product
    - post product(id, images(multiple), các trường trong bảng product) -> update product by id
    - post delete product(id) -> delete product by id

- Order
    - get order by id(id) -> order entity by id, user entity, cart list( danh sách sản phẩm mà user đã đặt hàng), tổng tiền sản phẩm và discount(số tiền được giảm giá khi áp mã)
    - get order list(offset, limit) -> order list từ offset*limit, offset*limit + limit
    - post status(confirm) -> update shipping status: confirm order

Bonus
    - check discount by discount code -> discount( để kiểm tra xem mã giảm có tồn tại và còn hạn sử dụng) 

Client
    - Hủy order
    - Confirm đã nhận order
