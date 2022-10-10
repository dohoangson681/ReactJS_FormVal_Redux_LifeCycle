import React, { Component } from "react";
import { connect } from "react-redux";
let regexMaSV = /^[A-Za-z0-9]+$/ ; 
let regexTenSV = /^[a-z A-Z_ÀÁÂÃÈÉÊẾÌÍÒÓÔÕÙÚĂĐĨŨƠàáâãèéêìíòóôõùúăđĩũơƯĂẠẢẤẦẨẪẬẮẰẲẴẶẸẺẼỀỀỂưăạảấầẩẫậắằẳẵặẹẻẽềềểếỄỆỈỊỌỎỐỒỔỖỘỚỜỞỠỢỤỦỨỪễệỉịọỏốồổỗộớờởỡợụủứừỬỮỰỲỴÝỶỸửữựỳỵỷỹý\\s]+$/ ; 
let regexPhonenumber = /(84|0[3|5|7|8|9])+([0-9]{8})\b/ ; 
let regexEmail = /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/ ;
 class FormThemSinhVIen extends Component {
  constructor(props){
    super(props) ; 
    this.state = {
        values : {
          maSV : '' , 
          tenSV : '' , 
          sdtSV : '' ,
          emailSV : '' , 
        } , 
        errors : {
          maSV : '' , 
          tenSV : '' , 
          sdtSV : '' , 
          emailSV : '' , 
        }
    }
  }
  renderButton = () => {
    if(this.props.stateBtn){
      return (
        <button type = 'submit' className="btn btn-outline-success mr-2">Thêm sinh viên</button>
      ) ;
    }else {
      return (
        <button type = 'submit' className="btn btn-primary">Cập nhật</button>
      ) ;
    }
  }
  handleInputChange = (e) => {
    let currentEle = e.target ; 
    // console.log('currentEle' , currentEle) ; 
    // console.log(currentEle.name) ;
    // console.log(currentEle.value) ; 
    let {name , value} = currentEle ; 
    let newValues = {...this.state.values , [name] : value} ;
    let errorMessage = '' ; 
    // kiem tra rong
    if(value.trim() === "") {
      errorMessage = "*Trường này không được để trống !"
    }else {
      // nếu các trường đã được điền đầy đủ rồi thì check xem dữ liệu trong các trường đã valid hay chưa
      // validation
    switch (e.target.getAttribute("typeinput")) {
      case 'maSV':
          if(!value.match(regexMaSV)) errorMessage = '*Mã sinh viên không hợp lệ !'
        break;
      case  'tenSV' :
        if(!value.match(regexTenSV)) errorMessage = '*Tên sinh viên không hợp lệ' ; 
        break ;
      case  'sdtSV' :
          if(!value.match(regexPhonenumber)) errorMessage = '*Số điện thoại không hợp lệ' ; 
          break ;
      case  'emailSV' :
            if(!value.match(regexEmail)) errorMessage = '*Email không hợp lệ !' ; 
          break ; 
      default:
        break;
    }
    // end validation
    }

    
    let newErros = {...this.state.errors , [name] : errorMessage}
    this.setState({
      values : newValues , 
      errors : newErros
    } , () => {
      console.log(this.state) ; 
    })
  }
 
  handleSubmit = (e) => {
    e.preventDefault() ; 
    let isValid = true ; 
    console.log('this.state' , this.state) ; 
    // check xem maSV co bi trung khong
    // let index = this.props.mangSinhVien.findIndex((sv)=>{
    //   return sv.maSV === this.state.values.maSV;
    // })
    // if(index > -1){
    //   alert("Mã sinh viên không được trùng !") ; 
    //   isValid = false ; 
    // }
    for (const key in this.state.values) {
      // console.log(this.state.values[key]) ;
      if(this.state.values[key] === ""){
        isValid = false ;
        break ; 
      }
    }
    for (const key in this.state.errors) {
      // console.log(this.state.errors[key]) ;
      if(this.state.errors[key] !== ""){
        isValid = false ;
        break ; 
      }
    }
    // console.log('isValid' , isValid) ; 
    if(isValid && this.props.stateBtn ){
      this.props.themSV(this.state.values) ;
    }else if(isValid && !this.props.stateBtn){
      this.props.updateSV(this.state.values) ; 
    }else {
      alert("Sextop1.net") ; 
    }
  }

  static getDerivedStateFromProps(newProps , currentState){
    console.log('getDerivedStateFromProps') ; 
    console.log('newProps' ,newProps) ;
    console.log('currentState' , currentState) ; 
    // if(){}
    if(newProps.detailSV.maSV !== currentState.values.maSV && newProps.detailSV.maSV.trim() !== "" ){
      return {...currentState , values : newProps.detailSV }
    }
    return currentState ; 
  }
  render() {
    // console.log('stateBtn' , this.props.stateBtn) ; 
    console.log('render') ;
    // !! console.log('detailSV' , this.props.detailSV) ; 
    // !! let {maSV , tenSV , sdtSV , emailSV} = this.props.detailSV ; 
    console.log('this.state.values' , this.state.values) ; 
    let {maSV , tenSV , sdtSV , emailSV} = this.state.values ; 
    return (
      <div className="card text-left mt-5 mb-3">
        <div className="card-head text-center text-primary my-3">
          <h1>Form thông tin sinh viên</h1>
        </div>
        <div className="card-body">
          <form onSubmit={(event)=>{
            this.handleSubmit(event) ; 
            event.target.reset() ; 
            this.setState({
              values : {maSV:'',tenSV:'',sdtSV:'',emailSV:''}, 
              errors:{maSV:'',tenSV:'',sdtSV:'',emailSV:''}
            })
          }}>
            <div className="row">
              {/* mã sinh viên  */}
              <div className="col-6">
                <input
                  type="text"
                  className="form-control"
                  placeholder="Mã sinh viên"
                  name = "maSV"
                  typeinput = 'maSV'
                  value = {maSV}
                  onChange={(e) => {
                    this.handleInputChange(e) ; 
                  }}
                />
                 <span className="text-warning">{this.state.errors.maSV}</span>
              </div>
              {/* họ và tên  */}
              <div className="col-6">
                <input
                  type="text"
                  className="form-control"
                  placeholder="Họ và tên"
                  name = "tenSV"
                  typeinput = 'tenSV'
                  value = {tenSV}
                  onChange={(e) => {
                    this.handleInputChange(e) ; 
                  }}
                />
                <span className="text-danger">{this.state.errors.tenSV}</span>
              </div>
            </div>
            <div className="row mt-3">
              {/* số điện thoại  */}
              <div className="col-6">
                <input
                  type="text"
                  className="form-control"
                  placeholder="Phone number"
                  name = 'sdtSV'
                  typeinput = 'sdtSV'
                  value = {sdtSV}
                  onChange={(e) => {
                    this.handleInputChange(e) ; 
                  }}
                />
                 <span className="text-info">{this.state.errors.sdtSV}</span>
              </div>
              {/* email sinh viên  */}
              <div className="col-6">
                <input
                  type="text"
                  className="form-control"
                  placeholder="Email"
                  name = 'emailSV'
                  typeinput = 'emailSV'
                  value = {emailSV}
                  onChange={(e) => {
                    this.handleInputChange(e) ; 
                  }}
                />
                 <span className="text-primary">{this.state.errors.emailSV}</span>
              </div>
            </div>
            <div className="row mt-2 ">
              <div className="col-12">
              {this.renderButton()}
              </div>
             
            </div>
          </form>
        </div>
        {/* <div className="card-footer">
          
          <button className="btn btn-primary">Cập nhật</button>
          {this.renderButton()}

        </div> */}
      </div>
    );
  }
}
const mapDispatchToProps = (sendStrReq) => {
  return {
    themSV : (sv) => {
      // console.log('them sinh vien') ; 
      // console.log('sinh vien' , sv) ; 
      sendStrReq({
        type : "THEM_SINH_VIEN" , 
        svThem : sv
      })
    },
    updateSV : (sv) => {
      // console.log("Update SV") ; 
      // console.log(sv) ; 
      sendStrReq({
        type : "UPDATE_SV" ,
        svCapNhat : sv
      })
    }
  }
}
const mapStateToProps = (rootReducer) => {
  return {
    stateBtn : rootReducer.QLSVReudcer.themSVBtn ,
    detailSV :  rootReducer.QLSVReudcer.detailsSV , 
    mangSinhVien : rootReducer.QLSVReudcer.mangSinhVien 
  }
}
export default connect(mapStateToProps , mapDispatchToProps)(FormThemSinhVIen) ; 
