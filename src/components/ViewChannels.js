import React, { Component } from 'react';
import { Tabs, Tree } from 'antd';
import { VoiceIcon, TextIcon, AnnouncementIcon, StageIcon, CategoryIcon } from '../assets/icons';
import { db } from '../firebase'
import './ViewChannels.css';

const icons = [<TextIcon />, <VoiceIcon />, <AnnouncementIcon />, null, <StageIcon />];
const { TabPane } = Tabs;

class ViewChannel extends Component {
    constructor(props) {
        super(props);
        // get the whole collection
        db.collection("channels")
        .get()
        .then(querySnapshot => {
            
            const descriptions = [];
            let data = querySnapshot.docs.map(doc => Object.values(doc.data()));
            data.forEach(item => {
                descriptions.push(item.pop());
                item.forEach(channel => {
                    channel.icon = icons[channel.type]
                })
            });
            
            console.log(data); // array of channels objects
            this.setState({forest: data, descriptions: descriptions})
        });

        this.state = {
            forest: []
        }

    }
    render() {
        return (
            <div className="viewchannels">
                <Tabs defaultActiveKey="1" tabPosition={'top'}>
                    { this.state.forest.map((i,index) => (
                        <TabPane tab={`Tab-${index}`} key={index} >
                            <Tree
                                showIcon={true}
                                blockNode
                                autoExpandParent={true}
                                defaultExpandAll
                                switcherIcon={<CategoryIcon />}
                                treeData={i} />
                            <p className="description">{this.state.descriptions[index]}</p>
                        </TabPane>
                    ))}
                </Tabs>
            </div>
        );
    }
}

export default ViewChannel;