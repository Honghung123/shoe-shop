insert into public.product(id, name, description, price, cat_id, brand_id) 
values(1,
	   'GIÀY ADIDAS RUN 80S NAM - XÁM TRẮNG', 
	   'Giày adidas Run 80S là mẫu giày sneaker có thiết kế cổ điển của thập niên 80 nhưng rất đẹp và không bao giờ lỗi mốt. adidas Run 80S có thể sử dụng trong mọi hoạt động hàng ngày. Về thiết kế của adidas Run 80S với upper được làm từ chất liệu da lộn cao cấp kết hợp vải mesh thoáng khí, đế giữa chất liệu êm ái và đế ngoài bằng cao su bền bỉ chịu mài mòn tốt.',
	   1890000,
	   (select c.id from public.category as c where c.name = 'Giày thể thao'),
	   (select b.id from public.brand as b where b.brand_name = 'ADIDAS')
	  );
insert into public.product(id, name, description, price, cat_id, brand_id) 
values(2,
	   'GIÀY ADIDAS ULTRABOUNCE NAM- TRẮNG XÁM', 
	   'Giày Adidas Ultrabounce là mẫu giày thể thao mới nhất của adidas. Với thiết kế trẻ trung, khỏe khoắn, ôm sát bàn chân. Đế giày công nghệ Bounce siêu nhẹ và êm ái giúp bạn di chuyển cả ngày mà không mệt mỏi. Ngoài ra, Adidas Ultrabounce còn được làm với hơn 50% vật liệu thân thiện bảo vệ môi trường. Giày Adidas Ultrabounce là một lựa chọn hợp lý cho mọi hoạt động hàng ngày.',
	   1990000,
	   (select c.id from public.category as c where c.name = 'Giày thể thao'),
	   (select b.id from public.brand as b where b.brand_name = 'ADIDAS')
	  );
insert into public.product(id, name, description, price, cat_id, brand_id) 
values(3,
	   'GIÀY ADIDAS ULTRABOOST LIGHT NAM - ĐEN TRẮNG', 
	   'Giày adidas Ultraboost Light siêu phẩm giày thể thao mới nhất đến từ nhà adidas, với vật liệu và công nghệ tốt nhất được áp dụng tối đa cho sản này adidas Ultraboost Light xứng đáng trở thành niềm mơ ước của tín đồ giày thể thao chạy bộ.',
	   3690000,
	   (select c.id from public.category as c where c.name = 'Giày thể thao'),
	   (select b.id from public.brand as b where b.brand_name = 'ADIDAS')
	  );
insert into public.product(id, name, description, price, cat_id, brand_id) 
values(4,
	   'GIÀY ADIDAS ULTRABOOST LIGHT NỮ - HỒNG', 
	   'Giày adidas Ultraboost Light siêu phẩm giày thể thao mới nhất đến từ nhà adidas, với vật liệu và công nghệ tốt nhất được áp dụng tối đa cho sản này adidas Ultraboost Light xứng đáng trở thành niềm mơ ước của tín đồ giày thể thao chạy bộ.',
	   3690000,
	   (select c.id from public.category as c where c.name = 'Giày thể thao'),
	   (select b.id from public.brand as b where b.brand_name = 'ADIDAS')
	  );
insert into public.product(id, name, description, price, cat_id, brand_id) 
values(5,
	   'GIÀY ADIDAS GALAXY 6 NỮ - XANH', 
	   'Giày adidas Galaxy 6  có thiết kế thể thao đẹp mắt, đây là mẫu giày có thể sử dụng trong mọi hoạt động hàng ngày. adidas Galaxy 6 có nhiều cải tiến so với adidas Galaxy 5 giúp đôi giày ngày càng hoàn hảo. Công nghệ đế CloudFoam của Adidas chưa bao giờ làm Fan hâm mộ của họ thất vọng. Với cảm giác trải nghiệm giống như đi trên ''Mây'' đấy là những gì được người dùng chia sẻ lại. Form dáng thiết kế trẻ trung, khỏe khoắn nên đây sẽ là mẫu giày không thể thiếu cho những hoạt động vui chơi, thể thao. Ngoài ra, adidas Galaxy 6 sử dụng hơn 505 vật liệu tái chế thân thiện với môi trường.',
	   1390000,
	   (select c.id from public.category as c where c.name = 'Giày thể thao'),
	   (select b.id from public.brand as b where b.brand_name = 'ADIDAS')
	  );
insert into public.product(id, name, description, price, cat_id, brand_id) 
values(6,
	   'GIÀY NIKE AIR WINFLO 10 NAM - XÁM XANH', 
	   'Giày Nike Air Winflo 10 là một trong những mẫu giày thể thao đáng chờ đợi nhất năm 2023 này và thật tuyệt vời hiện tại siêu phẩm Winflo 10. Giày Nike Air Winflo 10 có nhiều sự cải tiến vượt trội so với mẫu Winflo 9 trước đó cả về kiểu dáng cũng như những công nghệ hỗ trợ đi kèm. Phần upper với chất liệu mesh cao cấp, mềm mại linh hoạt và rất thoáng khí. Phần đế giữa với bộ đệm full-length Air trứ danh giúp tăng cường độ êm và đàn hồi đồng đều trên toàn bộ bề mặt đế giày. Ngoài ra, phần mũi giày được cải tiến vừa vặn ngón chân khi sử dụng. Với thiết kế đẹp, công nghệ đỉnh cao, Nike Air Winflo 10 chắc chắn là mẫu giày thể thao không thể bỏ qua trong năm nay.',
	   2390000,
	   (select c.id from public.category as c where c.name = 'Giày thể thao'),
	   (select b.id from public.brand as b where b.brand_name = 'NIKE')
	  );
insert into public.product(id, name, description, price, cat_id, brand_id) 
values(7,
	   'GIÀY NIKE REVOLUTION 7 NAM - XANH LAM', 
	   'Giày Nike Revolution 7 là một mẫu giày thể thao đa dụng có thiết kế cực đẹp và mức giá vô cùng tốt. Với nhiều cải tiến mới so với phiên bản Revolution 6 thì đây chắc chắn sẽ trở thành mẫu giày thể thao quốc dân của Nike trong năm nay. Nike Revolution 7 được trang bị bộ đệm dày hơn cho độ êm và đàn hồi tốt hơn phiên bản trước. Phần upper với chất liệu vải mesh thoáng khi bền chắc nhưng vẫn mang đến cảm giác mềm mại cho bàn chân. Đế giữa với chất liệu React cùng với cộng nghệ Zoom nổi tiếng của Nike khiến đôi giày cực êm và phản lực tốt. Thiết đế đễ giữa của Nike Revolution 7 là điểm cộng lớn với đường nét cực kỳ sắc nét, gọn gàng tinh tế. Đế ngoài chất liệu cao su chịu mài mòn và bám đường rất tốt khi di chuyển. ',
	   1690000,
	   (select c.id from public.category as c where c.name = 'Giày thể thao'),
	   (select b.id from public.brand as b where b.brand_name = 'NIKE')
	  );
insert into public.product(id, name, description, price, cat_id, brand_id) 
values(8,
	   'GIÀY NIKE AIR MAX AXIS NỮ - TRẮNG', 
	   'Giày Nike Air Max Axis là mẫu giày được thiết kế với các đường nét thiết kế tinh tế. Đây là mẫu giày thừa hưởng những đặc điểm nổi bật từ các mẫu giày đáng tôn vinh trong quá khứ như Air Max 97 và Air Max 98, nhưng vẫn có một cái nhìn mới mẻ cho hiện tại và tương lai. Ngoài thiết kế độc đáo, Nike Air Max Axis còn mang đến sự thoải mái mới mẻ về sự thoải mái cho người sử dụng.',
	   2290000,
	   (select c.id from public.category as c where c.name = 'Giày thể thao'),
	   (select b.id from public.brand as b where b.brand_name = 'NIKE')
	  );
