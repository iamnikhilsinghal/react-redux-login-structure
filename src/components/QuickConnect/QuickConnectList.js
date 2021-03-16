import React, { Component } from "react";
import { withRouter } from "react-router-dom";
import { connect } from "react-redux";
import { getUserInfo } from "../../services/authService";
import { getQuickConnectListStart } from "../../redux/home/quickConnect/quickConnectList";
import { getQuickConnectQuery } from "./QuickConnectQuery";

class QuickConnectList extends Component {
  constructor(props) {
    super(props);
    this.state = {
      pageNo: 0,
      rows: 5,
    };
  }

  componentWillMount() {
    const user = getUserInfo();
    this.setState({ user });
    const userid = user?.id;
    const variables = {
      obj: {
        userid,
      },
    };
    this.props.getQuickConnectList({ query: getQuickConnectQuery, variables });
  }

  onRowClickHandle = (data) => {
    if (data.original) {
      this.props.history.push(
        `/quickConnect/addQuickConnect/${data.original.id}`
      );
    }
  };

  addNewQuickConnect = () => {
    this.props.history.push("/quickConnect/addQuickConnect");
  };

  render() {
    return <div className=" demographySection">QuickConnect</div>;
  }
}

const mapStateToProps = (state) => {
  return {
    quickConnectList: state.home.quickConnect.quickConnectList,
  };
};
const mapDispatchToProps = (dispatch) => {
  return {
    getQuickConnectList: (data) => dispatch(getQuickConnectListStart(data)),
  };
};

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(withRouter(QuickConnectList));
