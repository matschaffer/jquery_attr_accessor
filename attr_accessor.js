(function($) {
	var attr_name = function(name) { return '_' + name; }
	var getter_name = function(name) { return '_get' + attr_name(name); }
	var setter_name = function(name) { return '_set' + attr_name(name); }

	var attr_method = function(name) {
		return function() {
			var method = (arguments.length == 0) ? getter_name(name) : setter_name(name);
			return this[method].apply(this, arguments);
		}
	}

	$.fn.extend({
		attr_accessor: function(name) {
			this.attr_reader(name);
			this.attr_writer(name);

			return this;
		},

		attr_reader: function(name) {
			this.each(function() {
				this[getter_name(name)] = function() {
					return this[attr_name(name)];
				}
				this[name] = attr_method(name);
			});

			return this;
		},

		attr_writer: function(name) {
			this.each(function() {
				this[setter_name(name)] = function(x) {
					this[attr_name(name)] = x;
				}
				this[name] = attr_method(name);
			});

			return this;
		}
	});
})(jQuery);
