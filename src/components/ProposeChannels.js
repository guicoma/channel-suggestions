import './ProposeChannels.css';
import React, { Component, createRef } from 'react';
import { Tree, Form, Input, Select, Button, Alert, Space, Divider } from 'antd';
import Icon, { PlusOutlined } from '@ant-design/icons';
import { db } from '../firebase'

const { TextArea } = Input;
const TextSvg = () => (
  <svg width="20" height="20" viewBox="0 0 24 24" className="icon-custom"><path fill="#72767d" fillRule="evenodd" clipRule="evenodd" d="M5.88657 21C5.57547 21 5.3399 20.7189 5.39427 20.4126L6.00001 17H2.59511C2.28449 17 2.04905 16.7198 2.10259 16.4138L2.27759 15.4138C2.31946 15.1746 2.52722 15 2.77011 15H6.35001L7.41001 9H4.00511C3.69449 9 3.45905 8.71977 3.51259 8.41381L3.68759 7.41381C3.72946 7.17456 3.93722 7 4.18011 7H7.76001L8.39677 3.41262C8.43914 3.17391 8.64664 3 8.88907 3H9.87344C10.1845 3 10.4201 3.28107 10.3657 3.58738L9.76001 7H15.76L16.3968 3.41262C16.4391 3.17391 16.6466 3 16.8891 3H17.8734C18.1845 3 18.4201 3.28107 18.3657 3.58738L17.76 7H21.1649C21.4755 7 21.711 7.28023 21.6574 7.58619L21.4824 8.58619C21.4406 8.82544 21.2328 9 20.9899 9H17.41L16.35 15H19.7549C20.0655 15 20.301 15.2802 20.2474 15.5862L20.0724 16.5862C20.0306 16.8254 19.8228 17 19.5799 17H16L15.3632 20.5874C15.3209 20.8261 15.1134 21 14.8709 21H13.8866C13.5755 21 13.3399 20.7189 13.3943 20.4126L14 17H8.00001L7.36325 20.5874C7.32088 20.8261 7.11337 21 6.87094 21H5.88657ZM9.41045 9L8.35045 15H14.3504L15.4104 9H9.41045Z"></path></svg>
);
const VoiceSvg = () => (
  <svg className="icon-custom" aria-hidden="false" width="20" height="20" viewBox="0 0 24 24"><path fill="#72767d" fillRule="evenodd" clipRule="evenodd" d="M11.383 3.07904C11.009 2.92504 10.579 3.01004 10.293 3.29604L6 8.00204H3C2.45 8.00204 2 8.45304 2 9.00204V15.002C2 15.552 2.45 16.002 3 16.002H6L10.293 20.71C10.579 20.996 11.009 21.082 11.383 20.927C11.757 20.772 12 20.407 12 20.002V4.00204C12 3.59904 11.757 3.23204 11.383 3.07904ZM14 5.00195V7.00195C16.757 7.00195 19 9.24595 19 12.002C19 14.759 16.757 17.002 14 17.002V19.002C17.86 19.002 21 15.863 21 12.002C21 8.14295 17.86 5.00195 14 5.00195ZM14 9.00195C15.654 9.00195 17 10.349 17 12.002C17 13.657 15.654 15.002 14 15.002V13.002C14.551 13.002 15 12.553 15 12.002C15 11.451 14.551 11.002 14 11.002V9.00195Z" aria-hidden="true"></path></svg>
);
const AnnouncementSvg = () => (
  <svg className="icon-custom" aria-hidden="false" width="20" height="20" viewBox="0 0 24 24"><path d="M3.9 8.26H2V15.2941H3.9V8.26Z" fill="#72767d"></path><path d="M19.1 4V5.12659L4.85 8.26447V18.1176C4.85 18.5496 5.1464 18.9252 5.5701 19.0315L9.3701 19.9727C9.4461 19.9906 9.524 20 9.6 20C9.89545 20 10.1776 19.8635 10.36 19.6235L12.7065 16.5242L19.1 17.9304V19.0588H21V4H19.1ZM9.2181 17.9944L6.75 17.3826V15.2113L10.6706 16.0753L9.2181 17.9944Z" fill="#72767d"></path></svg>
);
const StageSvg = () => (
  <svg className="icon-custom" aria-hidden="false" width="20" height="20" viewBox="0 0 24 24" fill="none"><path fillRule="evenodd" clipRule="evenodd" d="M14 13C14 14.1 13.1 15 12 15C10.9 15 10 14.1 10 13C10 11.9 10.9 11 12 11C13.1 11 14 11.9 14 13ZM8.5 20V19.5C8.5 17.8 9.94 16.5 12 16.5C14.06 16.5 15.5 17.8 15.5 19.5V20H8.5ZM7 13C7 10.24 9.24 8 12 8C14.76 8 17 10.24 17 13C17 13.91 16.74 14.75 16.31 15.49L17.62 16.25C18.17 15.29 18.5 14.19 18.5 13C18.5 9.42 15.58 6.5 12 6.5C8.42 6.5 5.5 9.42 5.5 13C5.5 14.18 5.82 15.29 6.38 16.25L7.69 15.49C7.26 14.75 7 13.91 7 13ZM2.5 13C2.5 7.75 6.75 3.5 12 3.5C17.25 3.5 21.5 7.75 21.5 13C21.5 14.73 21.03 16.35 20.22 17.75L21.51 18.5C22.45 16.88 23 15 23 13C23 6.93 18.07 2 12 2C5.93 2 1 6.93 1 13C1 15 1.55 16.88 2.48 18.49L3.77 17.74C2.97 16.35 2.5 14.73 2.5 13Z" fill="#72767d"></path></svg>
);
const CategorySvg = () => (
  <svg className="icon-custom" width="20" height="20" viewBox="0 0 24 24"><path fill="#72767d" fillRule="evenodd" clipRule="evenodd" d="M16.59 8.59004L12 13.17L7.41 8.59004L6 10L12 16L18 10L16.59 8.59004Z"></path></svg>
);

