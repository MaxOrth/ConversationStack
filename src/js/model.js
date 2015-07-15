model = (function() {
	/*
	 * SETUP AND INIT
	 */
	var topics = "ABCDEFGHIJKLMNOPQRSTUVWXYZ".split("");
	var agenda = "1234567890!@#$%^&*()".split("");
	
	// app settings
	var settings = {
		syncData: true
	};
	var didSyncData;
	
	/*
	 * ON LOAD
	 */
	var onload = function() {
		storage.loadLocal("syncData", function(sync) {
			settings.syncData = sync;
			didSyncData = sync;
			storage.load("settings", function(loaded) {
				settings = loaded;
			}, this.settings); // use settings as default
		}, true); // default true
	};
	
	
	// UTILITY FUNCTIONS
	 
	var saveAllData = function() {
		storage.save("settings", this.settings);
		storage.saveLocal("syncData", this.settings.syncData);
	};
	
	/*
	 * PUBLIC VARIABLES
	 */
	return { // TODO clean up for production, many are public for debugging purposes
		topics: topics,
		agenda: agenda,
		settings: settings,
		
		onload: onload,
		
		pushTopic: function(topic) {
			topics.push(topic);
		},
		pushAgendaItem: function(item){
			agenda.push(item);
		},
		popTopic: function() {
			return topics.pop();
		},
		popAgendaItem: function() {
			return agenda.shift();
		},
		saveSettings: function() {
			if (didSyncData !== this.settings.syncData) {
				saveAllData.call(this); // bind it to this to get most up-to-date info
				if (!this.settings.syncData) {
					storage.clearAll("sync");
				}
			} else {
				storage.save("settings", this.settings);
			}
			didSyncData = this.settings.syncData;
			toast("Settings saved.");
		},
		saveAllData: saveAllData
	};
})();
