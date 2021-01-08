import React from 'react';
import flv from 'flv.js';
import { connect } from 'react-redux';
import { fetchStream } from '../../actions';

class StreamShow extends React.Component {
  constructor(props) {
    super(props);

    this.videoRef = React.createRef();
  }

  componentDidMount() {
    const { id } = this.props.match.params;

    this.props.fetchStream(id);
    flv.createPlayer({
      type: 'flv',
      url: `http://localhost:8000/live/${id}.flv`
    });
  }

  render() {
    if (!this.props.stream) {
      return <div>Loading...</div>
    }

    const {title, description} = this.props.stream;

    return (
      <div>
        <video 
          ref={this.videoRef} 
          style={{ width: '100%'}} 
          controls
        />
        <h1>{title}</h1>
        <h5>{description}</h5>
      </div>
    );
  };
}

const mapStateToProps = (state, ownProps) => {
  return { stream: state.streams[ownProps.match.params.id] };
}

export default connect(
  mapStateToProps,
  { fetchStream }
)(StreamShow);