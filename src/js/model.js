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
	var didSyncData = settings.syncData;
	
	/*
	 * ON LOAD
	 */
	var onload = function() {
		storage.load("settings", function(loaded) {
			settings = loaded;
		});
	};
	
	
	// UTILITY FUNCTIONS
	 
	var saveAllData = function() {
		storage.save("settings", settings);
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
			if (didSyncData !== settings.syncData) {
				saveAllData();
				if (!settings.syncData) {
					storage.clear("sync");
				}
			} else {
				storage.save("settings", settings);
			}
			didSyncData = settings.syncData;
		},
	};
})();