insert into public.product(id, name, description, price, cat_id, brand_id) 
values(9,
	   'GIÀY PUMA V6 LOW NAM - TRẮNG XANH', 
	   'Giày Puma V6 Low là mẫu giày có thiết kế tuyệt đẹp cổ điển mà rất tinh tế. Chất liệu da cao cấp và đế cao su bền bỉ chắc chắn sẽ làm hài lòng những khách hàng khó tính nhất. Bạn sẽ luôn yên tâm rằng nó không bao giờ bị lỗi mốt.',
	   1790000,
	   (select c.id from public.category as c where c.name = 'Giày thể thao'),
	   (select b.id from public.brand as b where b.brand_name = 'PUMA')
	  );
insert into public.product(id, name, description, price, cat_id, brand_id) 
values(10,
	   'GIÀY PUMA PWRFRAME TR 2 NAM - NAVY ĐỎ', 
	   'Giày Puma PWRFrame TR 2 mẫu giày training có thiết kế rất đẹp cùng với những công nghệ cao cấp của Puma. Đây chính là mẫu giày đa năng tuyệt vời cho luyện tập thể thao, tập gym và các hoạt động hàng ngày.',
	   1890000,
	   (select c.id from public.category as c where c.name = 'Giày thể thao'),
	   (select b.id from public.brand as b where b.brand_name = 'PUMA')
	  );
insert into public.product(id, name, description, price, cat_id, brand_id) 
values(11,
	   'GIÀY PUMA SMASH CAT PERF FS SL NAM NỮ - TRẮNG GOLD', 
	   'Giày Puma Smash Cat Perf FS SL mẫu giày có thiết kế cổ điển mà tinh tế. Chất liệu da cao cấp và đế cao su bền bỉ chắc chắn sẽ làm hài lòng những khách hàng khó tính nhất. Bạn sẽ luôn yên tâm rằng nó không bao giờ bị lỗi mốt.',
	   1090000,
	   (select c.id from public.category as c where c.name = 'Giày thể thao'),
	   (select b.id from public.brand as b where b.brand_name = 'PUMA')
	  );
	  
insert into public.product(id, name, description, price, cat_id, brand_id) 
values(12,
	   'Giày mules cao gót Gabine Leather - Phấn', 
	   'Đôi giày mule mũi nhọn màu trắng phấn này sẽ tạo điểm nhấn ngay lập tức cho bất kỳ diện mạo nào. Chúng là một phần trong dòng sản phẩm Gabine đặc trưng của chúng tôi với khóa hình chữ U mang tính biểu tượng. Đủ linh hoạt để kết hợp với nhiều loại trang phục, bạn có thể thỏa sức sáng tạo với phong cách của mình. Nhờ thiết kế gót nhọn 8cm, đôi giày này sẽ giúp nâng tầm vóc dáng và giúp bạn tự tin trong từng bước đi.',
	   2090000,
	   (select c.id from public.category as c where c.name = 'Giày cao gót'),
	   (select b.id from public.brand as b where b.brand_name = 'CHARLES & KEITH')
	  );
insert into public.product(id, name, description, price, cat_id, brand_id) 
values(13,
	   'Giày mules cao gót Gabine Leather - Hồng', 
	   'Cho dù bạn đang đến văn phòng, bữa tối hay tiệc cocktail, đôi giày mules cao gót Gabine này đều sẽ giúp nâng tầm cho diện mạo của bạn. Hoàn thiện bằng tông màu hồng ngọt ngào, bạn có thể thỏa sức sáng tạo cho phong cách của mình. Chúng là một phần trong dòng sản phẩm Gabine đặc trưng của chúng tôi với khóa hình chữ U mang tính biểu tượng. Phối chúng cùng một chiếc quần jeans ống đứng và áo sơ mi cho một ngày làm việc năng động.',
	   2090000,
	   (select c.id from public.category as c where c.name = 'Giày cao gót'),
	   (select b.id from public.brand as b where b.brand_name = 'CHARLES & KEITH')
	  );
insert into public.product(id, name, description, price, cat_id, brand_id) 
values(14,
	   'Giày mules cao gót Gabine Patent Leather - Đen', 
	   'Với màu đen cổ điển, đôi giày mules cao gót Gabine này là món đồ không thể thiếu trong tủ đồ của mọi phụ nữ. Chúng là một phần trong dòng sản phẩm Gabine đặc trưng của chúng tôi với khóa hình chữ U mang tính biểu tượng. Nhờ thiết kế mũi nhọn, đôi giày mule này tạo ra hiệu ứng kéo dài chân và nâng tầm bất kỳ vóc dáng nào.',
	   2090000,
	   (select c.id from public.category as c where c.name = 'Giày cao gót'),
	   (select b.id from public.brand as b where b.brand_name = 'CHARLES & KEITH')
	  );
insert into public.product(id, name, description, price, cat_id, brand_id) 
values(15,
	   'Giày cao gót mũi nhọn đế trụ Trapeze Slingback - Trắng', 
	   'Giới thiệu những đôi giày cao gót màu trắng dễ phối đồ. Chúng sẽ là một trong những món đồ cần thiết trong tủ quần áo của bạn bởi chúng dễ dàng kết hợp với trang phục công sở. Được thiết kế với gót giày hình thang và kiểu dáng vừa đủ giữa sự thanh lịch và tính tiện dụng. Mũi giày nhọn cùng với độ đàn hồi nhẹ của quai hậu giúp tăng chiều dài chân và đảm bảo sự vừa vặn với chân của bạn.',
	   1390000,
	   (select c.id from public.category as c where c.name = 'Giày cao gót'),
	   (select b.id from public.brand as b where b.brand_name = 'CHARLES & KEITH')
	  );
insert into public.product(id, name, description, price, cat_id, brand_id) 
values(16,
	   'Giày cao gót mũi nhọn Checkered See-Through Trapeze - Nâu xám', 
	   'Đã tìm thấy đôi giày hoàn hảo cho những ngày làm việc trong tuần đến những ngày cuối tuần. Nổi bật với kiểu dáng mũi nhọn sang trọng giúp tạo hiệu ứng đôi chân thon dài hơn, đôi giày này hoàn thiện với họa tiết ca rô đẹp mắt, hoàn hảo cho cả đi làm và đi chơi. Cho dù bạn đang đến văn phòng hay tiệc trà chiều, chúng sẽ luôn hoàn hảo và thu hút mọi ánh nhìn. Kết hợp chúng cùng một chiếc quần jeans, áo croptop và túi hobo yêu thích cho buổi cà phê cuối tuần của bạn.',
	   1590000,
	   (select c.id from public.category as c where c.name = 'Giày cao gót'),
	   (select b.id from public.brand as b where b.brand_name = 'CHARLES & KEITH')
	  );
insert into public.product(id, name, description, price, cat_id, brand_id) 
values(17,
	   'Giày Cao Gót Trang Trí Nơ - Trắng', 
	   'Giày cao gót trang trí nơ nữ tính, thời trang. Gót thanh cao 7 cm và có đế chống trượt giúp di chuyển dễ dàng. Chất liệu da tổng hợp cao cấp, phù hợp mọi dịp: đi làm, dạo phố hoặc dự tiệc',
	   614000,
	   (select c.id from public.category as c where c.name = 'Giày cao gót'),
	   (select b.id from public.brand as b where b.brand_name = 'JUNO')
	  );
