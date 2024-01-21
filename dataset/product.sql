insert into public.product(id, name, description, price, cat_id, brand_id, color) 
values(1,
	   'GIÀY ADIDAS RUN 80S NAM - XÁM TRẮNG', 
	   'Giày adidas Run 80S là mẫu giày sneaker có thiết kế cổ điển của thập niên 80 nhưng rất đẹp và không bao giờ lỗi mốt. adidas Run 80S có thể sử dụng trong mọi hoạt động hàng ngày. Về thiết kế của adidas Run 80S với upper được làm từ chất liệu da lộn cao cấp kết hợp vải mesh thoáng khí, đế giữa chất liệu êm ái và đế ngoài bằng cao su bền bỉ chịu mài mòn tốt.',
	   1890000,
	   (select c.id from public.category as c where c.name = 'Giày thể thao'),
	   (select b.id from public.brand as b where b.brand_name = 'Adidas'),
	   'Xám trắng'
	  );
insert into public.product(id, name, description, price, cat_id, brand_id, color) 
values(2,
	   'GIÀY ADIDAS ULTRABOUNCE NAM- TRẮNG XÁM', 
	   'Giày Adidas Ultrabounce là mẫu giày thể thao mới nhất của adidas. Với thiết kế trẻ trung, khỏe khoắn, ôm sát bàn chân. Đế giày công nghệ Bounce siêu nhẹ và êm ái giúp bạn di chuyển cả ngày mà không mệt mỏi. Ngoài ra, Adidas Ultrabounce còn được làm với hơn 50% vật liệu thân thiện bảo vệ môi trường. Giày Adidas Ultrabounce là một lựa chọn hợp lý cho mọi hoạt động hàng ngày.',
	   1990000,
	   (select c.id from public.category as c where c.name = 'Giày thể thao'),
	   (select b.id from public.brand as b where b.brand_name = 'Adidas'),
	   'Trắng xám'
	  );
insert into public.product(id, name, description, price, cat_id, brand_id, color) 
values(3,
	   'GIÀY ADIDAS ULTRABOOST LIGHT NAM - ĐEN TRẮNG', 
	   'Giày adidas Ultraboost Light siêu phẩm giày thể thao mới nhất đến từ nhà adidas, với vật liệu và công nghệ tốt nhất được áp dụng tối đa cho sản này adidas Ultraboost Light xứng đáng trở thành niềm mơ ước của tín đồ giày thể thao chạy bộ.',
	   3690000,
	   (select c.id from public.category as c where c.name = 'Giày thể thao'),
	   (select b.id from public.brand as b where b.brand_name = 'Adidas'),
	   'Đen trắng'
	  );
insert into public.product(id, name, description, price, cat_id, brand_id, color) 
values(4,
	   'GIÀY ADIDAS ULTRABOOST LIGHT NỮ - HỒNG', 
	   'Giày adidas Ultraboost Light siêu phẩm giày thể thao mới nhất đến từ nhà adidas, với vật liệu và công nghệ tốt nhất được áp dụng tối đa cho sản này adidas Ultraboost Light xứng đáng trở thành niềm mơ ước của tín đồ giày thể thao chạy bộ.',
	   3690000,
	   (select c.id from public.category as c where c.name = 'Giày thể thao'),
	   (select b.id from public.brand as b where b.brand_name = 'Adidas'),
	   'Hồng'
	  );
insert into public.product(id, name, description, price, cat_id, brand_id, color) 
values(5,
	   'GIÀY ADIDAS GALAXY 6 NỮ - XANH', 
	   'Giày adidas Galaxy 6  có thiết kế thể thao đẹp mắt, đây là mẫu giày có thể sử dụng trong mọi hoạt động hàng ngày. adidas Galaxy 6 có nhiều cải tiến so với adidas Galaxy 5 giúp đôi giày ngày càng hoàn hảo. Công nghệ đế CloudFoam của Adidas chưa bao giờ làm Fan hâm mộ của họ thất vọng. Với cảm giác trải nghiệm giống như đi trên ''Mây'' đấy là những gì được người dùng chia sẻ lại. Form dáng thiết kế trẻ trung, khỏe khoắn nên đây sẽ là mẫu giày không thể thiếu cho những hoạt động vui chơi, thể thao. Ngoài ra, adidas Galaxy 6 sử dụng hơn 505 vật liệu tái chế thân thiện với môi trường.',
	   1390000,
	   (select c.id from public.category as c where c.name = 'Giày thể thao'),
	   (select b.id from public.brand as b where b.brand_name = 'Adidas'),
	   'Xanh'
	  );
insert into public.product(id, name, description, price, cat_id, brand_id, color) 
values(6,
	   'GIÀY NIKE AIR WINFLO 10 NAM - XÁM XANH', 
	   'Giày Nike Air Winflo 10 là một trong những mẫu giày thể thao đáng chờ đợi nhất năm 2023 này và thật tuyệt vời hiện tại siêu phẩm Winflo 10. Giày Nike Air Winflo 10 có nhiều sự cải tiến vượt trội so với mẫu Winflo 9 trước đó cả về kiểu dáng cũng như những công nghệ hỗ trợ đi kèm. Phần upper với chất liệu mesh cao cấp, mềm mại linh hoạt và rất thoáng khí. Phần đế giữa với bộ đệm full-length Air trứ danh giúp tăng cường độ êm và đàn hồi đồng đều trên toàn bộ bề mặt đế giày. Ngoài ra, phần mũi giày được cải tiến vừa vặn ngón chân khi sử dụng. Với thiết kế đẹp, công nghệ đỉnh cao, Nike Air Winflo 10 chắc chắn là mẫu giày thể thao không thể bỏ qua trong năm nay.',
	   2390000,
	   (select c.id from public.category as c where c.name = 'Giày thể thao'),
	   (select b.id from public.brand as b where b.brand_name = 'Nike'),
	   'Xám xanh'
	  );
