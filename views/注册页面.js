
	$(function () {
		function tip(content) {
			let _this = $('.tips').children('p')[0];
			clearTimeout(_this.hideTime);
				$('.tips').children('p').stop().fadeIn().text(content);
				_this.hideTime = setTimeout(() => {
					$('.tips').children('p').stop().fadeOut(2000);
				}, 2000);
		}

		$('.verify').on('click', function () {
			if ($(this).hasClass('disabled')) {
				return;
			}
			let phone = $(".mobile").val();
			if (isNaN(phone)) {
				alert('请输入正确的手机号码');
				return;
			}
			if (phone.length !== 11) {
				alert('请输入正确的手机号码');
				return;
			}

			$(this).addClass('disabled');

			let times = 10;

			let timer = setInterval(() => {
				times--;
				$(this).val('获取验证码(' + times + ')');
				if (times === 0) {
					clearInterval(timer);
					$(this).removeClass('disabled').val('获取验证码');
				}
			}, 1000);

			$.ajax({
				type: 'get',
				url: 'http://127.0.0.1:8888/getCodeWithoutPhone',
				success: function (res) {
					if (res) {
						tip('您的验证码是  ' + res.code + ' 来自-【大前端科技】');
						console.log(res.code);
					}
				},
				dataType: 'json'
			})
		});


		$('.name').on('blur', function () {
			let userName = $(this).val();
			console.log(userName);
			if(userName.trim().length === 0){
				tip('用户名不能为空');
				return;
			}
			$.ajax({
				type : 'get',
				url : 'http://127.0.0.1:8888/isUserNameExist',
				data : {
					userName
				},
				success : function(res){
					if(res.code != 200){
						tip(res.msg);
					}
				},
				dataType:'json'
			});
		});

		$('.submit ').on('click', function () {
			let userName = $('.name').val();
			if(userName.trim().length === 0){
				tip('用户名不能为空');
				return;
			}
			let pass = $('.pass').val();
			if(pass.trim().length === 0){
				tip('密码不能为空');
				return;
			}
			let repass = $('.repass').val();
			if(repass.trim().length === 0){
				tip('确认密码不能为空');
				return;
			}
			let mobile = $('.mobile').val();
			if(mobile.trim().length === 0){
				tip('手机号不能为空');
				return;
			}
			let code = $('.code').val();
			if(code.trim().length === 0){
				tip('验证码不能为空');
				return;
			}
			if(pass !== repass){
				tip('再次密码不一致');
				return;
			}
			$.ajax({
				type: 'post',
				url : '/doRegister',
				data : {
					userName,
					password : pass,
					phone : mobile
				},
				dataType : 'json',
				success : function(res){
					if(res.code != 200){
						tip(res.msg);
					}else {
						tip('注册成功，稍后会为您跳转到登录页面');
						setTimeout(() => {
							location.href = './login.html';
						}, 2000);
					}
				}
			});			
		});
	});