insert into public.product(id, name, description, price, cat_id, brand_id) 
values(18,
	   'Giày Cao Gót Bít Mũi Gót Thanh - Kem', 
	   'Giày cao gót bít mũi gót thanh nữ tính, thời trang. Gót cao 11 cm, phối quai mảnh mang lại cảm giác thon gọn cho bàn chân. Chất liệu da tổng hợp cao cấp, phù hợp mang mọi dịp: đi làm, đi tiệc, dạo phố.',
	   6140000,
	   (select c.id from public.category as c where c.name = 'Giày cao gót'),
	   (select b.id from public.brand as b where b.brand_name = 'JUNO')
	  );

insert into public.product(id, name, description, price, cat_id, brand_id) 
values(19,
	   'Giày Thể Thao GAT Shoes Black Lucas Shoes - Trắng', 
	   'Giày Thể Thao GAT Shoes Black Lucas Shoes, da bò thật, đế khâu cao 3cm, dễ phối đồ – BH 1 năm',
	   560000,
	   (select c.id from public.category as c where c.name = 'Giày thể thao'),
	   (select b.id from public.brand as b where b.brand_name = 'NIKE')
	  );
	  
insert into public.product(id, name, description, price, cat_id, brand_id) 
values(20,
	   'Giày Thể Thao LC2101 Đen Lucas Shoes - Đen', 
	   'Giày Thể Thao LC2101 Đen Lucas Shoes, da bò thật, đế khâu cao 3cm – BH 1 năm',
	   540000,
	   (select c.id from public.category as c where c.name = 'Giày thể thao'),
	   (select b.id from public.brand as b where b.brand_name = 'NIKE')
	  );

insert into public.product(id, name, description, price, cat_id, brand_id) 
values(21,
	   'Giày Sneaker Unisex Puma Clyde Huskie - Trắng', 
	   'Chìm đắm trong huyền thoại thời gian với Giày Sneaker Unisex Puma Clyde Huskie. Đôi giày này là một tác phẩm nghệ thuật thể hiện sự kết hợp hoàn hảo giữa lịch sử và phong cách đương đại, mang đến sự tự tin và làm nổi bật cá tính của bạn.',
	   3499000,
	   (select c.id from public.category as c where c.name = 'Giày thể thao'),
	   (select b.id from public.brand as b where b.brand_name = 'PUMA')
	  );

insert into public.product(id, name, description, price, cat_id, brand_id) 
values(22,
	   'Giày Thời Trang Unisex Puma Slipstream Xtreme Earth - Nâu', 
	   'Cảm nhận niềm vui của mỗi bước đi khi giày thể thao Slipstream Xtreme đưa phong cách và sự thoải mái của bạn lên một tầm cao mới. Thiết kế độc đáo, ấn tượng của đôi giày chắc chắn sẽ khiến bạn trở nên nổi bật dù ở bất kỳ đâu.',
	   4099000,
	   (select c.id from public.category as c where c.name = 'Giày thể thao'),
	   (select b.id from public.brand as b where b.brand_name = 'PUMA')
	  );

insert into public.product(id, name, description, price, cat_id, brand_id) 
values(23,
	   'Giày Mocasin Nam BITI''S BMM000477 - Nâu', 
	   'Giày Mocasin Nam BITI''S BMM000477 là một “người bạn đồng hành” không thể thiếu của phái mạnh trong những bữa tiệc tùng hay sự kiện quan trọng. Nếu bạn đang tìm kiếm một sản phẩm nam tính, chất lượng và có chính sách bảo hành tuyệt vời thì có thể tham khảo ngay mẫu này.',
	   785000,
	   (select c.id from public.category as c where c.name = 'Giày tây'),
	   (select b.id from public.brand as b where b.brand_name = 'BITI''S')
	  );

insert into public.product(id, name, description, price, cat_id, brand_id) 
values(24,
	   'Giày Tây Nam BITI''S BMM000777 - Đen', 
	   'Giày Tây Nam BITI''S BMM000777 là một vật phẩm không thể thiếu trong bộ sưu tầm giày của các phái mạnh. Nếu bạn đang tìm kiếm một sản phẩm nam tính, chất lượng và có chính sách bảo hành tuyệt vời thì có thể tham khảo ngay mẫu này.',
	   776000,
	   (select c.id from public.category as c where c.name = 'Giày tây'),
	   (select b.id from public.brand as b where b.brand_name = 'BITI''S')
	  );

insert into public.product(id, name, description, price, cat_id, brand_id) 
values(25,
	   'Giày Tây Nam BITI''S BVM001377 - Đen', 
	   'Giày Tây Nam BITI''S BVM001377 là một vật phẩm không thể thiếu trong bộ sưu tầm giày của các phái mạnh. Nếu bạn đang tìm kiếm một sản phẩm nam tính, chất lượng và có chính sách bảo hành tuyệt vời thì có thể tham khảo ngay mẫu này.',
	   785000,
	   (select c.id from public.category as c where c.name = 'Giày tây'),
	   (select b.id from public.brand as b where b.brand_name = 'BITI''S')
	  );

insert into public.product(id, name, description, price, cat_id, brand_id) 
values(26,
	   'Giày Tây Boot Nam BITI''S BVM001788 - Đen', 
	   'Giày Tây Boot Nam BITI''S BVM001788 là một vật phẩm không thể thiếu trong bộ sưu tầm giày của các phái mạnh. Nếu bạn đang tìm kiếm một sản phẩm nam tính, chất lượng và có chính sách bảo hành tuyệt vời thì có thể tham khảo ngay mẫu này.',
	   1668000,
	   (select c.id from public.category as c where c.name = 'Giày tây'),
	   (select b.id from public.brand as b where b.brand_name = 'BITI''S')
	  );

insert into public.product(id, name, description, price, cat_id, brand_id) 
values(27,
	   'Giày Mocasin Nam BITI''S BMM000677 - Nâu', 
	   'Giày Mocasin Nam BITI''s BMM000677 “chiều lòng” mọi phái mạnh. Bởi, sản phẩm có thiết kế sang trọng mà hiếm có đôi giày nào có được, chất liệu làm đế/quai chỉn chu và kèm nhiều điều nổi bật không thể phủ nhận khác.',
	   668000,
	   (select c.id from public.category as c where c.name = 'Giày tây'),
	   (select b.id from public.brand as b where b.brand_name = 'BITI''S')
	  );

insert into public.product(id, name, description, price, cat_id, brand_id) 
values(28,
	   'Giày da nam Penny Loafer trẻ trung cao cấp GNLAMJ238-F1-D - Đen', 
	   'Đường may chi tiết, tỉ mỉ theo tiêu chuẩn. Đế giày chắc chắn, chống trơn trượt. Màu sắc trang nhã, hài hòa. Giày lười nam thiết kế hiện đại, sang trọng phù hợp với các quý ông lịch lãm. Kết hợp cùng quần âu, kaki, trang phục lịch sự.',
	   1750000,
	   (select c.id from public.category as c where c.name = 'Giày tây'),
	   (select b.id from public.brand as b where b.brand_name = 'LAFORCE')
	  );

insert into public.product(id, name, description, price, cat_id, brand_id) 
values(29,
	   'Giày lười nam tăng chiều cao da trơn bóng GCLA798-R1-D - Đen', 
	   'Thiết kế kiểu dáng Loafer hiện đại, thời thượng. Đế độn gót 6cm không lộ, dễ di chuyển. Màu sắc trang nhã, hài hòa. Thiết kế giày cao nam công sở, trẻ trung. Kết hợp cùng quần âu, kaki, trang phục lịch sự.',
	   2190000,
	   (select c.id from public.category as c where c.name = 'Giày tây'),
	   (select b.id from public.brand as b where b.brand_name = 'LAFORCE')
	  );

