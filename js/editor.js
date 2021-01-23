tinymce.init({
    selector: '#editor1',
    height: 250,
    plugins: 'code',
    menubar: 'custom',
    menu: {
        custom: { title: 'File', items: ' newtrans loadfile' }
    },
    toolbar: 'bold italic | undo redo | downloadButton code',

    setup: function (editor) {

        editor.ui.registry.addMenuItem('newtrans', {
            text: 'New Transcription',
            onAction: function () {
                var txt = 'All system configurations will be reset for the new transcription. Do you want to continue?'; 
                var r = confirm(txt);
                if (r == true) {
                    tinyMCE.activeEditor.setContent('');
                    location.reload();
                }
                
            }
        });

        editor.ui.registry.addMenuItem('loadfile', {
            text: 'Load File',
            onAction: function () {
                function readFile(e) {
                    var file = e.target.files[0];
                    if (!file) {
                        return;
                    }
                    var reader = new FileReader();
                    reader.onload = function (e) {
                        var contents = e.target.result;
                        //displayContents(contents);
                        editor.insertContent(contents);
                    };
                    reader.readAsText(file);
                }

                document.getElementById('file-input')
                    .addEventListener('change', readFile, false);
                document.getElementById('file-input').click();
            }
        });

        editor.ui.registry.addButton('downloadButton', {
            icon: "save",
            tooltip: 'Download',
            onAction: function (_) {
                var myContent = tinymce.get("editor1").getContent({ format: "text" });
                var myContentHtml = tinymce.get("editor1").getContent();
                console.log(myContentHtml);
                var textToSaveAsBlob = new Blob([myContent], { type: "text/plain" });
                var textToSaveAsURL = window.URL.createObjectURL(textToSaveAsBlob);
                var fileNameToSaveAs = 'transcripcion_' + window.formatDate();

                var textToSaveAsBlob2 = new Blob([myContentHtml], { type: "text/html;charset=utf-8" });
                var textToSaveAsURL2 = window.URL.createObjectURL(textToSaveAsBlob2);
                var fileNameToSaveAs2 = 'transcripcion_load_file_' + window.formatDate();

                var downloadLink = document.createElement("a");
                downloadLink.download = fileNameToSaveAs;
                downloadLink.innerHTML = "Download File";
                downloadLink.href = textToSaveAsURL;
                downloadLink.onclick = window.destroyClickedElement;
                downloadLink.style.display = "none";
                document.body.appendChild(downloadLink);

                downloadLink.click();

                var downloadLink2 = document.createElement("a");
                downloadLink2.download = fileNameToSaveAs2;
                downloadLink2.innerHTML = "Download File";
                downloadLink2.href = textToSaveAsURL2;
                downloadLink2.onclick = window.destroyClickedElement;
                downloadLink2.style.display = "none";
                document.body.appendChild(downloadLink2);

                downloadLink2.click();

            }
        });

        editor.on('keydown', function (e) {
            console.log('The Editor has initialized.');

            if (e.which == dict_keysCodes[window.keyPlayPause]) {
                window.playVideo();
                return false;
            } else if (e.which == dict_keysCodes[window.keyslow]) {
                window.slowDown();
                return false;
            } else if (e.which == dict_keysCodes[window.keySpeed]) {
                window.speedUp();
                return false;
            } else if (e.which == dict_keysCodes[window.keyRewind]) {
                window.rewind();
                return false;
            } else if (e.which == dict_keysCodes[window.keyForward]) {
                window.forward();
                return false;
            } else if (window.snippetEditor(e) != null) {
                editor.insertContent(window.snippetEditor(e));
                return false;
            }
        });

        editor.on('click', function (e) {
            if (e.target.nodeName == 'A') {
                console.log('Element clicked:', e.target.nodeName + ' ' + e.target.innerHTML);
                window.timeCode(e.target.innerHTML);
            }

        });

        editor.on('focus', function (e) {
            window.flag = true;
        });

        editor.on('blur', function (e) {
            window.flag = false;
        });

    }
});


