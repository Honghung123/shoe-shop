insert into public.product(id, name, description, price, cat_id, brand_id, color) 
values(1,
	   'GIÀY ADIDAS RUN 80S NAM - XÁM TRẮNG', 
	   'Giày adidas Run 80S là mẫu giày sneaker có thiết kế cổ điển của thập niên 80 nhưng rất đẹp và không bao giờ lỗi mốt. adidas Run 80S có thể sử dụng trong mọi hoạt động hàng ngày. Về thiết kế của adidas Run 80S với upper được làm từ chất liệu da lộn cao cấp kết hợp vải mesh thoáng khí, đế giữa chất liệu êm ái và đế ngoài bằng cao su bền bỉ chịu mài mòn tốt.',
	   1890000,
	   (select c.id from public.category as c where c.name = 'Giày thể thao'),
	   (select b.id from public.brand as b where b.brand_name = 'ADIDAS'),
	   'Xám trắng'
	  );
insert into public.product(id, name, description, price, cat_id, brand_id, color) 
values(2,
	   'GIÀY ADIDAS ULTRABOUNCE NAM- TRẮNG XÁM', 
	   'Giày Adidas Ultrabounce là mẫu giày thể thao mới nhất của adidas. Với thiết kế trẻ trung, khỏe khoắn, ôm sát bàn chân. Đế giày công nghệ Bounce siêu nhẹ và êm ái giúp bạn di chuyển cả ngày mà không mệt mỏi. Ngoài ra, Adidas Ultrabounce còn được làm với hơn 50% vật liệu thân thiện bảo vệ môi trường. Giày Adidas Ultrabounce là một lựa chọn hợp lý cho mọi hoạt động hàng ngày.',
	   1990000,
	   (select c.id from public.category as c where c.name = 'Giày thể thao'),
	   (select b.id from public.brand as b where b.brand_name = 'ADIDAS'),
	   'Trắng xám'
	  );
insert into public.product(id, name, description, price, cat_id, brand_id, color) 
values(3,
	   'GIÀY ADIDAS ULTRABOOST LIGHT NAM - ĐEN TRẮNG', 
	   'Giày adidas Ultraboost Light siêu phẩm giày thể thao mới nhất đến từ nhà adidas, với vật liệu và công nghệ tốt nhất được áp dụng tối đa cho sản này adidas Ultraboost Light xứng đáng trở thành niềm mơ ước của tín đồ giày thể thao chạy bộ.',
	   3690000,
	   (select c.id from public.category as c where c.name = 'Giày thể thao'),
	   (select b.id from public.brand as b where b.brand_name = 'ADIDAS'),
	   'Đen trắng'
	  );
insert into public.product(id, name, description, price, cat_id, brand_id, color) 
values(4,
	   'GIÀY ADIDAS ULTRABOOST LIGHT NỮ - HỒNG', 
	   'Giày adidas Ultraboost Light siêu phẩm giày thể thao mới nhất đến từ nhà adidas, với vật liệu và công nghệ tốt nhất được áp dụng tối đa cho sản này adidas Ultraboost Light xứng đáng trở thành niềm mơ ước của tín đồ giày thể thao chạy bộ.',
	   3690000,
	   (select c.id from public.category as c where c.name = 'Giày thể thao'),
	   (select b.id from public.brand as b where b.brand_name = 'ADIDAS'),
	   'Hồng'
	  );
insert into public.product(id, name, description, price, cat_id, brand_id, color) 
values(5,
	   'GIÀY ADIDAS GALAXY 6 NỮ - XANH', 
	   'Giày adidas Galaxy 6  có thiết kế thể thao đẹp mắt, đây là mẫu giày có thể sử dụng trong mọi hoạt động hàng ngày. adidas Galaxy 6 có nhiều cải tiến so với adidas Galaxy 5 giúp đôi giày ngày càng hoàn hảo. Công nghệ đế CloudFoam của Adidas chưa bao giờ làm Fan hâm mộ của họ thất vọng. Với cảm giác trải nghiệm giống như đi trên ''Mây'' đấy là những gì được người dùng chia sẻ lại. Form dáng thiết kế trẻ trung, khỏe khoắn nên đây sẽ là mẫu giày không thể thiếu cho những hoạt động vui chơi, thể thao. Ngoài ra, adidas Galaxy 6 sử dụng hơn 505 vật liệu tái chế thân thiện với môi trường.',
	   1390000,
	   (select c.id from public.category as c where c.name = 'Giày thể thao'),
	   (select b.id from public.brand as b where b.brand_name = 'ADIDAS'),
	   'Xanh'
	  );
