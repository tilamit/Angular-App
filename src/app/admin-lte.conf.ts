export const adminLteConf = {
  skin: 'green',
  //isSidebarLeftCollapsed: true,
  // isSidebarLeftExpandOnOver: false,
  // isSidebarLeftMouseOver: false,
  // isSidebarLeftMini: true,
  // sidebarRightSkin: 'dark',
  // isSidebarRightCollapsed: true,
  // isSidebarRightOverContent: true,
  //layout: 'normal',
  sidebarLeftMenu: [
    { label: 'MAIN NAVIGATION', separator: true },
    // {label: 'Get Started', route: '/', iconClasses: 'fa fa-road', pullRights: [{text: 'New', classes: 'label pull-right bg-green'}]},
    {
      label: 'Companies', iconClasses: 'fa fa-th-list', children: [
        { label: 'Show Companies', route: '/show-categories' }
      ]
    },
    {
      label: 'Leave', iconClasses: 'fa fa-qrcode', children: [
        { label: 'Leave Details', route: '/add-person' },
      ]
    },
    // {label: 'COMPONENTS', separator: true},
  ]
};