insert into public.product(id, name, description, price, cat_id, brand_id) 
values(30,
	   'Giày lười nam da bò mặt da cá đuối đẹp GNLAJD6611-1028-D - Đen', 
	   'Thiết kế giày lười phối da hiện đại: Mặt trên làm từ da cá đuối, má giày làm bằng da bò. Thiết kế mũi nhọn hiện đại, thời thượng. Họa tiết in hình quả trám sang trọng.',
	   2100000,
	   (select c.id from public.category as c where c.name = 'Giày tây'),
	   (select b.id from public.brand as b where b.brand_name = 'LAFORCE')
	  );

insert into public.product(id, name, description, price, cat_id, brand_id) 
values(31,
	   'Giày lười nam tăng chiều cao Penny Loafer GCLA926-6-N - Nâu', 
	   'Da bò thật 100%, Tăng chiều cao 5-7cm. Thiết kế tăng chiều cao với lớp đệm cao su đàn hồi, dễ sử dụng. Kiểu dáng Penny hiện đại, trẻ trung. Dòng giày đế cao nam lót cao su chống trơn trượt. Dễ dàng phối cùng nhiều loại trang phục nơi công sở.',
	   2150000,
	   (select c.id from public.category as c where c.name = 'Giày tây'),
	   (select b.id from public.brand as b where b.brand_name = 'LAFORCE')
	  );

insert into public.product(id, name, description, price, cat_id, brand_id) 
values(32,
	   'Giày lười da nam họa tiết caro lịch lãm GNLA2122-N - Nâu', 
	   'Từng đường may kép tỉ mỉ, chắc chắn chạy quanh giày. Thiết kế giày lười nam họa tiết đan caro độc đáo tạo sự trẻ trung. Mũi giày tròn. Đế giày thiết kế chống trơn, trượt.',
	   1750000,
	   (select c.id from public.category as c where c.name = 'Giày tây'),
	   (select b.id from public.brand as b where b.brand_name = 'LAFORCE')
	  );

insert into public.product(id, name, description, price, cat_id, brand_id) 
values(33,
	   'GIÀY LƯỜI NAM ESQUIRE - Nâu', 
	   'Đế giày được ứng dụng công nghệ ALDO FLEX độc quyền với chất liệu mềm mại và vô cùng dẻo dai mang lại sự thoải mái vượt trội, tăng khả năng kiểm soát bàn chân, giữ thăng bằng cho cơ thể và giảm phản lực cho chân khi tiếp đất giúp bạn có thể di chuyển linh hoạt, nhanh chóng và dễ dàng hoạt động suốt ngày dài.',
	   1750000,
	   (select c.id from public.category as c where c.name = 'Giày tây'),
	   (select b.id from public.brand as b where b.brand_name = 'ALDO')
	  );

insert into public.product(id, name, description, price, cat_id, brand_id) 
values(34,
	   'GIÀY LƯỜI NAM ESQUIRE - Navy', 
	   'Đế giày được ứng dụng công nghệ ALDO FLEX độc quyền với chất liệu mềm mại và vô cùng dẻo dai mang lại sự thoải mái vượt trội, tăng khả năng kiểm soát bàn chân, giữ thăng bằng cho cơ thể và giảm phản lực cho chân khi tiếp đất giúp bạn có thể di chuyển linh hoạt, nhanh chóng và dễ dàng hoạt động suốt ngày dài.',
	   1000000,
	   (select c.id from public.category as c where c.name = 'Giày tây'),
	   (select b.id from public.brand as b where b.brand_name = 'ALDO')
	  );

insert into public.product(id, name, description, price, cat_id, brand_id) 
values(35,
	   'GIÀY CÔNG SỞ NAM ADDEN - Beige', 
	   'Từ thiết kế hiện đại đến chi tiết tua rua sang trọng, không thể phủ nhận vẻ quyến rũ bóng bẩy của đôi giày lười sang trọng này.',
	   899000,
	   (select c.id from public.category as c where c.name = 'Giày tây'),
	   (select b.id from public.brand as b where b.brand_name = 'ALDO')
	  );

insert into public.product(id, name, description, price, cat_id, brand_id) 
values(36,
	   'GIÀY TÂY NAM GRANDSPEC - Navy', 
	   'Đế giày được ứng dụng công nghệ ALDO FLEX độc quyền với chất liệu mềm mại và vô cùng dẻo dai mang lại sự thoải mái vượt trội, tăng khả năng kiểm soát bàn chân, giữ thăng bằng cho cơ thể và giảm phản lực cho chân khi tiếp đất giúp bạn có thể di chuyển linh hoạt, nhanh chóng và dễ dàng hoạt động suốt ngày dài.',
	   1000000,
	   (select c.id from public.category as c where c.name = 'Giày tây'),
	   (select b.id from public.brand as b where b.brand_name = 'ALDO')
	  );

insert into public.product(id, name, description, price, cat_id, brand_id) 
values(37,
	   'GIÀY TÂY NAM DUMOND - Nâu', 
	   'Đế giày được ứng dụng công nghệ ALDO FLEX độc quyền với chất liệu mềm mại và vô cùng dẻo dai mang lại sự thoải mái vượt trội, tăng khả năng kiểm soát bàn chân, giữ thăng bằng cho cơ thể và giảm phản lực cho chân khi tiếp đất giúp bạn có thể di chuyển linh hoạt, nhanh chóng và dễ dàng hoạt động suốt ngày dài.',
	   1125000,
	   (select c.id from public.category as c where c.name = 'Giày tây'),
	   (select b.id from public.brand as b where b.brand_name = 'ALDO')
	  );

insert into public.product(id, name, description, price, cat_id, brand_id) 
values(38,
	   'Sandal Thể Thao Eva Phun Nam BITI''S HEM000500 - Beige', 
	   'Với thiết kế đơn giản nhưng vẫn có phần năng động và sang trọng nên sẽ phù hợp với nhiều phong cách và trang phục khác nhau. Đế giày Sandal Thể Thao Eva Phun Nam Biti’s HEM000500 được làm từ chất liệu IP cao su cao cấp, có tính đàn hồi cao nên mang lại cảm giác êm ái ngay cả khi mang trong thời gian dài. Thiết kế quai trong từ chất liệu Si Nubucks êm ái và bện ngoài bằng quai dù giúp tăng độ thông thoáng và thoải mái cho bàn chân cả ngày dưới mọi thời tiết dù ngày nắng hay ngày mưa. Sản phẩm có 3 lựa chọn màu trung tính (đen, kem và xám), phù hợp với nhiều độ tuổi phái mạnh và dễ dàng phối đồ được nhiều phong cách khác nhau. Sản phẩm có dải size rộng từ 39-44 phù hợp với đa dạng kích thước bàn chân. Giày Sandal Thể Thao Eva Phun Nam BITI''S HEM000500 phù hợp với nhiều mục đích khách nhau như đi học, đi chơi, đi làm hay đi dạo, v.v...Dễ dàng vệ sinh và bảo quản.',
	   457000,
	   (select c.id from public.category as c where c.name = 'Giày sandal'),
	   (select b.id from public.brand as b where b.brand_name = 'BITI''S')
	  );

