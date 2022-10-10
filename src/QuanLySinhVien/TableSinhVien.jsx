import React, { Component, Fragment } from "react";
import { connect } from "react-redux";
// chuyển từ tiếng việt không dấu sang có dấu
const removeVietnameseTones = (str) => {
  str = str.replace(/à|á|ạ|ả|ã|â|ầ|ấ|ậ|ẩ|ẫ|ă|ằ|ắ|ặ|ẳ|ẵ/g,"a"); 
  str = str.replace(/è|é|ẹ|ẻ|ẽ|ê|ề|ế|ệ|ể|ễ/g,"e"); 
  str = str.replace(/ì|í|ị|ỉ|ĩ/g,"i"); 
  str = str.replace(/ò|ó|ọ|ỏ|õ|ô|ồ|ố|ộ|ổ|ỗ|ơ|ờ|ớ|ợ|ở|ỡ/g,"o"); 
  str = str.replace(/ù|ú|ụ|ủ|ũ|ư|ừ|ứ|ự|ử|ữ/g,"u"); 
  str = str.replace(/ỳ|ý|ỵ|ỷ|ỹ/g,"y"); 
  str = str.replace(/đ/g,"d");
  str = str.replace(/À|Á|Ạ|Ả|Ã|Â|Ầ|Ấ|Ậ|Ẩ|Ẫ|Ă|Ằ|Ắ|Ặ|Ẳ|Ẵ/g, "A");
  str = str.replace(/È|É|Ẹ|Ẻ|Ẽ|Ê|Ề|Ế|Ệ|Ể|Ễ/g, "E");
  str = str.replace(/Ì|Í|Ị|Ỉ|Ĩ/g, "I");
  str = str.replace(/Ò|Ó|Ọ|Ỏ|Õ|Ô|Ồ|Ố|Ộ|Ổ|Ỗ|Ơ|Ờ|Ớ|Ợ|Ở|Ỡ/g, "O");
  str = str.replace(/Ù|Ú|Ụ|Ủ|Ũ|Ư|Ừ|Ứ|Ự|Ử|Ữ/g, "U");
  str = str.replace(/Ỳ|Ý|Ỵ|Ỷ|Ỹ/g, "Y");
  str = str.replace(/Đ/g, "D");
  // Some system encode vietnamese combining accent as individual utf-8 characters
  // Một vài bộ encode coi các dấu mũ, dấu chữ như một kí tự riêng biệt nên thêm hai dòng này
  str = str.replace(/\u0300|\u0301|\u0303|\u0309|\u0323/g, ""); // ̀ ́ ̃ ̉ ̣  huyền, sắc, ngã, hỏi, nặng
  str = str.replace(/\u02C6|\u0306|\u031B/g, ""); // ˆ ̆ ̛  Â, Ê, Ă, Ơ, Ư
  // Remove extra spaces
  // Bỏ các khoảng trắng liền nhau
  str = str.replace(/ + /g," ");
  str = str.trim();
  // Remove punctuations
  // Bỏ dấu câu, kí tự đặc biệt
  str = str.replace(/!|@|%|\^|\*|\(|\)|\+|\=|\<|\>|\?|\/|,|\.|\:|\;|\'|\"|\&|\#|\[|\]|~|\$|_|`|-|{|}|\||\\/g," ");
  return str;
}
class TableSinhVien extends Component {
  constructor(props){
    super(props) ;
    this.state = {
      searchKeyword : '' ,
      searchArr  : [] , 
    }
  }
  renderTableSV = () => {
    return (
      this.props.mangSinhVien.map((sv, index) => {
        let { maSV, tenSV, sdtSV, emailSV } = sv;
        return (
          <tr key={`${maSV} - ${index}`}>
            <td>{maSV}</td>
            <td>{tenSV}</td>
            <td>{sdtSV}</td>
            <td>{emailSV}</td>
            <td>
              <button
                onClick={() => {
                  this.props.xoaSV(maSV);
                }}
                className="btn btn-danger mr-2"
              >
                Xóa
              </button>
              <button
                onClick={() => {
                  this.props.detailSV(maSV);
                }}
                className="btn btn-warning"
              >
                Chi tiết
              </button>
            </td>
          </tr>
        );
      })
    )
  }
  renderSearch = () => {
    if(this.state.searchArr.length === 0){
      return (
        <tr>
          <td className="text-warning text-center">
            <h1>Không sinh viên nào được tìm thấy !</h1>
          </td>
        </tr>
        
      )
    }else {
      return (
        this.state.searchArr.map((sv)=>{
            let { maSV, tenSV, sdtSV, emailSV } = sv;
          return (
            <tr key={`${maSV}`}>
              <td>{maSV}</td>
              <td>{tenSV}</td>
              <td>{sdtSV}</td>
              <td>{emailSV}</td>
              </tr>
            )
        })
      )
    }

    
  }
  handleSearch = (event) => {
    let ele = event.target ;
    let {value} = ele ; 
    let keywordSearch = removeVietnameseTones(value).toLowerCase() ;
    console.log('keywordSearch' , keywordSearch)  
    let mangTK = [] ;
    if(value.trim() === ""){
      mangTK = [] ;
      console.log('mangTK' , mangTK) ; 
    }else {
      mangTK = this.props.mangSinhVien.filter((sv)=>{
        let svName = removeVietnameseTones(sv.tenSV).toLowerCase() ;
        console.log('svName' , svName) ; 
        let index = svName.indexOf(keywordSearch) ; 
        console.log('index' , index) ; 
        if(index > -1) return sv ;
        else console.log('not found in arr !') ; 
      }) 
      console.log('mangTK' , mangTK) ; 
    }
    this.setState({
      searchKeyword : value , 
      searchArr : mangTK
    } , ()=>{
      console.log(this.state.searchArr) ; 
    })
  }
  render() {
    // console.log(this.props);
    return (
      <Fragment>
        <nav className="navbar navbar-light bg-transparent">
          <a className="navbar-brand">Tìm kiếm theo tên sinh viên</a>
          <form className="form-inline">
            <input
              className="form-control mr-sm-2"
              type="search"
              placeholder="Search"
              aria-label="Search"
              onChange={(event)=>{
                this.handleSearch(event) ; 
              }}
            />
            <button
              className="btn btn-outline-success my-2 my-sm-0"
              type="submit"
            >
              Search
            </button>
          </form>
        </nav>

        <table className="table">
          <thead>
            <tr>
              <th>Mã sinh viên</th>
              <th>Họ và tên </th>
              <th>Số điện thoại</th>
              <th>Email</th>
            </tr>
          </thead>
          <tbody>
            {this.state.searchKeyword === "" ? this.renderTableSV() : this.renderSearch() }
          </tbody>
        </table>
      </Fragment>
    );
  }
}
const mapStateToProps = (rootReducer) => {
  return {
    mangSinhVien: rootReducer.QLSVReudcer.mangSinhVien,
  };
};
const mapDispatchToProps = (sendStrReq) => {
  return {
    xoaSV: (maSV) => {
      sendStrReq({
        type: "XOA_SINH_VIEN",
        maSvXoa: maSV,
      });
    },
    detailSV: (maSV) => {
      sendStrReq({
        type: "XEM_CHI_TIET",
        maSvDetail: maSV,
      });
    },
    updateSV: () => {},
  };
};
export default connect(mapStateToProps, mapDispatchToProps)(TableSinhVien);
