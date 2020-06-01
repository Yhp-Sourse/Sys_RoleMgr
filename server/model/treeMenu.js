var arrayUtil = require('./tools/ArrayUtil');
class treeMenu extends Point{
    //无参构造函数
    constructor() {
      
    };
    constructor(name) {
        super(name); // 用super调用父类的构造方法!
    }
    //有参构造函数，tree_menuName，tree_LinkPage，tree_ObjectType，tree_ObjectName，tree_OSortOrder，tree_ParentId，tree_ParentId，_tree_ParentName，tree_PSortOrder
    constructor(menuId,tree_menuName,tree_LinkPage,tree_ObjectType,tree_ObjectName,tree_OSortOrder,tree_ParentId,tree_ParentName,tree_PSortOrder) {
        this.menuId=menuId;
        this.tree_menuName=tree_menuName ;
        this.tree_LinkPage=tree_LinkPage;
        this.tree_ObjectType=tree_ObjectType;
        this.tree_ObjectName=tree_ObjectName;
        this.tree_OSortOrder=tree_OSortOrder;
        this.tree_ParentId =tree_ParentId;
        this.tree_ParentName=tree_ParentName;
        this.tree_PSortOrder=tree_PSortOrder;
    };
    
    menuId;
    tree_menuName;
    tree_LinkPage;
    tree_ObjectType;
    tree_ObjectName;
    tree_OSortOrder;
    tree_ParentId ;
    tree_ParentName;
    tree_PSortOrder;
}

var list = new arrayUtil.ArrayList();
treeMenu.treeChildren=list;

var treeObj={
    _menuId :"",
    tree_menuName:"",
    tree_LinkPage:"",
    tree_ObjectType:"",
    tree_ObjectName:"",
    tree_OSortOrder:"",
    tree_ParentId :"",
    tree_ParentName:"",
    tree_PSortOrder:"",
    treeChildren:treeObj
}

module.exports = treeMenu;