insert into public.product(id, name, description, price, cat_id, brand_id, color) 
values(6,
	   'GIÀY NIKE AIR WINFLO 10 NAM - XÁM XANH', 
	   'Giày Nike Air Winflo 10 là một trong những mẫu giày thể thao đáng chờ đợi nhất năm 2023 này và thật tuyệt vời hiện tại siêu phẩm Winflo 10. Giày Nike Air Winflo 10 có nhiều sự cải tiến vượt trội so với mẫu Winflo 9 trước đó cả về kiểu dáng cũng như những công nghệ hỗ trợ đi kèm. Phần upper với chất liệu mesh cao cấp, mềm mại linh hoạt và rất thoáng khí. Phần đế giữa với bộ đệm full-length Air trứ danh giúp tăng cường độ êm và đàn hồi đồng đều trên toàn bộ bề mặt đế giày. Ngoài ra, phần mũi giày được cải tiến vừa vặn ngón chân khi sử dụng. Với thiết kế đẹp, công nghệ đỉnh cao, Nike Air Winflo 10 chắc chắn là mẫu giày thể thao không thể bỏ qua trong năm nay.',
	   2390000,
	   (select c.id from public.category as c where c.name = 'Giày thể thao'),
	   (select b.id from public.brand as b where b.brand_name = 'NIKE'),
	   'Xám xanh'
	  );
insert into public.product(id, name, description, price, cat_id, brand_id, color) 
values(7,
	   'GIÀY NIKE REVOLUTION 7 NAM - XANH LAM', 
	   'Giày Nike Revolution 7 là một mẫu giày thể thao đa dụng có thiết kế cực đẹp và mức giá vô cùng tốt. Với nhiều cải tiến mới so với phiên bản Revolution 6 thì đây chắc chắn sẽ trở thành mẫu giày thể thao quốc dân của Nike trong năm nay. Nike Revolution 7 được trang bị bộ đệm dày hơn cho độ êm và đàn hồi tốt hơn phiên bản trước. Phần upper với chất liệu vải mesh thoáng khi bền chắc nhưng vẫn mang đến cảm giác mềm mại cho bàn chân. Đế giữa với chất liệu React cùng với cộng nghệ Zoom nổi tiếng của Nike khiến đôi giày cực êm và phản lực tốt. Thiết đế đễ giữa của Nike Revolution 7 là điểm cộng lớn với đường nét cực kỳ sắc nét, gọn gàng tinh tế. Đế ngoài chất liệu cao su chịu mài mòn và bám đường rất tốt khi di chuyển. ',
	   1690000,
	   (select c.id from public.category as c where c.name = 'Giày thể thao'),
	   (select b.id from public.brand as b where b.brand_name = 'NIKE'),
	   'Xanh lam'
	  );
insert into public.product(id, name, description, price, cat_id, brand_id, color) 
values(8,
	   'GIÀY NIKE AIR MAX AXIS NỮ - TRẮNG', 
	   'Giày Nike Air Max Axis là mẫu giày được thiết kế với các đường nét thiết kế tinh tế. Đây là mẫu giày thừa hưởng những đặc điểm nổi bật từ các mẫu giày đáng tôn vinh trong quá khứ như Air Max 97 và Air Max 98, nhưng vẫn có một cái nhìn mới mẻ cho hiện tại và tương lai. Ngoài thiết kế độc đáo, Nike Air Max Axis còn mang đến sự thoải mái mới mẻ về sự thoải mái cho người sử dụng.',
	   2290000,
	   (select c.id from public.category as c where c.name = 'Giày thể thao'),
	   (select b.id from public.brand as b where b.brand_name = 'NIKE'),
	   'Trắng'
	  );
insert into public.product(id, name, description, price, cat_id, brand_id, color) 
values(9,
	   'GIÀY PUMA V6 LOW NAM - TRẮNG XANH', 
	   'Giày Puma V6 Low là mẫu giày có thiết kế tuyệt đẹp cổ điển mà rất tinh tế. Chất liệu da cao cấp và đế cao su bền bỉ chắc chắn sẽ làm hài lòng những khách hàng khó tính nhất. Bạn sẽ luôn yên tâm rằng nó không bao giờ bị lỗi mốt.',
	   1790000,
	   (select c.id from public.category as c where c.name = 'Giày thể thao'),
	   (select b.id from public.brand as b where b.brand_name = 'PUMA'),
	   'Trắng xanh'
	  );