const TextIcon = props => <Icon component={TextSvg} {...props} />;
const VoiceIcon = props => <Icon component={VoiceSvg} {...props} />;
const AnnouncementIcon = props => <Icon component={AnnouncementSvg} {...props} />;
// const CategoriaIcon = props => <Icon component={CategorySvg} {...props} />;
const StageIcon = props => <Icon component={StageSvg} {...props} />;

const gData = [];

const { Option } = Select;

class ProposeChannels extends Component {
  chFormRef = createRef();
  sendFormRef = createRef();


  constructor(props) {
    super(props);
    this.state = {
      gData
    };
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
    console.log('channel values', values);
    console.log('channel submit', this.chFormRef);
    const data = [...this.state.gData];
    const icons = [<TextIcon />, <VoiceIcon />, <AnnouncementIcon />, null, <StageIcon />];
    if (values.type === '0' || values.type === '2') values.title = values.title.trim().toLowerCase().replace(/ /g,'-');
    if (values.type === '3') values.title = values.title.trim().toUpperCase();
    data.push(
      {
        title: values.title,
        key: values.title,
        type: values.type,
        icon: icons[values.type]
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
    delete item.key;
    delete item.icon;
    let children = (item.children)? item.children.forEach(this.extract4Firestore) : [];
    console.log('children', children);
  }

  submitChannels = (values) => {
    let data = this.state.gData;
    data.forEach(this.extract4Firestore);
    console.log('data', data, values);
    db.collection("channels")
      .add({...data, description: values.description})
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
          <b>Nate Gentile</b>
          {this.state.gData.length < 1 &&
              <div className="placeholder">No hay ningún canal</div>
          }
          <Tree
            className="draggable-tree"
            draggable
            blockNode
            autoExpandParent={true}
            defaultExpandAll
            switcherIcon={<Icon component={CategorySvg} />}
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
              <Option value="0"><Icon component={TextSvg} /> Texto</Option>
              <Option value="1"><Icon component={VoiceSvg} /> Voz</Option>
              <Option value="2"><Icon component={AnnouncementSvg} />Anuncios</Option>
              <Option value="3"><Icon component={CategorySvg} />Categoria</Option>
              <Option value="4"><Icon component={StageSvg} />Escenario</Option>
            </Select>
            </Form.Item>
            <Form.Item>
              <Button type="primary" htmlType="submit" icon={<PlusOutlined />} >Añadir</Button>
            </Form.Item>
          </Form>
          <Form ref={this.sendFormRef} name="channel" onFinish={this.submitChannels}>
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
