### 基于`impress`的个人简介(PS. 很久没更新)
:book: **[个人简介](http://www.monkindey.xyz/resume/)**

### 用面向对象的Javascript来介绍一下自己

```javascript
/**
 * 用面向对象的Javascript来介绍一下自己
 * 要利用js的特性
 * 1. 闭包 (封装)
 * 2. 原型继承
 * 3. 弱语言
 * 4. setTimeout
 * 5. call apply
 */
! function() {
	// HELPER
	function extend(sup, overrides) {
		var sub = overrides && overrides.constructor || function() {
			sup.apply(this, arguments);
		};
		var fn = function() {};
		var subp;
		fn.prototype = new sup;
		subp = sub.prototype = fn.prototype;
		subp.constructor = sub;
		apply(subp, overrides);
		sub.superClass = sup.prototype;
		return sub;
	}

	function apply(o, c) {
		if (o && c && typeof c == 'object') {
			for (var p in c) {
				o[p] = c[p];
			}
		}
		return o;
	}

	// 前端开发人员
	function FrontEnder() {
		this.skills = ['HTML', 'CSS', 'JavaScript'];
	}

	apply(FrontEnder.prototype, {
		code: function() {
			console.log('我能编写处理业务逻辑代码');
		},
		paint: function() {
			console.log('我能还原设计稿');
		},
		debug: function() {
			console.log('我能使用工具调试代码');
		}
	});

	var Me = extend(FrontEnder, {
		constructor: function() {
			// 个人的性格是怎么样的？等完善
			var _character = '';
			return function Me(config) {
				config = config || {};
				Me.superClass.constructor.call(this);
				this.skills = this.skills.concat(['HTML5', 'CSS3', 'Grunt', 'Zepto', 'Webapp']);
				apply(this, config);
			}
		}(),
		paint: function() {
			Me.superClass.paint.call(this);
			console.log('我可以用CSS3、HTML5还原设计稿');
		},
		code: function() {
			Me.superClass.code.call(this);
			console.log(function() {
				/**
				1. 根据规范来命名如驼峰、_、$等；
				2. 使用闭包来避免变量污染；
				3. 相同处理逻辑代码抽出来作为一个功能模块；
				4. 避免与HTML、CSS产生耦合；
				5. 注意代码的性能优化
				*/
			}.toString().split('\n').slice(2, -2).toString().replace(/\t/g, '').split(',').join('\n'))
		},
		manage: function() {
			console.log('我有一个属于自己的代码库和记录知识点的博客');
		},
		habit: function() {
			console.log('twitter、HTML5Rock、CSS3-trick、W3.org...');
		},
		enjoy: function() {
			console.log('我喜欢打篮球和看NBA，最喜欢的球员是Steve·Nash');
		}
	});

	var me = new Me({
		name: 'monkindey',
		email: 'monkindey@163.com',
		school: '广东工业大学'
	});

	console.dir(me);
}()

```
