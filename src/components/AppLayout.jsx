import React from 'react'
import PropTypes from 'prop-types'
import ScrollContainer from './ScrollContainer'
import {ToolsMode} from "../gh/tools-mode";

class AppLayout extends React.Component {
  static propTypes = {
    toolsMode: PropTypes.string.isRequired,
    toolbar: PropTypes.element.isRequired,
    graphhopperTools: PropTypes.element.isRequired,
    layerList: PropTypes.element.isRequired,
    layerEditor: PropTypes.element,
    map: PropTypes.element.isRequired,
    bottom: PropTypes.element,
    modals: PropTypes.node,
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
    let tools;
    if (this.props.toolsMode === ToolsMode.GRAPHHOPPER) {
      tools = <div className="gh-layout-tools">
        <ScrollContainer>
          {this.props.graphhopperTools}
        </ScrollContainer>
      </div>
    } else if (this.props.toolsMode === 'layers') {
      tools = <div>
        <div className="maputnik-layout-list">
          <ScrollContainer>
            {this.props.layerList}
          </ScrollContainer>
        </div>
        <div className="maputnik-layout-drawer">
          <ScrollContainer>
            {this.props.layerEditor}
         </ScrollContainer>
        </div>
      </div>
    }
    return <div className="maputnik-layout">
      {this.props.toolbar}
      {tools}
      {this.props.map}
      {this.props.bottom && <div className="maputnik-layout-bottom">
          {this.props.bottom}
        </div>
      }
      {this.props.modals}
    </div>
  }
}

export default AppLayout