insert into public.product(id, name, description, price, cat_id, brand_id, color) 
values(10,
	   'GIÀY PUMA PWRFRAME TR 2 NAM - NAVY ĐỎ', 
	   'Giày Puma PWRFrame TR 2 mẫu giày training có thiết kế rất đẹp cùng với những công nghệ cao cấp của Puma. Đây chính là mẫu giày đa năng tuyệt vời cho luyện tập thể thao, tập gym và các hoạt động hàng ngày.',
	   1890000,
	   (select c.id from public.category as c where c.name = 'Giày thể thao'),
	   (select b.id from public.brand as b where b.brand_name = 'PUMA'),
	   'Navy đỏ'
	  );
insert into public.product(id, name, description, price, cat_id, brand_id, color) 
values(11,
	   'GIÀY PUMA SMASH CAT PERF FS SL NAM NỮ - TRẮNG GOLD', 
	   'Giày Puma Smash Cat Perf FS SL mẫu giày có thiết kế cổ điển mà tinh tế. Chất liệu da cao cấp và đế cao su bền bỉ chắc chắn sẽ làm hài lòng những khách hàng khó tính nhất. Bạn sẽ luôn yên tâm rằng nó không bao giờ bị lỗi mốt.',
	   1090000,
	   (select c.id from public.category as c where c.name = 'Giày thể thao'),
	   (select b.id from public.brand as b where b.brand_name = 'PUMA'),
	   'Trắng gold'
	  );
	  
insert into public.product(id, name, description, price, cat_id, brand_id, color) 
values(12,
	   'Giày mules cao gót Gabine Leather - Phấn', 
	   'Đôi giày mule mũi nhọn màu trắng phấn này sẽ tạo điểm nhấn ngay lập tức cho bất kỳ diện mạo nào. Chúng là một phần trong dòng sản phẩm Gabine đặc trưng của chúng tôi với khóa hình chữ U mang tính biểu tượng. Đủ linh hoạt để kết hợp với nhiều loại trang phục, bạn có thể thỏa sức sáng tạo với phong cách của mình. Nhờ thiết kế gót nhọn 8cm, đôi giày này sẽ giúp nâng tầm vóc dáng và giúp bạn tự tin trong từng bước đi.',
	   2090000,
	   (select c.id from public.category as c where c.name = 'Giày cao gót'),
	   (select b.id from public.brand as b where b.brand_name = 'CHARLES & KEITH'),
	   'Phấn'
	  );
insert into public.product(id, name, description, price, cat_id, brand_id, color) 
values(13,
	   'Giày mules cao gót Gabine Leather - Hồng', 
	   'Cho dù bạn đang đến văn phòng, bữa tối hay tiệc cocktail, đôi giày mules cao gót Gabine này đều sẽ giúp nâng tầm cho diện mạo của bạn. Hoàn thiện bằng tông màu hồng ngọt ngào, bạn có thể thỏa sức sáng tạo cho phong cách của mình. Chúng là một phần trong dòng sản phẩm Gabine đặc trưng của chúng tôi với khóa hình chữ U mang tính biểu tượng. Phối chúng cùng một chiếc quần jeans ống đứng và áo sơ mi cho một ngày làm việc năng động.',
	   2090000,
	   (select c.id from public.category as c where c.name = 'Giày cao gót'),
	   (select b.id from public.brand as b where b.brand_name = 'CHARLES & KEITH'),
	   'Hồng'
	  );
insert into public.product(id, name, description, price, cat_id, brand_id, color) 
values(14,
	   'Giày mules cao gót Gabine Patent Leather - Đen', 
	   'Với màu đen cổ điển, đôi giày mules cao gót Gabine này là món đồ không thể thiếu trong tủ đồ của mọi phụ nữ. Chúng là một phần trong dòng sản phẩm Gabine đặc trưng của chúng tôi với khóa hình chữ U mang tính biểu tượng. Nhờ thiết kế mũi nhọn, đôi giày mule này tạo ra hiệu ứng kéo dài chân và nâng tầm bất kỳ vóc dáng nào.',
	   2090000,
	   (select c.id from public.category as c where c.name = 'Giày cao gót'),
	   (select b.id from public.brand as b where b.brand_name = 'CHARLES & KEITH'),
	   'Đen'
	  );
