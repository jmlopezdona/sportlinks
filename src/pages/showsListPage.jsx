import React from 'react'
import MuiThemeProvider from 'material-ui/styles/MuiThemeProvider'
import AppBar from 'material-ui/AppBar'
import ShowsList from '../components/showsList'
import ShowSourcesSelect from '../components/showSourcesSelect'
import {connect} from 'react-redux'
import {toggleMenuAction, fetchShowsAction} from '../state/actions'
import {getNameSource, getSourceList} from '../services/showsService'
import dateFormat from 'dateformat'

const appBarStyles = {
  toolbarContainer: {
    position: 'fixed',
    width: '100%',
    zIndex: 1
  },
  box: {
    height: 65
  }
}

function SportLinks(props) {
  return (
    <MuiThemeProvider>
      <div>
        <div style={appBarStyles.toolbarContainer}>
          <AppBar
            title="Sport Links"
            iconElementRight={<ShowSourcesSelect
                                sourceId={props.sourceId}
                                sourceList={props.sourceList}
                                onSourceSelect={props.handleSourceSelect}/>}
            onLeftIconButtonTouchTap={props.handleToggleMenu} />
        </div>
        <div style={appBarStyles.box}></div>
        <ShowsList
          shows={props.shows}
          source={getNameSource(props.sourceId)}
          date={props.receivedAt}
          loading={props.loading} />
      </div>
    </MuiThemeProvider>
  )
}

function mapStateToProps(state) {
  let receivedAt = state.getIn(['shows', 'receivedAt'])
  return {
    sourceId: state.getIn(['shows', 'sourceId']),
    sourceList: getSourceList(),
    shows: state.getIn(['shows', 'list']).toJS(),
    loading: state.getIn(['shows', 'loading']),
    receivedAt: (receivedAt!==undefined) ? dateFormat(receivedAt, "HH:MM:ss") : undefined
  }
}

function mapDispatchToProps(dispatch) {
  return {
    handleToggleMenu: () => {
      dispatch(toggleMenuAction())
    },
    handleSourceSelect: (sourceId) => {
      dispatch(fetchShowsAction(sourceId))
    }
  }
}

export const SportLinksContainer = connect(mapStateToProps, mapDispatchToProps)(SportLinks)
