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
  const [codeInOutputContainer, setCodeInOutputContainer] = useState(null)

  // func that will call the Jdoodle code compiler func in the backend
  // and then display the code that gets run in the output container
  const runCode = () => {
    axios
      .post(`http://127.0.0.1:5000/compile`, {"code" : codeToRun})
      .then((response) => {
          console.log(response.data)
          // if ("jdoodle.py") {

          // }
          setCodeInOutputContainer(response.data)
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
          setCodeToRun(editor.getValue())
        }}/>

        <div className='output-container'>
          <div className='output-text'>
            {codeInOutputContainer}
          </div>
        </div>
    </div>

  )
}

export default CodeEditor;