insert into public.product(id, name, description, price, cat_id, brand_id, color) 
values(15,
	   'Giày cao gót mũi nhọn đế trụ Trapeze Slingback - Trắng', 
	   'Giới thiệu những đôi giày cao gót màu trắng dễ phối đồ. Chúng sẽ là một trong những món đồ cần thiết trong tủ quần áo của bạn bởi chúng dễ dàng kết hợp với trang phục công sở. Được thiết kế với gót giày hình thang và kiểu dáng vừa đủ giữa sự thanh lịch và tính tiện dụng. Mũi giày nhọn cùng với độ đàn hồi nhẹ của quai hậu giúp tăng chiều dài chân và đảm bảo sự vừa vặn với chân của bạn.',
	   1390000,
	   (select c.id from public.category as c where c.name = 'Giày cao gót'),
	   (select b.id from public.brand as b where b.brand_name = 'CHARLES & KEITH'),
	   'Trắng'
	  );
insert into public.product(id, name, description, price, cat_id, brand_id, color) 
values(16,
	   'Giày cao gót mũi nhọn Checkered See-Through Trapeze - Nâu xám', 
	   'Đã tìm thấy đôi giày hoàn hảo cho những ngày làm việc trong tuần đến những ngày cuối tuần. Nổi bật với kiểu dáng mũi nhọn sang trọng giúp tạo hiệu ứng đôi chân thon dài hơn, đôi giày này hoàn thiện với họa tiết ca rô đẹp mắt, hoàn hảo cho cả đi làm và đi chơi. Cho dù bạn đang đến văn phòng hay tiệc trà chiều, chúng sẽ luôn hoàn hảo và thu hút mọi ánh nhìn. Kết hợp chúng cùng một chiếc quần jeans, áo croptop và túi hobo yêu thích cho buổi cà phê cuối tuần của bạn.',
	   1590000,
	   (select c.id from public.category as c where c.name = 'Giày cao gót'),
	   (select b.id from public.brand as b where b.brand_name = 'CHARLES & KEITH'),
	   'Nâu xám'
	  );
insert into public.product(id, name, description, price, cat_id, brand_id, color) 
values(17,
	   'Giày Cao Gót Trang Trí Nơ - Trắng', 
	   'Giày cao gót trang trí nơ nữ tính, thời trang. Gót thanh cao 7 cm và có đế chống trượt giúp di chuyển dễ dàng. Chất liệu da tổng hợp cao cấp, phù hợp mọi dịp: đi làm, dạo phố hoặc dự tiệc',
	   614000,
	   (select c.id from public.category as c where c.name = 'Giày cao gót'),
	   (select b.id from public.brand as b where b.brand_name = 'JUNO'),
	   'Trắng'
	  );
insert into public.product(id, name, description, price, cat_id, brand_id, color) 
values(18,
	   'Giày Cao Gót Bít Mũi Gót Thanh - Kem', 
	   'Giày cao gót bít mũi gót thanh nữ tính, thời trang. Gót cao 11 cm, phối quai mảnh mang lại cảm giác thon gọn cho bàn chân. Chất liệu da tổng hợp cao cấp, phù hợp mang mọi dịp: đi làm, đi tiệc, dạo phố.',
	   6140000,
	   (select c.id from public.category as c where c.name = 'Giày cao gót'),
	   (select b.id from public.brand as b where b.brand_name = 'JUNO'),
	   'Kem'
	  );

insert into public.product(id, name, description, price, cat_id, brand_id, color) 
values(19,
	   'Giày Thể Thao GAT Shoes Black Lucas Shoes', 
	   'Giày Thể Thao GAT Shoes Black Lucas Shoes, da bò thật, đế khâu cao 3cm, dễ phối đồ – BH 1 năm',
	   560000,
	   (select c.id from public.category as c where c.name = 'Giày thể thao'),
	   (select b.id from public.brand as b where b.brand_name = 'NIKE'),
	   'Trắng'
	  );
	  
