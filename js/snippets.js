var snippets = { 'Interviewer': 'f7' };

var snippetList = document.getElementById('snippetList');
var ul = document.createElement("ul");
ul.classList.add("list-group");
ul.classList.add("list-group-flush");
snippetList.appendChild(ul);
for (key in snippets) {
    var li = document.createElement("li");
    li.innerHTML = key + '&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;' + '<strong>' + snippets[key].toUpperCase() + '</strong>';
    li.classList.add("list-group-item");
    ul.appendChild(li);
}
function updateSnippetList() {
    var snippetList = document.getElementById('snippetList');
    while (snippetList.lastElementChild) {
        snippetList.removeChild(snippetList.lastElementChild);
    }
    var ul = document.createElement("ul");
    ul.classList.add("list-group");
    ul.classList.add("list-group-flush");
    snippetList.appendChild(ul);
    for (key in snippets) {
        var li = document.createElement("li");
        li.innerHTML = key + '&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;' + '<strong>' + snippets[key].toUpperCase() + '</strong>';
        li.classList.add("list-group-item");
        ul.appendChild(li);
    }
}

function addSnippets() {
    console.log(window.snippets);
    document.getElementById('triggerBtn').innerHTML = 'Press Key';
    var newName = document.getElementById("nameInput").value;
    Mousetrap.record(function (sequence) {
        console.log('registrando');
        console.log(newName);
        window.snippets[newName] = sequence.join(' ');
        updateSnippetList();
        document.getElementById("nameInput").value = '';
        document.getElementById('triggerBtn').innerHTML = 'assign trigger';
    });

}

function snippetEditor(event) {
    var snippet = null;
    for (key in window.snippets) {
        
        var keyStr = ["Control", "Shift", "Alt", "Meta"].includes(event.key) ? "" : event.key + " ";
        var reportStr = (event.ctrlKey ? "ctrl+": "") +
            (event.shiftKey ? "shift+" : "") +
            (event.altKey ? "alt+" : "") +
            (event.metaKey ? "meta+" : "") +
            keyStr.toLowerCase().trim();
       
        if (event.which == dict_keysCodes[window.snippets[key]]) {
            console.log('ento if');
            var videofile = document.getElementById("videoLocal");
            snippet =  key + ' in ' + '<a href="#">' + formatTime(videofile.currentTime) + '</a>' + ': ';
        }else if(reportStr == window.snippets[key]) {
            console.log('ento if');
            var videofile = document.getElementById("videoLocal");
            var mysnippet =  key + ' in ' + '<a href="#">' + formatTime(videofile.currentTime) + '</a>' + ': ';
            tinymce.activeEditor.insertContent(mysnippet);
            event.stopPropagation ();
            event.preventDefault ();
        }
        
    }
    
    return snippet;
}
