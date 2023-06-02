import React from 'react';
import { useState, useEffect } from 'react';
import { PlusOutlined, LoadingOutlined } from '@ant-design/icons';
import { message, Modal, Upload } from 'antd';
import { BASE_IMG_URL } from '../../../utils/constants';
import { reqDeleteImg } from '../../../api';
// import { reqDeleteImg } from '../../api';

function PictureWalls(props, ref) {
  // console.log(ref)
  // 初始值
  const [loading, setLoading] = useState(false);

  // 这个是图片的地址
  // const [imageUrl, setImageUrl] = useState('');
  const [previewVisible, setPreviewVisible] = useState(false);
  const [previewImage, setPreviewImage] = useState('');
  const [previewTitle, setPreviewTitle] = useState('');

  // 所有的图片列表
  const [fileList, setFileList] = useState([]);
  
  // 挂载的时候|props.imgs更新的时候
  useEffect(() => {
    // 如果传值了，就遍历所有的图片列表
    if (props.imgs) {
      const { imgs } = props;
      // console.log("props",props)
      const newFileList = imgs.map((img,index) => {
        return {
          uid: -index, //每一个file都有自己的唯一标识
          name: img,
          status: 'done',  //图片状态:done 已上传  uploading: 正在上传中  removed:已删除
          url: BASE_IMG_URL+img,
        };
      });
      // console.log("newFileList" ,newFileList )
      setFileList(newFileList);
    } else {
      setFileList([]);
    }
  }, [props.imgs]);

  const getBase64 = (file) =>
    new Promise((resolve, reject) => {
      const reader = new FileReader();
      reader.readAsDataURL(file);

      reader.onload = () => resolve(reader.result);

      reader.onerror = (error) => reject(error);
    });

  const handleCancel = () => setPreviewVisible(false);

  // 预览图片
  const handlePreview = async (file) => {
    if (!file.url && !file.preview) {
      file.preview = await getBase64(file.originFileObj);
    }
    setPreviewImage(file.url || file.preview);
    setPreviewVisible(true);
    setPreviewTitle(file.name || file.url.substring(file.url.lastIndexOf('/') + 1));
  };

  // 一旦上传成功，将当前上传的file的信息修正
  const handleChange = async ({ fileList, file }) => {
    console.log("fileList",fileList , "file" , file)
    if (file.status === 'done') {
      const result = file.response;
      if (result.status === 0) {
        message.success('上传图片成功!');
        const { name, url } = result.data;
        // console.log("name",name,"url",url)
        file = fileList[fileList.length - 1];
        file.name = name;
        file.url = url;
      } else {
        message.error('上传图片失败');
      }
      // 进行删除操作
    } else if (file.status === 'removed') {
      const result = (await reqDeleteImg(file.name)).data;
      if (result.status === 0) {
        message.success('删除图片成功!');
      } else {
        message.error('删除图片失败!');
      }
      // console.log("删除")
    }

    setFileList(fileList);
  };
  
  // 定义ref 获取imgs的函数
  const getImgs = () => {
    return fileList.map((file) => file.name);
  };

  // 将子组件的函数通过ref传递给父组件
  React.useImperativeHandle(ref, () => ({
    getImgs: getImgs
  }));

  const uploadButton = (
    <div>
      {loading ? <LoadingOutlined /> : <PlusOutlined />}
      <div style={{ marginTop: 8 }}>Upload</div>
    </div>
  );

  return (
    <>
      <Upload
        action="/manage/img/upload"
        accept='image/*'
        listType="picture-card"
        fileList={fileList}
        // 发送给后台的文件参数名
        name="image"
        onPreview={handlePreview}
        onChange={handleChange}
      >
        {fileList.length >= 3 ? null : uploadButton}
      </Upload>
      <Modal visible={previewVisible} title={previewTitle} footer={null} onCancel={handleCancel}>
        <img alt="example" style={{ width: '100%' }} src={previewImage} />
      </Modal>
    </>
  );
}

export default React.forwardRef(PictureWalls);
