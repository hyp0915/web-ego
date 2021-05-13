const base={
    baseUrl:'http://localhost:5000',
    login:'/api/api/login',//登录接口
    register:'/api/api/register',//注册接口
    productList:"/api/api/projectList",//商品信息 page
    search:'/api/api/search',
    selectItemCategory:'/api/api/backend/itemCategory/selectItemCategoryByParentId',
    upload:'/api/upload',
    insertTbItem:"/api/api/backend/item/insertTbItem",
    deleteItemById:"/api/api/backend/item/deleteItemById"
}

export default base