import React, { Component } from 'react' ;
import { connect } from 'react-redux';

class TableSinhVien extends Component {
  render() {
    console.log(this.props) ; 
    return (
      <div>TableSinhVien</div>
    )
  }
}
const mapStateToProps = (rootReducer) => {
    return {
        mangSinhVien : rootReducer.QLSVReudcer.mangSinhVien
    }
}
export default connect(mapStateToProps , null)(TableSinhVien) ; 
