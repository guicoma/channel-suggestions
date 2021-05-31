import './ProposeChannels.css';
import React, { Component, createRef } from 'react';
import { Tree, Form, Input, Select, Button, Alert, Space, Divider } from 'antd';
import { PlusOutlined } from '@ant-design/icons';
import { VoiceIcon, TextIcon, AnnouncementIcon, StageIcon, CategoryIcon } from '../assets/icons';
import { db } from '../firebase'

const icons = [<TextIcon />, <VoiceIcon />, <AnnouncementIcon />, null, <StageIcon />];

const gData = [
  {
    title: '｜información',
    type: '0',
    key: '｜información',
    icon: icons[0],
    children: []
  },
  {
    title: '｜anuncios-nate',
    type: '2',
    key: '｜anuncios-nate',
    icon: icons[2],
    children: []
  },
  {
    title: '｜anuncios-server',
    type: '2',
    key: '｜anuncios-server',
    icon: icons[2],
    children: []
  },
  {
    title: 'TALLER',
    type: '3',
    key: 'TALLER',
    icon: icons[3],
    children: [
      {
        title: 'hardware',
        type: '0',
        key: 'hardware',
        icon: icons[0],
        children: []
      },
      {
        title: 'software',
        type: '0',
        key: 'software',
        icon: icons[0],
        children: []
      }
    ]
  },
];
const { TextArea } = Input;
const { Option } = Select;

class ProposeChannels extends Component {
  chFormRef = createRef();
  sendFormRef = createRef();

  constructor(props) {
    super(props);
    this.state = { gData };
  }

  onDragEnter = info => {
    console.log(info);
  };

  onDrop = info => {
    console.log(info);
    const dropKey = info.node.key;
    const dragKey = info.dragNode.key;
    const dropPos = info.node.pos.split('-');
    const dropPosition = info.dropPosition - Number(dropPos[dropPos.length - 1]);

    const loop = (data, key, callback) => {
      for (let i = 0; i < data.length; i++) {
        if (data[i].key === key) {
          return callback(data[i], i, data);
        }
        if (data[i].children) {
          loop(data[i].children, key, callback);
        }
      }
    };
    const data = [...this.state.gData];

    // Find dragObject
    let dragObj;
    loop(data, dragKey, (item, index, arr) => {
      arr.splice(index, 1);
      dragObj = item;
    });

    if (!info.dropToGap) {
      // Drop on the content
      loop(data, dropKey, item => {
        item.children = item.children || [];
        // where to insert 示例添加到头部，可以是随意位置
        item.children.unshift(dragObj);
      });
    } else if (
      (info.node.props.children || []).length > 0 && // Has children
      info.node.props.expanded && // Is expanded
      dropPosition === 1 // On the bottom gap
    ) {
      loop(data, dropKey, item => {
        item.children = item.children || [];
        // where to insert 示例添加到头部，可以是随意位置
        item.children.unshift(dragObj);
        // in previous version, we use item.children.push(dragObj) to insert the
        // item to the tail of the children
      });
    } else {
      let ar;
      let i;
      loop(data, dropKey, (item, index, arr) => {
        ar = arr;
        i = index;
      });
      if (dropPosition === -1) {
        ar.splice(i, 0, dragObj);
      } else {
        ar.splice(i + 1, 0, dragObj);
      }
    }

    this.setState({gData: data});
  };

  addChannel = (values) => {
    const data = [...this.state.gData];
    
    if (values.type === '0' || values.type === '2') values.title = values.title.trim().toLowerCase().replace(/ /g,'-');
    if (values.type === '3') values.title = values.title.trim().toUpperCase();
    data.push(
      {
        title: values.title,
        key: values.title,
        type: values.type,
        icon: icons[values.type],
        children: []
      }
    );

    this.setState({gData: data})
    console.log(data);
    this.chFormRef.current.resetFields();
  }

  delChannel = (treeData) => {
    console.log('del channel', treeData.node)
    const data = [...this.state.gData];
    let indexRm = treeData.node.pos.split('-');
    indexRm = indexRm.map(parseFloat)
    console.log(treeData.node.pos);
    console.log(indexRm);
    indexRm.shift();
    switch(indexRm.length) {
      case 1:
        data.splice(indexRm[0],1)
        break;
      case 2:
        data[indexRm[0]].children.splice(indexRm[1],1)
        break;
      case 3:
        data[indexRm[0]].children[indexRm[1]].splice(indexRm[2],1)
        break;
      case 4:
        data[indexRm[0]].children[indexRm[1]].children[indexRm[2]].splice(indexRm[3],1);
        break;
      default:
    }
    this.setState({gData: data});
  }

  selectType = value => {
    console.log(`channel type ${value}`);
  };

  extract4Firestore = (item) => {
    delete item.icon;
    let children = (item.children)? item.children.forEach(this.extract4Firestore) : [];
    console.log('children', children);
  }

  submitChannels = (values) => {
    let data = this.state.gData;
    data.forEach(this.extract4Firestore);
    console.log('data', data, values);
    db.collection("channels")
      .add({...data, description: values.description || ''})
      .then((docRef) => {
        this.chFormRef.current.resetFields();
        this.sendFormRef.current.resetFields();
        console.log("Document written with ID: ", docRef.id);
      })
      .catch((error) => { console.error("Error adding document: ", error); });
  };

  render() {
    return (
      <div className="addChannel">
        <Space direction="vertical" size="large">
          <Divider>Canales Discord</Divider>
          {this.state.gData.length < 1 &&
              <div className="placeholder">No hay ningún canal</div>
          }
          <Tree
            className="draggable-tree"
            draggable
            blockNode
            autoExpandParent={true}
            defaultExpandAll
            switcherIcon={<CategoryIcon />}
            onRightClick={this.delChannel}
            showIcon={true}
            onDragEnter={this.onDragEnter}
            onDrop={this.onDrop}
            treeData={this.state.gData}
          />
          {this.state.gData.length > 0 &&
            <Alert message="Para eliminar un canal, click derecho" type="info" showIcon  />
          }
          <Form
            ref={this.chFormRef}
            name="channel"
            onFinish={this.addChannel}
            layout='inline'
          >
            <Form.Item name="title" label="Nombre">
              <Input placeholder="Nombre del canal" />
            </Form.Item>
            <Form.Item name="type" initialValue="0" label="Tipo">
            <Select style={{ width: 120 }} onChange={this.selectType}>
              <Option value="0"><TextIcon /> Texto</Option>
              <Option value="1"><VoiceIcon /> Voz</Option>
              <Option value="2"><AnnouncementIcon />Anuncios</Option>
              <Option value="3"><CategoryIcon />Categoria</Option>
              <Option value="4"><StageIcon />Escenario</Option>
            </Select>
            </Form.Item>
            <Form.Item>
              <Button type="primary" htmlType="submit" icon={<PlusOutlined />} >Añadir</Button>
            </Form.Item>
          </Form>
          <Divider></Divider>
          <Form ref={this.sendFormRef} name="proposal" onFinish={this.submitChannels}>
            <Form.Item name="description">
              <TextArea placeholder="Alguna explicación para acompañar tu maravillosa distribución..." rows={4} />
            </Form.Item>
            <Form.Item>
              <Button type="primary" block htmlType="submit" >Enviar propuesta</Button>
            </Form.Item>
          </Form>
        </Space>
      {/* <Button type="primary">Enviar propuesta</Button> */}
      </div>
    );
  }
}

export default ProposeChannels;