insert into public.product(id, name, description, price, cat_id, brand_id) 
values(39,
	   'Sandal Nam BITI''S Hunter Tonic DEMH00400 - Đen', 
	   'Thiết kế đơn giản, tinh tế nhưng lại cực kỳ thu hút, bắt mắt. Màu sắc hiện đại, phù hợp với nhiều độ tuổi sử dụng khác nhau. Chất liệu được chọn lọc kỹ lưỡng và xử lý cẩn trọng theo đúng quy trình tiêu chuẩn. Qua đó cho ra thành phẩm chất lượng cao cấp và bền bỉ hơn bao giờ hết. Thích hợp với nhiều mục đích sử dụng khác nhau như đi học, đi làm, đi chơi. Bố trí thêm chốt gài chắc chắn ở quai giày, giúp ôm trọn đôi chân trong từng cử động. Bên dưới bề mặt đế còn có nhiều rãnh, đảm bảo chống trơn, chống trượt, phòng trường hợp phải di chuyển ở bề mặt trơn, ẩm ướt. Dễ dàng vệ sinh khi cần. Ít bị phai màu, ảnh hưởng đến tính thẩm mỹ của Sandal Nam BITI''S Hunter Tonic DEMH00400.',
	   457000,
	   (select c.id from public.category as c where c.name = 'Giày sandal'),
	   (select b.id from public.brand as b where b.brand_name = 'BITI''S')
	  );

insert into public.product(id, name, description, price, cat_id, brand_id) 
values(40,
	   'Sandal Nam BITI''S BPM001100 - Đen', 
	   'BITI''S BPM001100 sở hữu kiểu dáng đơn giản, thanh toát tạo nên sự phóng khoáng, năng động nhưng rất lịch sự cho người sử dụng. Đế giày vừa phải và còn được sử dụng chất liệu PU mềm mại, êm chân. Sandal thiết kế thoáng đảm bảo lưu thông không khí, ngăn ngừa tình trạng tích tụ mồ hôi và gây mùi trong quá trình sử dụng. Phần quai hậu thiết kế chắc chắn, đảm bảo không tuột gót khi mang. Chất liệu da tổng hợp bền đẹp, chống thấm nước hiệu quả.',
	   358000,
	   (select c.id from public.category as c where c.name = 'Giày sandal'),
	   (select b.id from public.brand as b where b.brand_name = 'BITI''S')
	  );

insert into public.product(id, name, description, price, cat_id, brand_id) 
values(41,
	   'Sandal Si Cao Su Nam BITI''S BRM000900 - Nâu', 
	   'Thiết kế sang trọng, đẹp mắt, phù hợp trong nhiều hoàn cảnh như đi học, đi chơi,...Thích hợp làm quà tặng cho người thân, bạn bè. Chất liệu tốt, bền, phù hợp với nhiều loại da. Đế sandal có khả năng chống trơn trượt, chống thấm nước, chống bám dính mồ hôi vô cùng tốt. Tạo sự thoải mái, tự tin cho người dùng trong những hoạt động thường ngày.',
	   339000,
	   (select c.id from public.category as c where c.name = 'Giày sandal'),
	   (select b.id from public.brand as b where b.brand_name = 'BITI''S')
	  );

insert into public.product(id, name, description, price, cat_id, brand_id) 
values(42,
	   'Sandal Si Cao Su Nam BITI''S BPM000300 - Đen', 
	   'Sandal có kiểu dáng đơn giản, màu sắc trung tính nên có thể dễ dàng phối với nhiều trang phục khác nhau. Phù hợp với nhiều độ tuổi. Đế sandal được làm từ chất liệu IP- cao su cao cấp nên độ bền cao, thời gian sử dụng lâu dài. Thiết kế quai dây giúp tăng độ thông thoáng và thoải mái cho bàn chân cả ngày, dưới mọi thời tiết dù ngày nắng hay ngày mưa. Sản phẩm có nhiều size đáp ứng được đa dạng form bàn chân của khách hàng. Với sandal BITI''S BPM000300, các bạn hoàn toàn có thể sử dụng khi đi học, đi chơi, đi dạo,...',
	   373000,
	   (select c.id from public.category as c where c.name = 'Giày sandal'),
	   (select b.id from public.brand as b where b.brand_name = 'BITI''S')
	  );

insert into public.product(id, name, description, price, cat_id, brand_id) 
values(43,
	   'Giày Sandal Nữ Arla Jacory Wedge - Xám', 
	   'Giày Arla jacory từ Cloudsteppers của Clarks được lấy cảm hứng từ thể thao, đôi dép quai ngang. Được thiết kế dành cho bạn, đôi dép này có công nghệ đệm mềm mang lại sự thoải mái không thể tin được. Móc sau và vòng buộc giúp chúng có thể điều chỉnh được đồng thời mang lại sự vừa vặn an toàn. Đế giữa giúp dép nhẹ và tuyệt vời khi đi dạo trên bãi biển hoặc tham quan một thành phố mới.',
	   1159931,
	   (select c.id from public.category as c where c.name = 'Giày sandal'),
	   (select b.id from public.brand as b where b.brand_name = 'CLARKS')
	  );

insert into public.product(id, name, description, price, cat_id, brand_id) 
values(44,
	   'Giày Sandal Đế Xuồng Da Nữ Clarks Velhill Strap - Nâu', 
	   'Thân giày bằng da nubuck không có đường viền, có nguồn gốc rõ ràng. Dây đeo có khóa cung cấp một sự phù hợp an toàn, tùy chỉnh. Cấu trúc may Archival Polyveldt cho phép mức sử dụng số lượng vật liệu thấp hơn và giúp giảm lãng phí. Lớp lót xung quanh bằng da giúp tăng khả năng thoáng khí. Đế ngoài EVA nhẹ, sử dụng chất liệu sinh học, có độ đàn hồi cao giúp hấp thụ sốc và mang lại độ bám chắc chắn.',
	   3731000,
	   (select c.id from public.category as c where c.name = 'Giày sandal'),
	   (select b.id from public.brand as b where b.brand_name = 'CLARKS')
	  );

insert into public.product(id, name, description, price, cat_id, brand_id) 
values(45,
	   'Giày Sandal Đế Xuồng Da Nữ Clarks Kimmei Ivy - Beige', 
	   'Phần trên bằng da cao cấp, có nguồn gốc rõ ràng. Quai đeo có khóa có thể điều chỉnh mang đến sự vừa vặn an toàn, có thể tùy chỉnh. Lớp lót chân có đệm, độ đàn hồi cao mang lại sự thoải mái lâu dài. Lớp lót mãi mũi giày và xung quanh giày bằng da thoáng khí. Đế giày bằng cao su có độ bám ổn định.',
	   3917000,
	   (select c.id from public.category as c where c.name = 'Giày sandal'),
	   (select b.id from public.brand as b where b.brand_name = 'CLARKS')
	  );

insert into public.product(id, name, description, price, cat_id, brand_id) 
values(46,
	   'Giày Sandal Vải Nữ Clarks Arla Shore - Đen', 
	   'Thân trên bằng vải dệt mềm. Quai hậu có thể điều chỉnh mang lại sự an toàn, phù hợp tùy chỉnh. Có thể giặt bằng máy để dễ dàng chăm sóc trong thời tiết ấm áp. Đệm chân đệm mềm ™ mang lại sự thoải mái lâu dài. Trụ ngón chân mềm. Đế giữa EVA nhẹ hỗ trợ và đệm cho bàn chân của bạn.',
	   1202600,
	   (select c.id from public.category as c where c.name = 'Giày sandal'),
	   (select b.id from public.brand as b where b.brand_name = 'CLARKS')
	  );

insert into public.product(id, name, description, price, cat_id, brand_id) 
values(47,
	   'Giày Sandal Đế Xuồng Da Nữ Clarks KimmeiHi Strap - Nâu', 
	   'Phần trên bằng da lộn cao cấp, có nguồn gốc rõ ràng. Dây đeo có khóa có thể điều chỉnh mang lại sự phù hợp an toàn, có thể tùy chỉnh. Lớp lót chân, đệm bằng bọt xốp có độ đàn hồi cao mang lại sự thoải mái lâu dài.  Lớp lót tại mũi và xung quanh giày bằng da thoáng khí. Đế ngoài được làm bằng cao su có độ bám ổn định.',
	   4408000,
	   (select c.id from public.category as c where c.name = 'Giày sandal'),
	   (select b.id from public.brand as b where b.brand_name = 'CLARKS')
	  );

