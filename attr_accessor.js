(function($) {
	var get_attr_name = function(name) { return '_' + name; }
	var get_getter_name = function(name) { return '_get' + get_attr_name(name); }
	var get_setter_name = function(name) { return '_set' + get_attr_name(name); }

	$.fn.extend({
		attr_accessor: function(name) {
			this.attr_reader(name);
			this.attr_writer(name);

			this.each(function() {
				this[name] = function() {
					if (arguments.length == 0) {
						return this[get_getter_name(name)]();
					} else {
						this[get_setter_name(name)].apply(this, arguments);
					}
				}
			});

			return this;
		},

		attr_reader: function(name) {
			var attr_name = get_attr_name(name);
			var getter_name = get_getter_name(name);

			this.each(function() {
				this[getter_name] = function() {
					return this[attr_name];
				}
				this[name] = function() {
					return this[getter_name].apply(this, arguments);
				}
			});

			return this;
		},

		attr_writer: function(name) {
			var attr_name = get_attr_name(name);
			var setter_name = get_setter_name(name);

			this.each(function() {
				this[setter_name] = function(x) {
					this[attr_name] = x;
				}
				this[name] = function() {
					this[setter_name].apply(this, arguments);
				}
			});

			return this;
		}
	});
})(jQuery);
