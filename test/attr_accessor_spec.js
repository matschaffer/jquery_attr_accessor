Screw.Unit(function() {
  describe("The attr_accessor plugin", function() {
    before(function() {
      this.myObj = function() {
  			this._x = 1;
  			this._y = 2;
  		};
    });
    
    it("should create functions on the given object to access members", function() {
  		$(this.myObj.prototype).attr_accessor('foo');
  		
  		var x = new this.myObj();
  		expect(x.foo()).to(be_undefined);
  		
  		x.foo('bar');
  		expect(x.foo()).to(equal, 'bar');
    });
    
    it("should create functions for read-only members", function() {
      $(this.myObj.prototype).attr_reader('x');
      var x = new this.myObj();
      expect(x.x()).to(equal, 1);
    });
    
    it("should create function for write-only members", function() {
      $(this.myObj.prototype).attr_writer('y');
      var x = new this.myObj();
      x.y('test');
      expect(x._y).to(equal, 'test');
    });
  });
});