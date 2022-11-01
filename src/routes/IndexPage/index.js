import React, { useCallback, useState } from 'react';
import { connect } from 'dva';
import { CustomerServiceOutlined } from '@ant-design/icons';
import {
  library,
  generateRespones,
  RenderList,
  useRegister,
} from 'chatbot-antd';
import styles from './style.css';
import { Button } from 'antd';

//text是语句，reg会生成正则匹配，useReg会使用自定义匹配
library.push(
  //语料库，push进去，也可以不用
  {
    text: '我是机器人',
    reg: '你是谁',
  },
  {
    text: 'author is yehuozhili',
    useReg: /(.*?)作者是谁(.*?)/,
  },
  {
    text: <CustomerServiceOutlined></CustomerServiceOutlined>,
    useReg: /(.*?)表情(.*?)/,
  }
);

function App() {
  const [modalOpen, setModalOpen] = useState(false);

  const callb = useCallback(v => {
    setTimeout(() => {
      //使用settimeout 更像机器人回话
      let returnValue = generateRespones(v);
      if (returnValue) {
        //排除null
        setList(prev => [...prev, { isUser: false, text: returnValue }]);
      }
    }, 500);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  // 注册
  const [render, setList] = useRegister(
    modalOpen,
    callb,
    {
      onOk: () => setModalOpen(false),
      onCancel: () => setModalOpen(false),
      title: 'h5-Dooring机器人客服',
    },
    {},
    <div>welcome!我是机器人初始欢迎语句！！</div>
  );

  return (
    <div>
      <div className={styles.animateWrapper}>
        <h1 className={styles.animate}>我永远爱蔡巧真</h1>
      </div>
      <div
        style={{
          position: 'fixed',
          right: '10px',
          top: '40%',
        }}
      >
        <Button type="primary" onClick={() => setModalOpen(!modalOpen)}>
          <CustomerServiceOutlined></CustomerServiceOutlined>
        </Button>
      </div>
      {render}
    </div>
  );
}

export default connect(({ global }) => {
  return {
    global,
  };
})(App);
