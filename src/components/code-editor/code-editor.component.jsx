import React from "react";
import axios from "axios";

import CodeMirror from "@uiw/react-codemirror"
import 'codemirror/theme/twilight.css'
// Note: more themes here -- https://codemirror.net/demo/theme.htm

import './code-editor.styles.scss'

import CustomButton from '../custom-button/custom-button.component'

import { useState } from 'react';

const CodeEditor = () => {
  const [codeToRun, setCodeToRun] = useState(null)

  let code = "for i in range(4): print('apple')"; // this will change later!

  // func that will run the Jdoodle code compiler in the backend
  const runCode = () => {
    axios
      .post(`http://127.0.0.1:5000/compile`, {"code" : code})
      .then((response) => {
          console.log(response.data)
      })
      .catch((error) => {
          console.log("there was an error:", error);
      });
  }

  return (
    <div>
      <CustomButton onClick={() => runCode()}>
        Run Code
      </CustomButton>

      <CodeMirror className="code-mirror"
        value="print('hello world')"
        options={{
            theme: 'twilight',
            indentUnit: 4,
            mode: 'python'
          }}
        height="400px"
        width="380px"
        onChange={(editor) => {
          console.log('value:', editor.getValue());
        }}/>

        <div className='output-container'>
          <div className='output-text'>
            {codeToRun}
          </div>
        </div>
    </div>

  )
}

export default CodeEditor;