const express = require('express');
const router = express.Router();
const{verifyToken}=require('../Middlware/authMiddlware')
const{createMenu,getAllMenus,addMenuItem,getMenuItems,getMenuById}=require('../Controller/menuController');

//Menu Routes
router.post('/menus/create',verifyToken,createMenu);
router.get('/menus/all',verifyToken,getAllMenus);
router.get('/menus/:menuId', verifyToken, getMenuById);



//Menu Items
router.post('/menus/:menuId/additem',verifyToken,addMenuItem);
router.get('/menus/:menuId/getitems',verifyToken,getMenuItems);


module.exports=router;