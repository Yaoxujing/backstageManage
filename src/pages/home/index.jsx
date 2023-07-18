import React from 'react'
import './index.less'
import { Carousel } from 'antd';
import { Statistic } from 'antd';
import CountUp from 'react-countup';
import { Card } from 'antd';
import ButtonLink from '../../components/button-link';
import {Calendar,theme  } from 'antd';
import LazyLoad from 'react-lazy-load';
import {
  FolderOpenOutlined,
  MoneyCollectOutlined,
  ArrowUpOutlined,
  DashboardOutlined,
  HeartOutlined,
  BarChartOutlined,
  ChromeOutlined,
  TaobaoOutlined,
  AlipayOutlined,
  CalendarOutlined,
  CarryOutOutlined,
  CloudDownloadOutlined,
  CloudUploadOutlined,
  CoffeeOutlined,
  ConsoleSqlOutlined,
  DollarOutlined,
  IdcardOutlined,
  KeyOutlined

} from '@ant-design/icons';

import locale from 'antd/lib/date-picker/locale/zh_CN'


import { Tabs } from 'antd';

const onChangeTabs1 = (key) => {
  console.log(key);
};
const items1 = [
  {
    key: '1',
    label: `公司通知`,
    children:<div>
      <ButtonLink>[办公室]2023年春季值班表汇总</ButtonLink>
      <ButtonLink>[办公室]2023年秋季值班表汇总</ButtonLink>
      <ButtonLink>[办公室]2023年冬季值班表汇总</ButtonLink>
      <ButtonLink>[办公室]2023年夏季值班表汇总</ButtonLink>
      <ButtonLink>[办公室]2022年冬季值班表汇总</ButtonLink>
      <ButtonLink>[办公室]2022年春季值班表汇总</ButtonLink>
    </div> ,
  },
  {
    key: '2',
    label: `一周安排`,
    children:
    <div>
    <ButtonLink>[办公室]第21周（7月3日至7月9日）安排</ButtonLink>
    <ButtonLink>[办公室]第20周（6月26日至7月2日）安排</ButtonLink>
    <ButtonLink>[办公室]第19周（6月19日至6月25日）安排</ButtonLink>
    <ButtonLink>[办公室]第18周（6月12日至6月18日）安排</ButtonLink>
    <ButtonLink>[办公室]第17周（6月5日至6月11日）安排</ButtonLink>
    <ButtonLink>[办公室]第16周（5月29日至6月4日）安排</ButtonLink>
  </div>,
  },
  {
    key: '3',
    label: `销售情况`,
    children:  <div>
    <ButtonLink>[财务部]第21周（7月3日至7月9日）报表</ButtonLink>
    <ButtonLink>[财务部]第20周（6月26日至7月2日）报表</ButtonLink>
    <ButtonLink>[财务部]第19周（6月19日至6月25日）报表</ButtonLink>
    <ButtonLink>[财务部]第18周（6月12日至6月18日）报表</ButtonLink>
    <ButtonLink>[财务部]第17周（6月5日至6月11日）报表</ButtonLink>
    <ButtonLink>[财务部]第16周（5月29日至6月4日）报表</ButtonLink>
  </div>,
  },
];
const items2 = [
  {
    key: '4',
    label: `公司应用`,
    children:<div className='app-items'>
      <BarChartOutlined /><span>报表  </span>
      <ChromeOutlined /><span>浏览器  </span>
      <TaobaoOutlined /><span>淘宝  </span>
      <AlipayOutlined /><span>支付宝  </span>
      <CalendarOutlined /><span>计划  </span>
      <CarryOutOutlined /><span>安排  </span><br/>
      <CloudDownloadOutlined /><span>下载  </span>
      <CloudUploadOutlined /><span>上传  </span>
      <CoffeeOutlined /><span>定下午茶  </span>
      <ConsoleSqlOutlined /><span>数据库  </span>
      <DollarOutlined /><span>财务  </span>
      <IdcardOutlined /><span>联系人  </span><br/>
      <KeyOutlined /><span>秘钥  </span>
    </div> ,
  },
  {
    key: '5',
    label: `常用网址`,
    children:
    <div>
    <ButtonLink>https://www.bilibili.com/</ButtonLink><br/>
    <ButtonLink>https://i.hdu.edu.cn/tp_up/view?m=up#act=portal/viewhome</ButtonLink><br/>
    <ButtonLink>https://ant.design/components/icon-cn</ButtonLink><br/>
    <ButtonLink>https://leetcode.cn/</ButtonLink><br/>
    <ButtonLink>https://www.programmercarl.com/</ButtonLink><br/>
    <ButtonLink>https://yxj-image.oss-cn-hangzhou.aliyuncs.com/image/image-20230713153712961.png</ButtonLink>
  </div>,
  },
  {
    key: '6',
    label: `最近使用`,
    children:
    <div>
    <ButtonLink>[办公室]第21周（7月3日至7月9日）安排</ButtonLink>
    <ButtonLink>[办公室]第20周（6月26日至7月2日）安排</ButtonLink>
    <ButtonLink>[办公室]第19周（6月19日至6月25日）安排</ButtonLink>
    <ButtonLink>[办公室]第18周（6月12日至6月18日）安排</ButtonLink>
    <ButtonLink>[办公室]第17周（6月5日至6月11日）安排</ButtonLink>
    <ButtonLink>[办公室]第16周（5月29日至6月4日）安排</ButtonLink>
  </div>,
  },
  
]
const formatter = (value) => <CountUp end={value} separator="," />;

