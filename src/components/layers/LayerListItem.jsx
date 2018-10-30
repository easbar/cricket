import React from 'react'
import PropTypes from 'prop-types'
import classnames from 'classnames'

import {MdMenu, MdContentCopy, MdVisibility, MdVisibilityOff, MdDelete} from 'react-icons/md'

import LayerIcon from '../icons/LayerIcon'
import {SortableElement, SortableHandle} from 'react-sortable-hoc'

class LayerTypeDragHandle extends React.Component {
  static propTypes = LayerIcon.propTypes

  render() {
    return <div className="layer-handle">
      <div className="layer-handle__handle">
        <MdMenu style={{marginRight: "5px"}} />
      </div>
      <LayerIcon
        className="layer-handle__icon"
        {...this.props}
      />
    </div>
  }
}

const LayerTypeDragHandleSortable = SortableHandle((props) => <LayerTypeDragHandle {...props} />)

class IconAction extends React.Component {
  static propTypes = {
    action: PropTypes.string.isRequired,
    onClick: PropTypes.func.isRequired,
    wdKey: PropTypes.string,
    classBlockName: PropTypes.string,
    classBlockModifier: PropTypes.string,
  }

  renderIcon() {
    switch(this.props.action) {
      case 'duplicate': return <MdContentCopy />
      case 'show': return <MdVisibility />
      case 'hide': return <MdVisibilityOff />
      case 'delete': return <MdDelete />
    }
  }

  render() {
    const {classBlockName, classBlockModifier} = this.props;

    let classAdditions = '';
    if (classBlockName) {
      classAdditions = `maputnik-layer-list-icon-action__${classBlockName}`;

      if (classBlockModifier) {
        classAdditions += ` maputnik-layer-list-icon-action__${classBlockName}--${classBlockModifier}`;
      }
    }

    return <button
      tabIndex="-1"
      title={this.props.action}
      className={`maputnik-layer-list-icon-action ${classAdditions}`}
      data-wd-key={this.props.wdKey}
      onClick={this.props.onClick}
    >
      {this.renderIcon()}
    </button>
  }
}

class LayerListItem extends React.Component {
  static propTypes = {
    layerId: PropTypes.string.isRequired,
    layerType: PropTypes.string.isRequired,
    isSelected: PropTypes.bool,
    visibility: PropTypes.string,
    className: PropTypes.string,

    onLayerSelect: PropTypes.func.isRequired,
    onLayerCopy: PropTypes.func,
    onLayerDestroy: PropTypes.func,
    onLayerVisibilityToggle: PropTypes.func,
  }

  static defaultProps = {
    isSelected: false,
    visibility: 'visible',
    onLayerCopy: () => {},
    onLayerDestroy: () => {},
    onLayerVisibilityToggle: () => {},
  }

  static childContextTypes = {
    reactIconBase: PropTypes.object
  }

  getChildContext() {
    return {
      reactIconBase: { size: 14 }
    }
  }

  render() {
    const visibilityAction = this.props.visibility === 'visible' ? 'show' : 'hide';

    return <li
      key={this.props.layerId}
      onClick={e => this.props.onLayerSelect(this.props.layerId)}
      data-wd-key={"layer-list-item:"+this.props.layerId}
      className={classnames({
        "maputnik-layer-list-item": true,
        "maputnik-layer-list-item-selected": this.props.isSelected,
        [this.props.className]: true,
      })}>
        <LayerTypeDragHandleSortable type={this.props.layerType} />
        <span className="maputnik-layer-list-item-id">{this.props.layerId}</span>
        <span style={{flexGrow: 1}} />
        <IconAction
          wdKey={"layer-list-item:"+this.props.layerId+":delete"}
          action={'delete'}
          classBlockName="delete"
          onClick={e => this.props.onLayerDestroy(this.props.layerId)}
        />
        <IconAction
          wdKey={"layer-list-item:"+this.props.layerId+":copy"}
          action={'duplicate'}
          classBlockName="duplicate"
          onClick={e => this.props.onLayerCopy(this.props.layerId)}
        />
        <IconAction
          wdKey={"layer-list-item:"+this.props.layerId+":toggle-visibility"}
          action={visibilityAction}
          classBlockName="visibility"
          classBlockModifier={visibilityAction}
          onClick={e => this.props.onLayerVisibilityToggle(this.props.layerId)}
        />
    </li>
  }
}

const LayerListItemSortable = SortableElement((props) => <LayerListItem {...props} />);

export default LayerListItemSortable;
