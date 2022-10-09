const stateDefault = {
    mangSinhVien : [
        {maSV : "001" , tenSV : "Do Hoang XXX" , sdtSV : "123456789"  , emailSV : 'dhXXX@gmail.com'} , 
        {maSV : "002" , tenSV : "Do Hoang YYY" , sdtSV : "123456789"  , emailSV : 'dhYYY@gmail.com'} ,
        {maSV : "003" , tenSV : "Do Hoang ZZZ" , sdtSV : "123456789"  , emailSV : 'dhZZZ@gmail.com'} ,
        {maSV : "004" , tenSV : "Do Hoang GGG" , sdtSV : "123456789"  , emailSV : 'dhGGG@gmail.com'} 
    ]
}
export const QLSVReudcer = (state = stateDefault , action) => {
    // return state ; 
    // return {...state} ; 
    switch (action.type) {
       
    
        default:
            return state ;
    }
}