insert into public.product(id, name, description, price, cat_id, brand_id, color) 
values(20,
	   'Giày Thể Thao LC2101 Đen Lucas Shoes', 
	   'Giày Thể Thao LC2101 Đen Lucas Shoes, da bò thật, đế khâu cao 3cm – BH 1 năm',
	   540000,
	   (select c.id from public.category as c where c.name = 'Giày thể thao'),
	   (select b.id from public.brand as b where b.brand_name = 'NIKE'),
	   'Đen'
	  );

insert into public.product(id, name, description, price, cat_id, brand_id, color) 
values(21,
	   'Giày Sneaker Unisex Puma Clyde Huskie - Trắng', 
	   'Chìm đắm trong huyền thoại thời gian với Giày Sneaker Unisex Puma Clyde Huskie. Đôi giày này là một tác phẩm nghệ thuật thể hiện sự kết hợp hoàn hảo giữa lịch sử và phong cách đương đại, mang đến sự tự tin và làm nổi bật cá tính của bạn.',
	   3499000,
	   (select c.id from public.category as c where c.name = 'Giày thể thao'),
	   (select b.id from public.brand as b where b.brand_name = 'PUMA'),
	   'Trắng'
	  );

insert into public.product(id, name, description, price, cat_id, brand_id, color) 
values(22,
	   'Giày Thời Trang Unisex Puma Slipstream Xtreme Earth - Nâu', 
	   'Cảm nhận niềm vui của mỗi bước đi khi giày thể thao Slipstream Xtreme đưa phong cách và sự thoải mái của bạn lên một tầm cao mới. Thiết kế độc đáo, ấn tượng của đôi giày chắc chắn sẽ khiến bạn trở nên nổi bật dù ở bất kỳ đâu.',
	   4099000,
	   (select c.id from public.category as c where c.name = 'Giày thể thao'),
	   (select b.id from public.brand as b where b.brand_name = 'PUMA'),
	   'Nâu'
	  );

insert into public.product(id, name, description, price, cat_id, brand_id, color) 
values(23,
	   'Giày Mocasin Nam BITI''S BMM000477', 
	   'Giày Mocasin Nam BITI''S BMM000477 là một “người bạn đồng hành” không thể thiếu của phái mạnh trong những bữa tiệc tùng hay sự kiện quan trọng. Nếu bạn đang tìm kiếm một sản phẩm nam tính, chất lượng và có chính sách bảo hành tuyệt vời thì có thể tham khảo ngay mẫu này.',
	   785000,
	   (select c.id from public.category as c where c.name = 'Giày tây'),
	   (select b.id from public.brand as b where b.brand_name = 'BITI''S'),
	   'Nâu'
	  );

insert into public.product(id, name, description, price, cat_id, brand_id, color) 
values(24,
	   'Giày Tây Nam BITI''S BMM000777', 
	   'Giày Tây Nam BITI''S BMM000777 là một vật phẩm không thể thiếu trong bộ sưu tầm giày của các phái mạnh. Nếu bạn đang tìm kiếm một sản phẩm nam tính, chất lượng và có chính sách bảo hành tuyệt vời thì có thể tham khảo ngay mẫu này.',
	   776000,
	   (select c.id from public.category as c where c.name = 'Giày tây'),
	   (select b.id from public.brand as b where b.brand_name = 'BITI''S'),
	   'Đen'
	  );

insert into public.product(id, name, description, price, cat_id, brand_id, color) 
values(25,
	   'Giày Tây Nam BITI''S BVM001377
785,000 ₫', 
	   'Giày Tây Nam BITI''S BVM001377 là một vật phẩm không thể thiếu trong bộ sưu tầm giày của các phái mạnh. Nếu bạn đang tìm kiếm một sản phẩm nam tính, chất lượng và có chính sách bảo hành tuyệt vời thì có thể tham khảo ngay mẫu này.',
	   785000,
	   (select c.id from public.category as c where c.name = 'Giày tây'),
	   (select b.id from public.brand as b where b.brand_name = 'BITI''S'),
	   'Đen'
	  );

insert into public.product(id, name, description, price, cat_id, brand_id, color) 
values(26,
	   'Giày Tây Boot Nam BITI''S BVM001788', 
	   'Giày Tây Boot Nam BITI''S BVM001788 là một vật phẩm không thể thiếu trong bộ sưu tầm giày của các phái mạnh. Nếu bạn đang tìm kiếm một sản phẩm nam tính, chất lượng và có chính sách bảo hành tuyệt vời thì có thể tham khảo ngay mẫu này.',
	   1668000,
	   (select c.id from public.category as c where c.name = 'Giày tây'),
	   (select b.id from public.brand as b where b.brand_name = 'BITI''S'),
	   'Đen'
	  );