insert into public.product(id, name, description, price, cat_id, brand_id) 
values(48,
	   'Giày sandals cao gót Selene Strappy - Trắng', 
	   'Tạm biệt sự rườm rà, giày sandals Selene Strappy chính là bản tuyên ngôn của chủ nghĩa tối giản hiện đại. Với phom dáng sandals thanh thoát cùng mũi vuông thời thượng, Selene Strappy hứa hẹn sẽ giúp bạn nâng tầm phong cách chỉ trong nháy mắt. Bên cạnh đó, phần đế platform thoải mái và lót đệm êm ái cũng là một điểm cộng đảm bảo nâng niu đôi bàn chân của bạn suốt ngày dài.',
	   1590000,
	   (select c.id from public.category as c where c.name = 'Giày sandal'),
	   (select b.id from public.brand as b where b.brand_name = 'CHARLES & KEITH')
	  );

insert into public.product(id, name, description, price, cat_id, brand_id) 
values(49,
	   'Giày sandals Crossover - Trắng', 
	   'Vào những ngày cuối tuần cần một item mang lại sự tiện lợi và thoải mái tối đa thì đôi giày Crossover chính là sự lựa chọn hoàn hảo. Được hoàn thiện với tông màu trắng tinh khiết kết hợp cùng chi tiết quai chéo độc đáo, Crossover tuy đơn giản nhưng hứa hẹn sẽ tô điểm cho phong cách cá nhân của bạn thêm phần thanh lịch và sang trọng. Đặt biệt, đôi giày còn được tích hợp phần dây đeo có khóa tiện lợi giúp bạn có thể điều chỉnh vừa vặn quanh mắt cá chân nhằm đảm bảo sự thoải mái khi mang cả ngày.',
	   1490000,
	   (select c.id from public.category as c where c.name = 'Giày sandal'),
	   (select b.id from public.brand as b where b.brand_name = 'CHARLES & KEITH')
	  );

insert into public.product(id, name, description, price, cat_id, brand_id) 
values(50,
	   'Giày sandals Crossover - Đen', 
	   'Vào những ngày cuối tuần cần một item mang lại sự tiện lợi và thoải mái tối đa thì đôi giày Crossover chính là sự lựa chọn hoàn hảo. Được hoàn thiện với tông màu trắng tinh khiết kết hợp cùng chi tiết quai chéo độc đáo, Crossover tuy đơn giản nhưng hứa hẹn sẽ tô điểm cho phong cách cá nhân của bạn thêm phần thanh lịch và sang trọng. Đặt biệt, đôi giày còn được tích hợp phần dây đeo có khóa tiện lợi giúp bạn có thể điều chỉnh vừa vặn quanh mắt cá chân nhằm đảm bảo sự thoải mái khi mang cả ngày.',
	   1490000,
	   (select c.id from public.category as c where c.name = 'Giày sandal'),
	   (select b.id from public.brand as b where b.brand_name = 'CHARLES & KEITH')
	  );

insert into public.product(id, name, description, price, cat_id, brand_id) 
values(51,
	   'Giày sandals V-Strap - Kem', 
	   'Đôi giày V-Strap sẽ là sự lựa chọn lý tưởng cho những người yêu thích phong cách tối giản và tinh tế. Với thiết kế quai hình chữ V thanh lịch kết hợp cùng màu kem nhẹ nhàng, V-Strap sẽ ngay lập tức nâng tầm sự độc đáo, ấn tượng cho bất kỳ bộ trang phục nào bạn kết hợp cùng. Đặt biệt, V-Strap còn được tích hợp phần khóa phía sau cho phép bạn điều chỉnh sao cho vừa vặn với đôi chân nhất nhằm đảm bảo sự thoải mái khi mang cả ngày. Với khả năng thoáng khí và linh hoạt thì đôi giày hứa hẹn sẽ là người đồng hành lý tưởng cho mỗi bước chân của bạn.',
	   1290000,
	   (select c.id from public.category as c where c.name = 'Giày sandal'),
	   (select b.id from public.brand as b where b.brand_name = 'CHARLES & KEITH')
	  );

insert into public.product(id, name, description, price, cat_id, brand_id) 
values(52,
	   'Giày sandals V-Strap - Đen', 
	   'Đôi giày V-Strap sẽ là sự lựa chọn lý tưởng cho những người yêu thích phong cách tối giản và tinh tế. Với thiết kế quai hình chữ V thanh lịch kết hợp cùng màu kem nhẹ nhàng, V-Strap sẽ ngay lập tức nâng tầm sự độc đáo, ấn tượng cho bất kỳ bộ trang phục nào bạn kết hợp cùng. Đặt biệt, V-Strap còn được tích hợp phần khóa phía sau cho phép bạn điều chỉnh sao cho vừa vặn với đôi chân nhất nhằm đảm bảo sự thoải mái khi mang cả ngày. Với khả năng thoáng khí và linh hoạt thì đôi giày hứa hẹn sẽ là người đồng hành lý tưởng cho mỗi bước chân của bạn.',
	   1290000,
	   (select c.id from public.category as c where c.name = 'Giày sandal'),
	   (select b.id from public.brand as b where b.brand_name = 'CHARLES & KEITH')
	  );

insert into public.product(id, name, description, price, cat_id, brand_id) 
values(53,
	   'Giày Cao Gót Quai Hậu Khoá Trang Trí Xé Dán - Trắng', 
	   'Giày cao gót quai hậu khoá trang trí xé dán thiết kế tối giản, tiện lợi. Gót cao 5cm kèm miếng đệm chống trơn trượt cho bạn dễ dàng di chuyển. Chất liệu da cao cấp tổng hợp. Giày phù hợp đi mọi dịp, như đi làm, dạo phố.',
	   349000,
	   (select c.id from public.category as c where c.name = 'Giày cao gót'),
	   (select b.id from public.brand as b where b.brand_name = 'JUNO')
	  );

insert into public.product(id, name, description, price, cat_id, brand_id) 
values(54,
	   'Giày Cao Gót Khoá Trang Trí Kim Loại - Đen', 
	   'Giày cao gót khoá trang trí kim loại sang trọng. Mũi nhọn mang lại cảm giác thon gọn cho bàn chân. Đế cao 7cm kèm rãnh chống trượt. Chất liệu da tổng hợp cao cấp, phù hợp mang nhiều dịp: đi làm, dạo phố hay dự tiệc.',
	   349000,
	   (select c.id from public.category as c where c.name = 'Giày cao gót'),
	   (select b.id from public.brand as b where b.brand_name = 'JUNO')
	  );

insert into public.product(id, name, description, price, cat_id, brand_id) 
values(55,
	   'Giày Cao Gót Quai Hậu Xé Dán Có Khoá - Đen', 
	   'Giày cao gót quai hậu xé dán có khoá tiện lợi. Cao 5cm và có đế chống trượt giúp di chuyển dễ dàng. Chất liệu da tổng hợp cao cấp, phù hợp mọi dịp: đi làm, dạo phố hoặc dự tiệc.',
	   449000,
	   (select c.id from public.category as c where c.name = 'Giày cao gót'),
	   (select b.id from public.brand as b where b.brand_name = 'JUNO')
	  );


