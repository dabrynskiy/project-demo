/* global QUnit */

QUnit.config.autostart = false;

sap.ui.getCore().attachInit(function () {
	"use strict";

	sap.ui.require([
		"sap/ui/demo/demo_project/test/unit/model/formatter"
	], function () {
		QUnit.start();
	});
});