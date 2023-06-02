import React from 'react'
// 用来指定商品详情的富文本编译器
import { EditorState, convertToRaw } from 'draft-js';
import { Editor } from 'react-draft-wysiwyg';
import draftToHtml from 'draftjs-to-html';
import { useState } from 'react';
import { useEffect } from 'react';
import { stateFromHTML } from 'draft-js-import-html';
// import { message } from 'antd';
// import { useRef } from 'react';
import 'react-draft-wysiwyg/dist/react-draft-wysiwyg.css';

function RichTextEditor(props,ref) {
  const [editorState, setEditorState] = useState(EditorState.createEmpty());
  // const editorRef = useRef(null);

  // 输入过程中实时的回调
  const onEditorStateChange = (editorState) => {
    // console.log(editorState)
    setEditorState(editorState);
  };

  // 返回当前数据
  const getDetail = () => {
    // console.log(draftToHtml(convertToRaw(editorState.getCurrentContent())))
    return draftToHtml(convertToRaw(editorState.getCurrentContent()))
  }

  // 将子组件的函数通过ref传递给父组件
  React.useImperativeHandle(ref, () => ({
    getDetail: getDetail
  }));

  // const uploadImageCallBack=(file)=>{
  //   return new Promise(
  //     (resolve, reject) => {
  //       let formData = new FormData()
  //       formData.append('file', file)
  //       let subsystemTourInfo = JSON.parse(localStorage.getItem('subsystemTourInfo')) || {}
  //       fetch(`/manage/img/upload`, {
  //         method: 'POST',
  //         headers: {
  //         'store-user-token':subsystemTourInfo.token
  //         },
  //         body: formData,
  //       }).then(res => {
  //         console.log(res)
  //         return res.json()
  //       }).then(res => {
  //         if (res.err !== 0) {
  //           message.error('图片上传失败', 2)
  //           reject(res)
  //         } else {
  //           resolve({data: {link: res.fileId}})
  //         }
  
  //       }).catch(err => {
  //         reject(err)
  //       })
  //     }
  //   )
  // }

  const uploadImageCallBack = (file) => {
    return new Promise(
      (resolve, reject) => {
        const xhr = new XMLHttpRequest()
        xhr.open('POST', '/manage/img/upload')
        const data = new FormData()
        data.append('image', file)
        xhr.send(data)
        xhr.addEventListener('load', () => {
          const response = JSON.parse(xhr.responseText)
          const url = response.data.url // 得到图片的url
          resolve({data: {link: url}})
        })
        xhr.addEventListener('error', () => {
          const error = JSON.parse(xhr.responseText)
          reject(error)
        })
      }
    )
  }
  // 初始化富文本中的值
  useEffect(() => {
    // 如果传值了，就遍历所有的图片列表
    if (props.detail) {
      const { detail } = props;
      // const html = '<p>hellp</p>'

      // 使用stateFromHTML函数将HTML转换为ContentBlock对象的数组
      const blocks = stateFromHTML(detail);
      // 使用ContentState.createFromBlockArray方法将blocks转换为ContentState
      // const contentState = ContentState.createFromBlockArray(blocks);

      // 使用EditorState.createWithContent方法创建一个EditorState对象
      const editorState = EditorState.createWithContent(blocks);
      setEditorState(editorState)
    }
  }, [props.detail]);

return (
<Editor
    editorState={editorState}
    // 上传图片
    toolbarClassName="toolbarClassName"
    
    // toolbar={{
    //   image: {
    //     urlEnabled: true,
    //     uploadEnabled: true,
    //     alignmentEnabled: true,   // 是否显示排列按钮 相当于text-align
    //     uploadCallback: uploadImageCallBack,
    //     previewImage: true,
    //     inputAccept: 'image/*',
    //     alt: {present: false, mandatory: false,previewImage: true}
    //   },
    // }}
    editorStyle={{ border: '1px solid black' ,minHeight:200,paddingLeft:10}}
    wrapperClassName="demo-wrapper"
    editorClassName="demo-editor"
    onEditorStateChange={onEditorStateChange}
    toolbar={{
      blockType: {
        options: ['Normal', 'H1', 'H2', 'H3', 'H4', 'H5', 'H6', 'Blockquote', 'Code'],
      },
      image: { uploadCallback: uploadImageCallBack,uploadEnabled: true,
         alt: { present: true, mandatory: true } },
    }}
  />
  
  
);
}

export default React.forwardRef(RichTextEditor);