// 幻灯片的样式
const contentStyle = {
  height: '300px',
  color: '#fff',
  lineHeight: '160px',
  textAlign: 'center',
  background: '#364d79',
};

const { Countdown } = Statistic;
const deadline = Date.now() + 1000 * 60 * 60 * 24 * 2 + 1000 * 30; // Dayjs is also OK

const onPanelChange = (value, mode) => {
  console.log(value.format('YYYY-MM-DD'), mode);
};

export default function Home() {
  const { token } = theme.useToken();
  const wrapperStyle = {
    width: 300,
    border: `1px solid ${token.colorBorderSecondary}`,
    borderRadius: token.borderRadiusLG,
  };
  return (
    <div>
        <div className="grid-container">
        <div className="message">
          <div className='school-message'>
          <Card
            title={"商城消息"}
            style={{
              margin: 20,
              textAlign: 'left'
            }}
            >
              <Tabs defaultActiveKey="2" items={items1} onChange={onChangeTabs1} />
        </Card>
          </div>
          <div className='my-message'>
          <Card
            title={"我的信息"}
            style={{
              margin: 20,
              textAlign: 'left'
            }}
            >
              <div className='message-box'>
                <div className='my-message-item'>
                  <div className='message-item-icon p-email'>
                    <div>
                      <FolderOpenOutlined style={{ fontSize: 30 }} />
                      <p>待处理</p>
                    </div>
                  </div>
                  <p className='message-text'>未读事项 <span className='text-'>3</span>个</p>
                </div>
                <div className='my-message-item'>
                  <div className='message-item-icon p-money'>
                    <div>
                      <MoneyCollectOutlined
                        style={{ fontSize: 30 }}
                      />
                      <p>交易额</p>
                    </div>
                  </div>
                  <Statistic
                    value={112893}
                    className='money-number'
                    valueStyle={{
                      color: '#fff',
                    }}
                    suffix="￥"
                    formatter={formatter} />
                </div>
                <div className='my-message-item'>
                  <div className='message-item-icon p-fans'>
                    <div>
                    <HeartOutlined style={{ fontSize: 30 }} />
                      <p>粉丝量</p>
                    </div>
                  </div>
                  <Statistic
                    value={11.28}
                    precision={2}
                    valueStyle={{
                      color: 'red',
                      fontSize: 20,
                      lineHeight:"80px"
                    }}
                    prefix={<ArrowUpOutlined />}
                    suffix="%"
                  />
                </div>
                <div className='my-message-item'>
                  <div className='message-item-icon p-time'>
                  <div>
                      <DashboardOutlined  style={{ fontSize: 30 }} />
                      <p>倒计时</p>
                    </div>
                  </div>
                  <Countdown
                    value={deadline}
                    format="D 天 H 时 m 分 s 秒"
                    valueStyle={{
                      color: 'white',
                      fontSize: 12,
                      lineHeight:"80px"
                    }}
                  />
                </div>
              </div>
        </Card>
          </div>
        </div>
        <div className="menu-nouse">
          </div>
        <div className="main">
          <div className='main-carousel'>
            <Carousel effect="fade" autoplay>
            <div>
              <h3 style={contentStyle}><LazyLoad><img src="https://yxj-image.oss-cn-hangzhou.aliyuncs.com/image/image-20230713153712961.png" alt="work" /></LazyLoad></h3>
            </div>
            <div>
              <h3 style={contentStyle}><LazyLoad><img src="https://yxj-image.oss-cn-hangzhou.aliyuncs.com/image/image-20230713153845400.png" alt="work" /></LazyLoad></h3>
            </div>
            <div>
              <h3 style={contentStyle}><LazyLoad><img src="https://yxj-image.oss-cn-hangzhou.aliyuncs.com/image/image-20230713154031796.png" alt="work" /></LazyLoad></h3>
            </div>
            <div>
              <h3 style={contentStyle}><LazyLoad><img src="https://yxj-image.oss-cn-hangzhou.aliyuncs.com/image/image-20230713154137509.png" alt="work" /></LazyLoad></h3>
            </div>
            </Carousel>
            </div>
        </div>
        <div className="calendar-date">
          <div style={wrapperStyle}>
          <Calendar fullscreen={false} onPanelChange={onPanelChange} locale={locale} />
          </div>
        </div>
        <div className="item5">
        <Card
            title={"默认应用"}
            style={{
              margin: 5,
              textAlign: 'left'
            }}
            >
              <Tabs defaultActiveKey="4" items={items2} onChange={onChangeTabs1} />
        </Card>
          </div>
        </div>
    </div>
    
  )
}
