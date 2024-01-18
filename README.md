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

