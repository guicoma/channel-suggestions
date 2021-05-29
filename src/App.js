import './App.css';
import React, { Component, createRef } from 'react';
import { Tree, Form, Input, Select, Button} from 'antd';
import Icon, { PlusOutlined, DeleteOutlined } from '@ant-design/icons';

const TextSvg = () => (
  <svg width="20" height="20" viewBox="0 0 24 24" className="icon-custom"><path fill="#72767d" fill-rule="evenodd" clip-rule="evenodd" d="M5.88657 21C5.57547 21 5.3399 20.7189 5.39427 20.4126L6.00001 17H2.59511C2.28449 17 2.04905 16.7198 2.10259 16.4138L2.27759 15.4138C2.31946 15.1746 2.52722 15 2.77011 15H6.35001L7.41001 9H4.00511C3.69449 9 3.45905 8.71977 3.51259 8.41381L3.68759 7.41381C3.72946 7.17456 3.93722 7 4.18011 7H7.76001L8.39677 3.41262C8.43914 3.17391 8.64664 3 8.88907 3H9.87344C10.1845 3 10.4201 3.28107 10.3657 3.58738L9.76001 7H15.76L16.3968 3.41262C16.4391 3.17391 16.6466 3 16.8891 3H17.8734C18.1845 3 18.4201 3.28107 18.3657 3.58738L17.76 7H21.1649C21.4755 7 21.711 7.28023 21.6574 7.58619L21.4824 8.58619C21.4406 8.82544 21.2328 9 20.9899 9H17.41L16.35 15H19.7549C20.0655 15 20.301 15.2802 20.2474 15.5862L20.0724 16.5862C20.0306 16.8254 19.8228 17 19.5799 17H16L15.3632 20.5874C15.3209 20.8261 15.1134 21 14.8709 21H13.8866C13.5755 21 13.3399 20.7189 13.3943 20.4126L14 17H8.00001L7.36325 20.5874C7.32088 20.8261 7.11337 21 6.87094 21H5.88657ZM9.41045 9L8.35045 15H14.3504L15.4104 9H9.41045Z"></path></svg>
);
const VoiceSvg = () => (
  <svg className="icon-custom" aria-hidden="false" width="20" height="20" viewBox="0 0 24 24"><path fill="#72767d" fill-rule="evenodd" clip-rule="evenodd" d="M11.383 3.07904C11.009 2.92504 10.579 3.01004 10.293 3.29604L6 8.00204H3C2.45 8.00204 2 8.45304 2 9.00204V15.002C2 15.552 2.45 16.002 3 16.002H6L10.293 20.71C10.579 20.996 11.009 21.082 11.383 20.927C11.757 20.772 12 20.407 12 20.002V4.00204C12 3.59904 11.757 3.23204 11.383 3.07904ZM14 5.00195V7.00195C16.757 7.00195 19 9.24595 19 12.002C19 14.759 16.757 17.002 14 17.002V19.002C17.86 19.002 21 15.863 21 12.002C21 8.14295 17.86 5.00195 14 5.00195ZM14 9.00195C15.654 9.00195 17 10.349 17 12.002C17 13.657 15.654 15.002 14 15.002V13.002C14.551 13.002 15 12.553 15 12.002C15 11.451 14.551 11.002 14 11.002V9.00195Z" aria-hidden="true"></path></svg>
);
const AnouncementSvg = () => (
  <svg className="icon-custom" aria-hidden="false" width="20" height="20" viewBox="0 0 24 24"><path d="M3.9 8.26H2V15.2941H3.9V8.26Z" fill="#72767d"></path><path d="M19.1 4V5.12659L4.85 8.26447V18.1176C4.85 18.5496 5.1464 18.9252 5.5701 19.0315L9.3701 19.9727C9.4461 19.9906 9.524 20 9.6 20C9.89545 20 10.1776 19.8635 10.36 19.6235L12.7065 16.5242L19.1 17.9304V19.0588H21V4H19.1ZM9.2181 17.9944L6.75 17.3826V15.2113L10.6706 16.0753L9.2181 17.9944Z" fill="#72767d"></path></svg>
);

const TextIcon = props => <Icon component={TextSvg} {...props} />;
const VoiceIcon = props => <Icon component={VoiceSvg} {...props} />;
const AnnoucementIcon = props => <Icon component={AnouncementSvg} {...props} />;

const gData = [];

const { Option } = Select;

class App extends Component {
  chFormRef = createRef();


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

    this.setState({gData: data,});
  };

  addChannel = (values) => {
    console.log('channel values', values);
    console.log('channel submit', this.chFormRef);
    const data = [...this.state.gData];
    const icons = [<TextIcon />, <VoiceIcon />, <AnnoucementIcon />, null];
    if (values.type === '0') values.title = values.title.trim().replace(/ /g,'-');
    if (values.type === '3') values.title = values.title.trim().toUpperCase();
    // let titlediv = <div>{values.title} <DeleteOutlined onClick={this.delChannel(values.title)} /></div>
    data.push(
      {
        title: values.title,
        key: values.title,
        icon: icons[values.type]
      }
    );
    this.setState({gData: data})
    console.log(data);
    this.chFormRef.current.resetFields();
  }

  diveIn = (find, data, indexes) => {
    data.forEach((ch,index) => {
      if (ch.title === find) {
        indexes.push(index);
        return indexes;
      }
      if (ch.children.length) {
        let arry = indexes;
        return this.diveIn(find, ch.children, arry.push(index))
      }
    })
  }

  delChannel = (event, value) => {
    console.log('del channel',event,value)
    const data = [...this.state.gData];
    console.log(data);
    let indexRm = [-1];
    // data.forEach((ch,index) => {
    //   if (ch.title === value) {
    //     indexRm[0] = index;
    //     return;
    //   }
    //   if (ch.children && ch.children.length) {
    //     indexRm = this.diveIn(value, ch.children, [index])
    //   }
    // })
    // while (indexRm.length) {
    //   let ind = indexRm.shift();

    //   if(data[ind])
    // }
  }

  onReset = () => {
  };

  selectType = value => {
    console.log(`channel type ${value}`);
  };

  render() {

    return (
      <div>
        <Tree
          className="draggable-tree"
          draggable
          blockNode
          defaultExpandAll
          onRightClick={this.delChannel}
          autoExpandParent={true}
          showIcon={true}
          onDragEnter={this.onDragEnter}
          onDrop={this.onDrop}
          treeData={this.state.gData}
        />
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
          <Option value="0">Texto</Option>
          <Option value="1">Voz</Option>
          <Option value="2">Anuncios</Option>
          <Option value="3">Categoria</Option>
        </Select>
        </Form.Item>
        <Form.Item>
          <Button type="primary" htmlType="submit" icon={<PlusOutlined />} >Añadir</Button>
        </Form.Item>
      </Form>
      {/* <Button type="primary">Enviar propuesta</Button> */}
        </div>
    );
  }
}

export default App;
