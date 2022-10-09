import React, { Component } from 'react' ; 
import FormThemSinhVIen from './FormThemSinhVIen' ; 
import TableSinhVien from './TableSinhVien' ; 

export default class BaiTapQuanLySInhVien extends Component {
  render() {
    return (
      <div className='container'>
        <FormThemSinhVIen/>
        <TableSinhVien/>
      </div>
    )
  }
}
