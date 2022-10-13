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
    let {name , value} = currentEle ; 
    let newValues = {...this.state.values , [name] : value} ;
    let errorMessage = '' ; 
    if(value.trim() === "") {
      errorMessage = "*Trường này không được để trống !"
    }else {
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
    for (const key in this.state.values) {
      if(this.state.values[key] === ""){
        isValid = false ;
        break ; 
      }
    }
    for (const key in this.state.errors) {
      if(this.state.errors[key] !== ""){
        isValid = false ;
        break ; 
      }
    }
    let alertMessUpdate = "" ; 
    let alertMessAdd = "Các trường không hợp lệ !" ; 
    let maSVNew  = this.state.values.maSV ; 
    if(this.props.stateBtn){ 
      for(let i = 0 ; i <  this.props.mangSinhVien.length ; i++){
        if(maSVNew === this.props.mangSinhVien[i].maSV ){
            isValid = false ;
            alertMessAdd = "Mã sinh viên không thể bị trùng !" ; 
              break;
        }else {
          alertMessAdd = "Không được để trống các trường thông tin !" ;
        }
    }
    }

    if(isValid && this.props.stateBtn ){
      this.props.themSV(this.state.values) ;
    }else if(isValid && !this.props.stateBtn){
      this.props.updateSV(this.state.values) ; 
    }else if (!this.props.stateBtn){
      alert(alertMessUpdate) ; 
    }else {
      alert(alertMessAdd) ;
    }
  }

  static getDerivedStateFromProps(newProps , currentState){
    if(newProps.detailSV.maSV !== currentState.values.maSV && newProps.detailSV.maSV.trim() !== "" ){
      return {...currentState , values : newProps.detailSV }
    }
    return currentState ; 
  }
  render() {
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
      </div>
    );
  }
}
const mapDispatchToProps = (sendStrReq) => {
  return {
    themSV : (sv) => {
      sendStrReq({
        type : "THEM_SINH_VIEN" , 
        svThem : sv
      })
    },
    updateSV : (sv) => {
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
