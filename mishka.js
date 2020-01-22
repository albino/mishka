"use strict";

(function() {
	var vocabPanel;

	document.querySelectorAll("div.panel-info, div.panel-default, div#section2-2").forEach(function (item) {
		// I'm sure there's a better way to do this but who cares
		if (item.querySelector("a.accordion-toggle").innerHTML.trim() == "Vocabulary organised semantically") {
			vocabPanel = item;
		}
	});

	if (!vocabPanel) {
		return;
	}
	
	var button = document.createElement("A");
	button.innerHTML = "Export";
	button.href = "#";
	button.id = "mishka-plugin-button";
	button.onclick = function() {
		var wordsRu = Array.from(vocabPanel.querySelectorAll("p.russian-vocab")).map(
			x => x.innerHTML
				.replace(/<strong class=\"text-danger\">/g, "")
				.replace(/<\/strong>/g, "\u0301")
				.trim()
				.replace(/\t/g, ' ')
		);
		var wordsEn = Array.from(vocabPanel.querySelectorAll("p.english-vocab")).map(
			x => x.innerHTML
				.trim()
				.replace(/\t/g, ' ')
		);

		var content = "data:text/csv;charset=utf-8," + wordsRu.map(function (word, i) {
			return word + "\t" + wordsEn[i];
		}).join("\n");

		var encodedUri = encodeURI(content);
		var link = document.createElement("A");
		link.setAttribute("href", encodedUri);
		link.setAttribute("download", "flashcards.txt");
		document.body.appendChild(link);
		link.click();

		return false;
	}

	var table = vocabPanel.querySelector("div.col-md-12");
    if (!table) {
        table = vocabPanel.querySelector("div.table-responsive");
    }
	table.prepend(button);
})();
