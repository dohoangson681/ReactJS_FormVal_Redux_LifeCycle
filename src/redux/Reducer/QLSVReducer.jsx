const stateDefault = {
    mangSinhVien : [
        // {maSV : "001" , tenSV : "Do Hoang XXX" , sdtSV : "123456789"  , emailSV : 'dhXXX@gmail.com'} , 
        // {maSV : "002" , tenSV : "Do Hoang YYY" , sdtSV : "123456789"  , emailSV : 'dhYYY@gmail.com'} ,
        // {maSV : "003" , tenSV : "Do Hoang ZZZ" , sdtSV : "123456789"  , emailSV : 'dhZZZ@gmail.com'} ,
        // {maSV : "004" , tenSV : "Do Hoang GGG" , sdtSV : "123456789"  , emailSV : 'dhGGG@gmail.com'} 
    ] , 
    themSVBtn : true ,
    detailsSV : {
        maSV : '' ,
        tenSV : '' ,
        sdtSV : '' ,
        emailSV : ''
    }
}
export const QLSVReudcer = (state = stateDefault , action) => {
   
    switch (action.type) {
        case 'THEM_SINH_VIEN' :
            
            state.mangSinhVien = [...state.mangSinhVien , action.svThem ] ; 
            
            return {...state} ;
        case 'XOA_SINH_VIEN' :
            
            let index = state.mangSinhVien.findIndex((sv)=>{
                return sv.maSV === action.maSvXoa
            })
            if(index > -1){
                state.mangSinhVien.splice(index , 1) ; 
                state.mangSinhVien =[ ...state.mangSinhVien] ; 
            }else {
                alert("Not Found !") ; 
            }
            return {...state} ;
        case 'XEM_CHI_TIET' :
            
            let svFind = state.mangSinhVien.find((sv)=>{
                return sv.maSV === action.maSvDetail ; 
            })
            if(svFind){
                
                state.detailsSV = {...svFind} ; 
                state.themSVBtn = false ; 
                
            }else {
                alert("Not found !"); 
            }
            return {...state} ; 
        
        case 'UPDATE_SV' : 
            state.themSVBtn = true ; 
            state.detailsSV = {
                maSV : '' ,
                tenSV : '' ,
                sdtSV : '' ,
                emailSV : ''
            }
            state.detailsSV = {...state.detailsSV} ;
             
            let indexUpdate = state.mangSinhVien.findIndex((sv)=>{
                return sv.maSV === action.svCapNhat.maSV ;
            })
            if(indexUpdate > -1){
                state.mangSinhVien[indexUpdate] = action.svCapNhat; 
                state.mangSinhVien = [...state.mangSinhVien] ; 
            }else {
                alert("ST Wrong !") ; 
            }
            return {...state} ; 
            default:
            return state ;
    }
}