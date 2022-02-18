// всегда define и функция-колбэк
sap.ui.define([
	"sap/ui/core/ComponentContainer"
//    "sap/m/Text" // элемент управления текст. по сути просто текст на экране
//   "sap/ui/core/mvc/XMLView" // вьюшка в виде XML
], function (ComponentContainer) {
	"use strict"; // "использовать строго" инструкция для браузера чтобы прерывал если ошибка

//	alert("Скрипты UI5 загружены!");

/* Все элементы управления SAPUI5 имеют фиксированный набор свойств, 
агрегаций и ассоциаций для настройки. Вы можете найти их описания в демонстрационном наборе. 
Кроме того, каждый элемент управления поставляется с набором общедоступных функций, 
которые можно найти в справочнике по API.*/

/*	new Text({
		text: "Демо приложение UI5"
	}).placeAt("content"); // указывается id HTML тега, к которому прицепить элемент управления*/

/*	XMLView.create({
		viewName: "sap.ui.demo.demo_project.view.App"
	}).then(function (oView) {
		oView.placeAt("content");
	});*/
	new ComponentContainer({
		name: "sap.ui.demo.demo_project",
		settings : {
			id : "demo_project"
		},
		async: true
	}).placeAt("content");
});