// Import methods to save and get data from the indexedDB database in './database.js'
import { header } from './header';
import { getDb, putDb } from './database';
//import {CodeMirror} from 'codemirror';

export default class {
  constructor() {
    const localData = localStorage.getItem('content');

    // check if CodeMirror is loaded
    if (typeof CodeMirror === 'undefined') {
      throw new Error('CodeMirror is not loaded');
    } else {
      console.log("codeMirror loaded!");
    }

    this.editor = CodeMirror(document.querySelector('#main'), {
      value: '',
      mode: 'javascript',
      theme: 'monokai',
      lineNumbers: true,
      lineWrapping: true,
      autofocus: true,
      indentUnit: 2,
      tabSize: 2,
    });

    // When the editor is ready, set the value to whatever is stored in indexeddb.
    // Fall back to localStorage if nothing is stored in indexeddb, and if neither is available, set the value to header.
    getDb(1).then((data) => {
      console.info('Loaded data from IndexedDB, injecting into editor');
      /*
      console.log(JSON.stringify(data.todo));
      let content = JSON.stringify(data.todo);
      if (content === null) {
        content = header;
      }
      this.editor.setValue(content);
      console.log("-----");
      */
     //console.log(localData);
     this.editor.setValue(localData || header);
     //this.editor.setValue(data || localData || header);
    });

    this.editor.on('change', () => {
      localStorage.setItem('content', this.editor.getValue());
    });

    // Save the content of the editor when the editor itself is loses focus
    this.editor.on('blur', () => {
      console.log('The editor has lost focus');
      putDb(1,localStorage.getItem('content'));
    });
  }
}
