sap.ui.define([
	"sap/ui/core/mvc/Controller",
	"sap/ui/model/json/JSONModel",
	"sap/ui/model/Filter",
	"sap/ui/model/FilterOperator",
	"sap/m/MessageToast"
], function (Controller, JSONModel, Filter, FilterOperator, MessageToast) {
	"use strict";

	return Controller.extend("sap.ui.demo.demo_project.controller.PurchaseList", {

		onInit : function () {
			var oViewModel = new JSONModel(
				{
					tableTitle: "Закупочные процедуры",
					finished: 0,
					current: 0,
					all: 0
				}
			);

			this.getView().setModel(oViewModel, "texts");

			// Create an object of filters
			this._mFilters = {
				"finished": [new Filter("Status", FilterOperator.EQ, "Завершено")],
				"current": [new Filter("Status", FilterOperator.EQ, "Опубликовано")],
				"all": []
			};
		},


		onFilterPurchases : function (oEvent) {

			// build filter array
			var aFilter = [];
			var sQuery = oEvent.getParameter("query");
			if (sQuery) {
				aFilter.push(new Filter("Description", FilterOperator.Contains, sQuery));
			}

			// filter binding
			var oList = this.byId("purchase_m_Table");
			var oBinding = oList.getBinding("items");
			oBinding.filter(aFilter);
		},

		onUpdateFinished : function (oEvent) {
			var sTitle,
				oTable = oEvent.getSource(),
				oViewModel = this.getView().getModel("texts"),
				iTotalItems = oEvent.getParameter("total");

			if (iTotalItems && oTable.getBinding("items").isLengthFinal()) {
				sTitle = "Закупочные процедуры (" + iTotalItems + ")";
				
			}
			else {
				sTitle = "Закупочные процедуры"
			};

			this.getView().getModel("texts").setProperty("/tableTitle", sTitle);

			this.getView().getModel("purchase").read("/Purchases/$count",{
				success: function (oData) {
					oViewModel.setProperty("/finished", oData);
				},
				filters: this._mFilters.finished
			},	
			);

			this.getView().getModel("purchase").read("/Purchases/$count",{
				success: function (oData) {
					oViewModel.setProperty("/current", oData);
				},
				filters: this._mFilters.current
			},	
			);

			this.getView().getModel("purchase").read("/Purchases/$count",{
				success: function (oData) {
					oViewModel.setProperty("/all", oData);
				},
				filters: this._mFilters.all
			},	
			);

		},

		onQuickFilter: function(oEvent) {
			var oBinding = this.byId("purchase_m_Table").getBinding("items"),
				sKey = oEvent.getParameter("selectedKey");
			oBinding.filter(this._mFilters[sKey]);
		},

		onPress: function (oEvent) {
			//MessageToast.show("Еще не реализовано");
			var oItem = oEvent.getSource();
			var oRouter = this.getOwnerComponent().getRouter();
			oRouter.navTo("detail",{
				purchasePath: window.encodeURIComponent( oItem.getBindingContext("purchase").getPath().substr(1) )
			});
		}

	});
});