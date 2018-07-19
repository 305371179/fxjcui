import canvasImg from '../assets/lottery2.png'

export default class RytBoon {
		constructor(vm) {console.log(this)
		}
		init(instance,success,data){
			window._self = this;
			_self.success = typeof success === "function" ? success : alert("not a function")
			window.scrape = instance.$refs.canvas
			scrape.width = this.getWidth = window.innerWidth
			scrape.height = this.getHeight = window.innerWidth / 3

			var image = new Image();
			image.src = canvasImg

			window.context = scrape.getContext("2d")

			image.onload = function () {
				var text = data ? data.text : '';
				context.measureText("Centered");
				context.drawImage(image, 0, 0, scrape.width, scrape.height);
				if (text != "") {
					context.font = "Bold 0.5rem Arial";
					context.textAlign = "center";
					context.fillStyle = "#000";
					context.fillText(text, scrape.width / 2, 70);
				}
				context.globalCompositeOperation = "destination-out";
				_self.event();
			};
		}
		event() {
			//this=>RytBoon
			window.addEventListener("mousedown", this._down, false);
			window.addEventListener("mousemove", this._move, false);
			window.addEventListener("mouseup", this._up, false);

			scrape.addEventListener("touchstart", this._down, false);
			scrape.addEventListener("touchmove", this._move, false);
			scrape.addEventListener("touchend", this._up, false);
		}
		_down(e) {
			//this=>canvas
			e.preventDefault();
			this.isDown = true
		}
		_up(e) {
			e.preventDefault();
			var data = context.getImageData(0, 0, scrape.width, scrape.height);
			//记录已刮开的区域
			var index = 0;

			for (var i = 3; i < data.data.length; i++) {
				if (data.data[i] == 0) {
					index++;
				}
			}
			//刮开区域达到1/3时   隐藏刮图层
			if (index >= data.data.length / 3) {
				_self.success()
			}
			this.isDown = false;
		}
		_move(e) {
			e.preventDefault();
			if (this.isDown) {
				if (e.changedTouches) {
					e = e.changedTouches[e.changedTouches.length - 1];
				}

				var rect = _self._getPosition(scrape, e);
				var x = rect.x;
				var y = rect.y;
				context.beginPath();
				context.arc(x, y, 28 * 0.8, 0, Math.PI * 2, true);

				context.fill();
			}
		}
		_getPosition(cv, e) {
			var rect = cv.getBoundingClientRect();
			return {
				x: e.clientX - rect.left,
				y: e.clientY - rect.top
			};
		}
	}