insert into public.product(id, name, description, price, cat_id, brand_id) 
values(56,
	   'Giày bít mũi nhọn stiletto heel BMN 0647 - Đỏ', 
	   'Loại sản phẩm: Giày cao gót
Kiểu gót: Gót nhọn
Độ cao gót: 8.5 cm
Loại mũi: Bít mũi nhọn
Chất liệu: Da nhân tạo
Kiểu giày: Pumps
Phù hợp sử dụng: Đi làm, đi tiệc, đi chơi.',
	   663000,
	   (select c.id from public.category as c where c.name = 'Giày cao gót'),
	   (select b.id from public.brand as b where b.brand_name = 'VASCARA')
	  );

insert into public.product(id, name, description, price, cat_id, brand_id) 
values(57,
	   'Giày slingback mũi tròn quai mary janes BMN 0640 - Beige', 
	   'Loại sản phẩm: Giày cao gót
Kiểu gót: Gót dạng khối
Độ cao gót: 5.5 cm
Loại mũi: Bít mũi tròn
Chất liệu: Da nhân tạo
Kiểu giày: Pumps
Phù hợp sử dụng: Đi làm, đi tiệc, đi chơi',
	   663000,
	   (select c.id from public.category as c where c.name = 'Giày cao gót'),
	   (select b.id from public.brand as b where b.brand_name = 'VASCARA')
	  );

insert into public.product(id, name, description, price, cat_id, brand_id) 
values(58,
	   'Giày bít mũi nhọn slingback spool heel metallic BMN 0629 - Đen', 
	   'Loại sản phẩm: Giày cao gót
Kiểu gót: Gót nhọn
Độ cao gót: 9 cm
Loại mũi: Bít mũi nhọn
Chất liệu: Da nhân tạo phủ bóng
Kiểu giày: Pumps
Phù hợp sử dụng: Đi làm, đi tiệc, đi chơi',
	   653000,
	   (select c.id from public.category as c where c.name = 'Giày cao gót'),
	   (select b.id from public.brand as b where b.brand_name = 'VASCARA')
	  );

insert into public.product(id, name, description, price, cat_id, brand_id) 
values(59,
	   'Giày bít mũi vuông gót trụ loe BMN 0621 - Đen', 
	   'Loại sản phẩm: Giày cao gót
Kiểu gót: Gót dạng khối
Độ cao gót: 5.5 cm
Loại mũi: Bít mũi vuông
Chất liệu: Da nhân tạo
Kiểu giày: Pumps
Phù hợp sử dụng: Đi làm, đi tiệc, đi chơi',
	   653000,
	   (select c.id from public.category as c where c.name = 'Giày cao gót'),
	   (select b.id from public.brand as b where b.brand_name = 'VASCARA')
	  );

insert into public.product(id, name, description, price, cat_id, brand_id) 
values(60,
	   'Giày sandal metallic quai mảnh SDN 0762 - Xám', 
	   'Loại sản phẩm: Giày cao gót
Kiểu gót: Gót nhọn
Độ cao gót: 9 cm
Loại mũi: Hở mũi (mũi vuông)
Chất liệu: Da nhân tạo phủ ánh kim
Kiểu giày: Sandals',
	   682000,
	   (select c.id from public.category as c where c.name = 'Giày cao gót'),
	   (select b.id from public.brand as b where b.brand_name = 'VASCARA')
	  );

insert into public.product(id, name, description, price, cat_id, brand_id) 
values(61,
	   'Giày Boot ROSSDALE HI GORE TEX BLACK LEATHER - Đen', 
	   'Giày boot chống thấm nước Rossdale Hi GORE-TEX mang đến nét thẩm mỹ tiện dụng trong mùa thu đông này. Được hỗ trợ cho mọi thứ nhờ thân trên bằng GORE-TEX đàn hồi và đế có rãnh bám chắc.',
	   682000,
	   (select c.id from public.category as c where c.name = 'Giày boot'),
	   (select b.id from public.brand as b where b.brand_name = 'CLARKS')
	  );

insert into public.product(id, name, description, price, cat_id, brand_id) 
values(62,
	   'Giày Boot MORRIS PEAK BROWN TUMB - Nâu', 
	   'Giày boot MORRIS PEAK được thiết kế để sử dụng hàng ngày. Được làm bằng da mềm mang lại sự thoải mái tối đa, tính năng chống thấm nước chắc chắn giúp bạn thoải mái ngay cả trong thời tiết khắc nghiệt.',
	   1968153,
	   (select c.id from public.category as c where c.name = 'Giày boot'),
	   (select b.id from public.brand as b where b.brand_name = 'CLARKS')
	  );

insert into public.product(id, name, description, price, cat_id, brand_id) 
values(63,
	   'Giày Boot ATTICUS LT HI COGNAC SUEDE - Nâu', 
	   'Hoàn toàn cân bằng giữa sự thông minh và giản dị, đôi giày sang trọng Atticus LT Hi của chúng tôi kết hợp các chất liệu cao cấp với sự thoải mái ở cấp độ tiếp theo. Một kiểu dáng thanh mảnh được làm từ da lộn sáp mềm như bơ.',
	   2214203,
	   (select c.id from public.category as c where c.name = 'Giày boot'),
	   (select b.id from public.brand as b where b.brand_name = 'CLARKS')
	  );

insert into public.product(id, name, description, price, cat_id, brand_id) 
values(64,
	   'Giày Boot CLARKHILL MID DARK TAN LEATHER - Nâu', 
	   'Resilience là tên đệm của giày bốt buộc dây Clarkhill Mid! Đủ cứng cáp cho những chuyến du ngoạn trong đô thị và những chuyến đi bộ đường dài xuyên quốc gia, đôi giày này nằm trên đế ngoài bằng cao su có gờ siêu bám và được trang bị đường khâu bằng da bão để tăng thêm độ bền. Nó cũng được xếp chồng lên nhau với những chi tiết thủ công đích thực – giống như đường khâu chính xác trang trí phần trên bằng da lộn màu xám đậm. Hãy xỏ chân vào, buộc dây và để miếng lót chân Contour Cushion của đôi này giúp mỗi bước đi của bạn luôn có cảm giác nhẹ nhàng và thoáng mát, dù đôi chân bạn đưa bạn đến đâu.',
	   3075378,
	   (select c.id from public.category as c where c.name = 'Giày boot'),
	   (select b.id from public.brand as b where b.brand_name = 'CLARKS')
	  );

insert into public.product(id, name, description, price, cat_id, brand_id) 
values(65,
	   'Giày Boot CLARKDALE EASY BEESWAX LEATHER - Nâu', 
	   'Cổ điển và tinh tế nhất có thể, hãy tìm giày boot Clarkdale Easy. Một hình dáng nổi bật trong số các sản phẩm boot AW23 của chúng tôi, hồ sơ da này là câu trả lời cho mọi quy định về trang phục lịch sự. Nó nằm trên một đế ngoài bằng vải crepe tự nhiên đặc trưng với phần trên cùng bằng cao su bền và sử dụng đường viền bằng da cao cấp để mang lại cảm giác tiện dụng. Nó cũng mang lại cảm giác tuyệt vời như vẻ ngoài của nó, nhờ vào tấm lót chân Contour Cushion giúp mỗi bước đi luôn có cảm giác nhẹ nhàng và thoải mái.',
	   3936800,
	   (select c.id from public.category as c where c.name = 'Giày boot'),
	   (select b.id from public.brand as b where b.brand_name = 'CLARKS')
	  );


insert into public.product(id, name, description, price, cat_id, brand_id) 
values(66,
	   'Ankle boots gót trụ BOT 0930 - Đen', 
	   'Loại sản phẩm: Giày Boots
Kiểu gót: Gót dạng khối
Độ cao gót: 8 cm
Loại mũi: Bít mũi vuông
Chất liệu: Da nhân tạo
Kiểu giày: Boots
Phù hợp sử dụng: Đi chơi, đi làm, dạo phố',
	   977000,
	   (select c.id from public.category as c where c.name = 'Giày boot'),
	   (select b.id from public.brand as b where b.brand_name = 'VASCARA')
	  );

