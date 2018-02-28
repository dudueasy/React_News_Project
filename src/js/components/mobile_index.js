import React from 'react'
import MobileHeader from './mobile_header'
import MobileFooter from "./mobile_footer";
import {Tabs, Carousel} from 'antd'
import MobileList from './mobile_list'
import MobileListPullRefresh from './mobile_list_pull_refresh'

const TabPane = Tabs.TabPane


export default class MobileIndex extends React.Component {
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
                <MobileHeader/>
                <Tabs>
                    <TabPane key='1' tab='头条'>
                        <div class="m_carousel">
                            <Carousel {...settings}>
                                <div><img src="/src/images/carousel_1.jpg" alt=""/></div>
                                <div><img src="/src/images/carousel_2.jpg" alt=""/></div>
                                <div><img src="/src/images/carousel_3.jpg" alt=""/></div>
                                <div><img src="/src/images/carousel_4.jpg" alt=""/></div>
                            </Carousel>
                        </div>
                        {/*<MobileList count={20} type='top'/>*/}
                        <MobileListPullRefresh count={20} type='top'/>
                    </TabPane>
                    <TabPane key='2' tab='社会'>
                        {/*<MobileList count={20} type='shehui'/>*/}
                        <MobileListPullRefresh count={20} type='shehui'/>

                    </TabPane>
                    <TabPane key='3' tab='国内'>
                        {/*<MobileList count={20} type='guonei'/>*/}
                        <MobileListPullRefresh count={20} type='guonei'/>

                    </TabPane>
                    <TabPane key='4' tab='国际'>
                        {/*<MobileList count={20} type='guoji'/>*/}
                        <MobileListPullRefresh count={20} type='guoji'/>

                    </TabPane>
                    <TabPane key='5' tab='娱乐'>
                        {/*<MobileList count={20} type='yule'/>*/}
                        <MobileListPullRefresh count={20} type='yule'/>

                    </TabPane>

                </Tabs>
                <MobileFooter/>
            </div>
        )
    }
}