import React from 'react'
import {Row, Col, Tabs, Carousel, List, Card} from 'antd'
import PCNewsBlock from './pc_news_block'
import PCNewsImageBlock from './pc_news_image_block'

const TabPane = Tabs.TabPane

export default class PCNewsContainer extends React.Component {
    render() {
        // 轮播图参数设置
        const settings = {
            autoplay: true,
            dots: true,
            infinite: true,
            speed: 500
        }
        return (
            <div>
                <Row>
                    <Col span={2}>
                    </Col>

                    <Col span={20} class='container'>
                        {/*leftContainer 用来放一个轮播图和图形新闻块, 轮播图使用了静态图片*/}
                        <div className="leftContainer">
                            <div class="carousel">
                                <Carousel {...settings}>
                                    <div><img src="./src/images/carousel_1.jpg" alt=""/></div>
                                    <div><img src="./src/images/carousel_2.jpg" alt=""/></div>
                                    <div><img src="./src/images/carousel_3.jpg" alt=""/></div>
                                    <div><img src="./src/images/carousel_4.jpg" alt=""/></div>
                                </Carousel>
                            </div>
                            {/*图像新闻块放在轮播图下方, count属性用来控制展示的图像新闻块数量, type表示新闻类型, 由api决定*/}
                            <PCNewsImageBlock cardTitle='国际头条' count='6' type='guoji'
                                              width='400px' imageWidth='112px'/>
                        </div>
                        <Tabs class='tabs_news'>
                            <TabPane tab='头条新闻' key='1'>
                                <PCNewsBlock count='20' type={this.props.current} bordered={false}/>
                            </TabPane>
                        </Tabs>

                        <div>
                            <PCNewsImageBlock cardTitle='国内新闻' count='8' type='guonei'
                                              width='100%' imageWidth='132px'/>
                            <PCNewsImageBlock cardTitle='娱乐新闻' count='16' type='yule'
                                              width='100%' imageWidth='132px'/>
                        </div>


                    </Col>

                    <Col span={2}>
                    </Col>
                </Row>
            </div>
        )
    }
}