insert into public.product(id, name, description, price, cat_id, brand_id, color) 
values(27,
	   'Giày Mocasin Nam BITI''S BMM000677', 
	   'Giày Mocasin Nam BITI''s BMM000677 “chiều lòng” mọi phái mạnh. Bởi, sản phẩm có thiết kế sang trọng mà hiếm có đôi giày nào có được, chất liệu làm đế/quai chỉn chu và kèm nhiều điều nổi bật không thể phủ nhận khác.',
	   1668000,
	   (select c.id from public.category as c where c.name = 'Giày tây'),
	   (select b.id from public.brand as b where b.brand_name = 'BITI''S'),
	   'Nâu'
	  );

insert into public.product(id, name, description, price, cat_id, brand_id, color) 
values(28,
	   'Giày da nam Penny Loafer trẻ trung cao cấp GNLAMJ238-F1-D', 
	   'Đường may chi tiết, tỉ mỉ theo tiêu chuẩn. Đế giày chắc chắn, chống trơn trượt. Màu sắc trang nhã, hài hòa. Giày lười nam thiết kế hiện đại, sang trọng phù hợp với các quý ông lịch lãm. Kết hợp cùng quần âu, kaki, trang phục lịch sự.',
	   1750000,
	   (select c.id from public.category as c where c.name = 'Giày tây'),
	   (select b.id from public.brand as b where b.brand_name = 'LAFORCE'),
	   'Đen'
	  );

insert into public.product(id, name, description, price, cat_id, brand_id, color) 
values(29,
	   'Giày lười nam tăng chiều cao da trơn bóng GCLA798-R1-D', 
	   'Thiết kế kiểu dáng Loafer hiện đại, thời thượng. Đế độn gót 6cm không lộ, dễ di chuyển. Màu sắc trang nhã, hài hòa. Thiết kế giày cao nam công sở, trẻ trung. Kết hợp cùng quần âu, kaki, trang phục lịch sự.',
	   2190000,
	   (select c.id from public.category as c where c.name = 'Giày tây'),
	   (select b.id from public.brand as b where b.brand_name = 'LAFORCE'),
	   'Đen'
	  );

insert into public.product(id, name, description, price, cat_id, brand_id, color) 
values(30,
	   'Giày lười nam da bò mặt da cá đuối đẹp GNLAJD6611-1028-D', 
	   'Thiết kế giày lười phối da hiện đại: Mặt trên làm từ da cá đuối, má giày làm bằng da bò. Thiết kế mũi nhọn hiện đại, thời thượng. Họa tiết in hình quả trám sang trọng.',
	   2100000,
	   (select c.id from public.category as c where c.name = 'Giày tây'),
	   (select b.id from public.brand as b where b.brand_name = 'LAFORCE'),
	   'Đen'
	  );

insert into public.product(id, name, description, price, cat_id, brand_id, color) 
values(31,
	   'Giày lười nam tăng chiều cao Penny Loafer GCLA926-6-N', 
	   'Da bò thật 100%, Tăng chiều cao 5-7cm. Thiết kế tăng chiều cao với lớp đệm cao su đàn hồi, dễ sử dụng. Kiểu dáng Penny hiện đại, trẻ trung. Dòng giày đế cao nam lót cao su chống trơn trượt. Dễ dàng phối cùng nhiều loại trang phục nơi công sở.',
	   2150000,
	   (select c.id from public.category as c where c.name = 'Giày tây'),
	   (select b.id from public.brand as b where b.brand_name = 'LAFORCE'),
	   'Nâu'
	  );

insert into public.product(id, name, description, price, cat_id, brand_id, color) 
values(32,
	   'Giày lười da nam họa tiết caro lịch lãm GNLA2122-N', 
	   'Từng đường may kép tỉ mỉ, chắc chắn chạy quanh giày. Thiết kế giày lười nam họa tiết đan caro độc đáo tạo sự trẻ trung. Mũi giày tròn. Đế giày thiết kế chống trơn, trượt.',
	   1750000,
	   (select c.id from public.category as c where c.name = 'Giày tây'),
	   (select b.id from public.brand as b where b.brand_name = 'LAFORCE'),
	   'Nâu'
	  );




	  
	  
	  
	  
	  
	  