define([
	"qunit",
	"../dist/inputmask/dependencyLibs/inputmask.dependencyLib",
	"../dist/inputmask/inputmask.date.extensions",
	"../dist/inputmask/inputmask.extensions",
	"../dist/inputmask/inputmask.numeric.extensions",
	"../dist/inputmask/inputmask.phone.extensions",
	"../dist/inputmask/phone-codes/phone",
	"../dist/inputmask/phone-codes/phone-be",
	"../dist/inputmask/phone-codes/phone-nl",
	"../dist/inputmask/phone-codes/phone-ru",
	"../dist/inputmask/phone-codes/phone-uk",
	"../dist/inputmask/inputmask.regex.extensions",
	"prototypeExtensions",
	"simulator"
], function (qunit, $, Inputmask) {

	qunit.module("Phonebe masks");

	qunit.test("inputmask(\"phonebe\")", function (assert) {
		var $fixture = $("#qunit-fixture");
		$fixture.append('<input type="text" id="testmask" />');
		var testmask = document.getElementById("testmask");
		Inputmask("phonebe", {nullable: false}).mask(testmask);

		testmask.focus();

		$.each(Inputmask.prototype.aliases.phonebe.phoneCodes, function (ndx, lmnt) {
			var ndx = 1, input, expected = lmnt.mask;
			while (expected.match(/#/)) {
				expected = expected.replace(/#/, ndx++);
				if (ndx > 9) ndx = 1;
			}
			input = expected;

			//input = input.replace(/\+/g, "");
			input = input.replace(/\(/g, "");
			input = input.replace(/\)/g, "");
			input = input.replace(/-/g, "");

			$(testmask).val(input);
			assert.equal(testmask.value, expected, "Result " + testmask.value);
		});

	});

});