insert into public.product(id, name, description, price, cat_id, brand_id) 
values(67,
	   'Ankle boots gót trụ BOT 0930 - Beige', 
	   'Loại sản phẩm: Giày Boots
Kiểu gót: Gót dạng khối
Độ cao gót: 8 cm
Loại mũi: Bít mũi vuông
Chất liệu: Da nhân tạo
Kiểu giày: Boots
Phù hợp sử dụng: Đi chơi, đi làm, dạo phố',
	   977000,
	   (select c.id from public.category as c where c.name = 'Giày boot'),
	   (select b.id from public.brand as b where b.brand_name = 'VASCARA')
	  );

insert into public.product(id, name, description, price, cat_id, brand_id) 
values(68,
	   'Chelsea boot cổ cao BOT 0933 - Đen', 
	   'Loại sản phẩm: Giày Boots
Kiểu gót: Đế bánh mì
Độ cao gót: 4.5 cm
Loại mũi: Bít mũi tròn
Chất liệu: Da nhân tạo
Kiểu giày: Boots
Phù hợp sử dụng: Đi chơi, đi làm, dạo phố',
	   977000,
	   (select c.id from public.category as c where c.name = 'Giày boot'),
	   (select b.id from public.brand as b where b.brand_name = 'VASCARA')
	  );

insert into public.product(id, name, description, price, cat_id, brand_id) 
values(69,
	   'Combat boots cao cổ đế chunky BOT 0932 - Đen', 
	   'Loại sản phẩm: Giày Boots
Kiểu gót: Gót nhọn có đúp
Độ cao gót: 5 cm
Loại mũi: Bít mũi vuông
Chất liệu: Da nhân tạo
Hoa văn, chi tiết: Bề mặt bóng
Kiểu giày: Boots
Phù hợp sử dụng: Đi chơi, đi làm, dạo phố',
	   1075000,
	   (select c.id from public.category as c where c.name = 'Giày boot'),
	   (select b.id from public.brand as b where b.brand_name = 'VASCARA')
	  );


insert into public.product(id, name, description, price, cat_id, brand_id) 
values(70,
	   'All-day comfort chelsea boots gót trụ BOT 0925 - Đỏ', 
	   'Loại sản phẩm: Giày Boots
Kiểu gót: Gót đặc biệt
Độ cao gót: 7.5 cm
Loại mũi: Bít mũi vuông
Chất liệu: Microfiber
Kiểu giày: Boots
Phù hợp sử dụng: Đi chơi, đi làm, dạo phố',
	   1105000,
	   (select c.id from public.category as c where c.name = 'Giày boot'),
	   (select b.id from public.brand as b where b.brand_name = 'VASCARA')
	  );

insert into public.product(id, name, description, price, cat_id, brand_id) 
values(71,
	   'Giày boots cổ cao Metallic Buckled Ankle - Nâu', 
	   'Đắm mình vào nét độc đáo lấy cảm hứng từ phong cách grunge với đôi boots Metallic Buckled. Được hoàn thiện với gam màu nâu cổ điển kết hợp cùng phần dây kéo tiện lợi và chi tiết kim loại làm điểm nhấn, Metallic Buckled hứa hẹn sẽ mang lại cho bạn phong cách cá tính, độc đáo và cool ngầu không thể chối từ trong các bản phối trang phục. Ngoài ra, đôi giày còn được trang bị các gờ ở phần đế giúp tăng thêm lực ma sát để bạn có thể tự tin chinh phục mọi địa hình.',
	   2550000,
	   (select c.id from public.category as c where c.name = 'Giày boot'),
	   (select b.id from public.brand as b where b.brand_name = 'CHARLES & KEITH')
	  );

insert into public.product(id, name, description, price, cat_id, brand_id) 
values(72,
	   'Giày boots cổ cao Metallic Buckled Ankle - Đen', 
	   'Đôi giày boots Metallic Buckled sẽ góp phần tạo nên sự nổi bật cho outfit của bạn mà vẫn đủ linh hoạt để dễ dàng kết hợp với tủ quần áo hàng ngày. Lấy cảm hứng từ phong cách grunge độc đáo của thập niên 90 kết hợp với gam màu đen cổ điển và những chi tiết kim loại nổi bật, item này chắc chắn sẽ khiến bạn trở cá tính và cool ngầu hơn bao giờ hết.',
	   2550000,
	   (select c.id from public.category as c where c.name = 'Giày boot'),
	   (select b.id from public.brand as b where b.brand_name = 'CHARLES & KEITH')
	  );
	  
 
insert into public.product(id, name, description, price, cat_id, brand_id) 
values(73,
	   'Giày boots cao gót Lace & Mesh - Đen', 
	   'Hoàn thiện phong cách thời trang Thu - Đông của bạn với đôi giày boots Lace & Mesh thanh lịch, cổ điển. Được chế tác với lớp vải ren cầu kỳ cùng phần mũi giày thon dài và gót cao 9cm, đôi giày không những tạo nên hiệu ứng về mặt thị giác giúp bạn tăng chiều cao, tôn dáng mà còn là điểm nhấn tinh tế cho mọi bản phối mùa đông lạnh giá của bạn.',
	   2490000,
	   (select c.id from public.category as c where c.name = 'Giày boot'),
	   (select b.id from public.brand as b where b.brand_name = 'CHARLES & KEITH')
	  ); 

insert into public.product(id, name, description, price, cat_id, brand_id) 
values(74,
	   'Giày boots cổ cao Gabine Leather - Đen', 
	   'Hãy tự tin tỏa sáng tại bất kỳ sự kiện nào với đôi boots cổ cao Gabine sang trọng. Được làm từ chất liệu da thật có phom dáng vừa vặn, đôi boots với gót nhọn cao 8cm này đã tạo nên sự tương phản đầy ấn tượng giữa sự thoải mái và nghệ thuật. Điều đặc biệt nổi bật chính là chi tiết khóa Gabine trên bề mặt đen bóng, làm cho đôi boots trở thành điểm nhấn thời trang không thể bỏ qua. Cho dù bạn xuất hiện ở bất kỳ thời điểm nào, đôi boots này sẽ luôn giúp bạn tỏa sáng và giữ vị trí nổi bật trong mọi tình huống.',
	   4550000,
	   (select c.id from public.category as c where c.name = 'Giày boot'),
	   (select b.id from public.brand as b where b.brand_name = 'CHARLES & KEITH')
	  ); 


insert into public.product(id, name, description, price, cat_id, brand_id) 
values(75,
	   'Giày boots cổ cao đế trụ Devon Metallic Accent - Đen', 
	   'Đôi boots Devon hứa hẹn sẽ là sự lựa chọn hoàn hảo để giúp bạn cảm thấy ấm áp và đầy sang trọng trong suốt mùa đông này. Đầy phá cách với thiết kế chi tiết cổ cao đến tận đùi và độ ôm sát nhịp nhàng theo đôi chân trên một gam màu đen huyền bí, tất cả đã tạo nên một tổng thể thời thượng không chỉ giúp tôn lên đôi chân thon dài của các quý cô mà chắc chắn sẽ còn giúp bạn tạo nên những bản phối mùa đông đầy bùng nổ. Đặc biệt, phần đế trụ với chiều cao khiêm tốn 4cm, chắc chắn sẽ đem đến cho bạn sự thoải mái tối ưu suốt cả ngày.',
	   3090000,
	   (select c.id from public.category as c where c.name = 'Giày boot'),
	   (select b.id from public.brand as b where b.brand_name = 'CHARLES & KEITH')
	  ); 
	  
	  
	  