insert into public.product(id, name, description, price, cat_id, brand_id, color) 
values(7,
	   'GIÀY NIKE REVOLUTION 7 NAM - XANH LAM', 
	   'Giày Nike Revolution 7 là một mẫu giày thể thao đa dụng có thiết kế cực đẹp và mức giá vô cùng tốt. Với nhiều cải tiến mới so với phiên bản Revolution 6 thì đây chắc chắn sẽ trở thành mẫu giày thể thao quốc dân của Nike trong năm nay. Nike Revolution 7 được trang bị bộ đệm dày hơn cho độ êm và đàn hồi tốt hơn phiên bản trước. Phần upper với chất liệu vải mesh thoáng khi bền chắc nhưng vẫn mang đến cảm giác mềm mại cho bàn chân. Đế giữa với chất liệu React cùng với cộng nghệ Zoom nổi tiếng của Nike khiến đôi giày cực êm và phản lực tốt. Thiết đế đễ giữa của Nike Revolution 7 là điểm cộng lớn với đường nét cực kỳ sắc nét, gọn gàng tinh tế. Đế ngoài chất liệu cao su chịu mài mòn và bám đường rất tốt khi di chuyển. ',
	   1690000,
	   (select c.id from public.category as c where c.name = 'Giày thể thao'),
	   (select b.id from public.brand as b where b.brand_name = 'Nike'),
	   'Xanh lam'
	  );
insert into public.product(id, name, description, price, cat_id, brand_id, color) 
values(8,
	   'GIÀY NIKE AIR MAX AXIS NỮ - TRẮNG', 
	   'Giày Nike Air Max Axis là mẫu giày được thiết kế với các đường nét thiết kế tinh tế. Đây là mẫu giày thừa hưởng những đặc điểm nổi bật từ các mẫu giày đáng tôn vinh trong quá khứ như Air Max 97 và Air Max 98, nhưng vẫn có một cái nhìn mới mẻ cho hiện tại và tương lai. Ngoài thiết kế độc đáo, Nike Air Max Axis còn mang đến sự thoải mái mới mẻ về sự thoải mái cho người sử dụng.',
	   2290000,
	   (select c.id from public.category as c where c.name = 'Giày thể thao'),
	   (select b.id from public.brand as b where b.brand_name = 'Nike'),
	   'Trắng'
	  );
insert into public.product(id, name, description, price, cat_id, brand_id, color) 
values(9,
	   'GIÀY PUMA V6 LOW NAM - TRẮNG XANH', 
	   'Giày Puma V6 Low là mẫu giày có thiết kế tuyệt đẹp cổ điển mà rất tinh tế. Chất liệu da cao cấp và đế cao su bền bỉ chắc chắn sẽ làm hài lòng những khách hàng khó tính nhất. Bạn sẽ luôn yên tâm rằng nó không bao giờ bị lỗi mốt.',
	   1790000,
	   (select c.id from public.category as c where c.name = 'Giày thể thao'),
	   (select b.id from public.brand as b where b.brand_name = 'Puma'),
	   'Trắng xanh'
	  );
insert into public.product(id, name, description, price, cat_id, brand_id, color) 
values(10,
	   'GIÀY PUMA PWRFRAME TR 2 NAM - NAVY ĐỎ', 
	   'Giày Puma PWRFrame TR 2 mẫu giày training có thiết kế rất đẹp cùng với những công nghệ cao cấp của Puma. Đây chính là mẫu giày đa năng tuyệt vời cho luyện tập thể thao, tập gym và các hoạt động hàng ngày.',
	   1890000,
	   (select c.id from public.category as c where c.name = 'Giày thể thao'),
	   (select b.id from public.brand as b where b.brand_name = 'Puma'),
	   'Navy đỏ'
	  );
insert into public.product(id, name, description, price, cat_id, brand_id, color) 
values(11,
	   'GIÀY PUMA SMASH CAT PERF FS SL NAM NỮ - TRẮNG GOLD', 
	   'Giày Puma Smash Cat Perf FS SL mẫu giày có thiết kế cổ điển mà tinh tế. Chất liệu da cao cấp và đế cao su bền bỉ chắc chắn sẽ làm hài lòng những khách hàng khó tính nhất. Bạn sẽ luôn yên tâm rằng nó không bao giờ bị lỗi mốt.',
	   1090000,
	   (select c.id from public.category as c where c.name = 'Giày thể thao'),
	   (select b.id from public.brand as b where b.brand_name = 'Puma'),
	   'Trắng gold'
	  );
	  
	  
	  
	  
	  
	  
	  
	  
	  
	  
	  
	  
	  