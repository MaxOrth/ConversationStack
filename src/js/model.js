model = (function() {
	var topics = "ABCDEFGHIJKLM".split("");
	var agenda = [];
	
	return {
		topics: topics,
		agenda: agenda,
		
		addTopic: function(topic) {
			topics.push(topic)
		},
		addAgendaItem: function(item){
			agenda.push(item);
		},
		popTopic: function() {
			return topics.pop();
		},
		getNextOnAgenda: function() {
			return agenda.shift();
		}
	};
})();

